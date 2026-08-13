'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {runScript, gameDuration, PL230_DURATION_FACTOR, LOOT_FACTORS} = require('./helpers');

const TWO_HOURS = 7200;

// the reported bug: pl230 (speed 1.6), levels 3+4 out, 2h cap, order 4->1.
// v0.0.7 sized the squad for a speed-1 world and sent 196/39/9 (back in 1:31);
// with the factor read from the game the squad must nearly fill the 2h cap.
test('max-time cap uses the duration factor from ScavengeScreen (pl230 case)', () => {
    const {filled, messages} = runScript({
        home: {spear: 0, sword: 0, axe: 1240, archer: 0, light: 250, marcher: 0, heavy: 64},
        busy: [3, 4],
        settings: {order: 'desc', maxDuration: 120}
    });
    assert.match(messages[0], /2/);                       // fills level 2 first (desc)
    assert.deepEqual(
        {axe: filled.axe, light: filled.light, heavy: filled.heavy},
        {axe: 283, light: 56, heavy: 14}
    );
    const capacity = 283 * 10 + 56 * 80 + 14 * 50;
    const duration = gameDuration(capacity, 0.25, PL230_DURATION_FACTOR);
    assert.ok(duration <= TWO_HOURS, 'run must fit in the cap');
    assert.ok(duration > TWO_HOURS * 0.97, 'run should use nearly the whole cap');
});

test('without a cap the split is purely weight-based', () => {
    const {filled} = runScript({
        home: {axe: 1240, light: 250, heavy: 64},
        busy: [3, 4],
        settings: {order: 'desc', maxDuration: 0}
    });
    // level 2 gets 1/lf weight 4 of (10+4) total
    assert.deepEqual(
        {axe: filled.axe, light: filled.light, heavy: filled.heavy},
        {axe: 354, light: 71, heavy: 18}
    );
});

test('falls back to world_speed^-0.55 when the game omits duration fields', () => {
    const withSpeed = runScript({
        home: {axe: 1240, light: 250, heavy: 64},
        busy: [3, 4],
        settings: {order: 'desc', maxDuration: 120},
        durationFactor: null,        // no duration_* in options
        gameDataSpeed: 1.6
    });
    // 1.6^-0.55 equals the pl230 factor exactly, so the result must match
    assert.deepEqual(
        {axe: withSpeed.filled.axe, light: withSpeed.filled.light, heavy: withSpeed.filled.heavy},
        {axe: 283, light: 56, heavy: 14}
    );

    const noSpeed = runScript({
        home: {axe: 1240, light: 250, heavy: 64},
        busy: [3, 4],
        settings: {order: 'desc', maxDuration: 120},
        durationFactor: null,
        gameDataSpeed: null          // as observed in the real game
    });
    // last resort behaves like a speed-1 world (the historical 0.0.7 result)
    assert.deepEqual(
        {axe: noSpeed.filled.axe, light: noSpeed.filled.light, heavy: noSpeed.filled.heavy},
        {axe: 196, light: 39, heavy: 9}
    );
});

test('sequential runs split 1405 spears into squads that all fit the cap', () => {
    const home = {spear: 1405};
    const busy = [];
    const expected = {4: 108, 3: 162, 2: 324, 1: 811};
    for (const level of [4, 3, 2, 1]) {
        const {filled} = runScript({
            home: home,
            busy: busy,
            settings: {order: 'desc', maxDuration: 120}
        });
        assert.equal(filled.spear, expected[level], 'level ' + level);
        const duration = gameDuration(
            filled.spear * 25, {4: 0.75, 3: 0.5, 2: 0.25, 1: 0.1}[level],
            PL230_DURATION_FACTOR);
        assert.ok(duration <= TWO_HOURS, 'level ' + level + ' fits in 2h');
        home.spear -= filled.spear;   // squad leaves the village
        busy.push(level);             // level now occupied
    }
    assert.equal(home.spear, 0, 'every spear gets sent');
});

// algorithm 'fill': the first level in order is topped up to the max time and the
// rest spills downwards, instead of every level finishing together.
test('fill algorithm tops the first level up to the cap instead of splitting evenly', () => {
    const settings = {order: 'desc', maxDuration: 120};
    const even = runScript({home: {spear: 700}, settings: settings});
    assert.equal(even.filled.spear, 53);                  // 1/13 of the army (weights 4:6:12:40)

    const fill = runScript({
        home: {spear: 700},
        settings: Object.assign({algorithm: 'fill'}, settings)
    });
    assert.equal(fill.filled.spear, 108);
    const duration = gameDuration(108 * 25, LOOT_FACTORS[4], PL230_DURATION_FACTOR);
    assert.ok(duration <= TWO_HOURS, 'run must fit in the cap');
    assert.ok(duration > TWO_HOURS * 0.97, 'run should use nearly the whole cap');
});

test('fill algorithm leaves the last levels empty once the army runs out', () => {
    const home = {spear: 300};
    const busy = [];
    const sent = [];
    for (const level of [4, 3, 2, 1]) {
        const {filled} = runScript({
            home: home,
            busy: busy,
            settings: {order: 'desc', maxDuration: 120, algorithm: 'fill'}
        });
        sent.push(filled.spear);
        home.spear -= filled.spear;
        busy.push(level);
    }
    assert.deepEqual(sent, [108, 162, 30, 0]);            // levels 4 and 3 full, level 1 skipped
});

test('unit carry is read from ScavengeScreen.sendable_units, not hardcoded', () => {
    const {filled} = runScript({
        home: {spear: 1000},
        busy: [1, 3, 4],
        settings: {order: 'desc', maxDuration: 120},
        sendableUnits: {spear: {carry: 50}}   // world with doubled spear carry
    });
    // cap capacity for level 2 is ~8113; at carry 50 that is 162 spears (25 -> 324)
    assert.equal(filled.spear, 162);
});

test('village unit_carry_factor scales squad capacity', () => {
    const {filled} = runScript({
        home: {spear: 1000},
        busy: [1, 3, 4],
        settings: {order: 'desc', maxDuration: 120},
        unitCarryFactor: 2
    });
    assert.equal(filled.spear, 162);
});

test('skip-level-1 sends everything the cap allows to level 2', () => {
    const {filled, messages} = runScript({
        home: {axe: 1240, light: 250, heavy: 64},
        busy: [3, 4],
        settings: {order: 'desc', maxDuration: 120, skipFirst: true}
    });
    assert.match(messages[0], /2/);
    assert.deepEqual(
        {axe: filled.axe, light: filled.light, heavy: filled.heavy},
        {axe: 282, light: 56, heavy: 14}
    );
});

test('reserves and disabled units are excluded from the split', () => {
    const {filled} = runScript({
        home: {axe: 1240, light: 250, heavy: 64},
        busy: [3, 4],
        settings: {
            order: 'desc', maxDuration: 0,
            reserve: {axe: 1000},
            enabled: {light: false}
        }
    });
    assert.deepEqual(
        {axe: filled.axe, light: filled.light, heavy: filled.heavy},
        {axe: 68, light: 0, heavy: 18}
    );
});
