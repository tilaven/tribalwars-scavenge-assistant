'use strict';

// Runs script.js inside a vm sandbox with a stubbed scavenge screen, so tests
// exercise the real planning/filling code against configurable world data.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SCRIPT = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');

const LOOT_FACTORS = {1: 0.10, 2: 0.25, 3: 0.50, 4: 0.75};

// pl230: world speed 1.6 -> the factor the game itself computes (1.6^-0.55)
const PL230_DURATION_FACTOR = 0.7722074896557402;

function scavengeOption(id, cfg) {
    const base = {
        id: id,
        name: 'Level ' + id,
        loot_factor: LOOT_FACTORS[id]
    };
    if (cfg.durationFactor !== null) {
        base.duration_exponent = 0.45;
        base.duration_initial_seconds = 1800;
        base.duration_factor = cfg.durationFactor;
    }
    return {
        base: base,
        is_locked: false,
        scavenging_squad: cfg.busy ? {return_time: 1} : null
    };
}

// config:
//   home            {unit: countInVillage}
//   busy            level ids with a squad already out (default none)
//   settings        stored mazSettings (order/maxDuration/skipFirst/reserve/enabled)
//   durationFactor  per-level duration_factor; null = field absent (default pl230)
//   gameDataSpeed   value of game_data.speed (default null, as observed in game)
//   sendableUnits   ScavengeScreen.sendable_units override, e.g. {spear: {carry: 50}}
//   unitCarryFactor village.unit_carry_factor (default 1)
//   archerWorld     expose archer units in the DOM (default false)
function runScript(config) {
    const home = config.home;
    const busy = new Set(config.busy || []);
    const durationFactor = 'durationFactor' in config
        ? config.durationFactor : PL230_DURATION_FACTOR;

    const options = {};
    for (const id of [1, 2, 3, 4]) {
        options[id] = scavengeOption(id, {busy: busy.has(id), durationFactor});
    }

    const filled = {};
    const messages = [];

    function makeInput(unit) {
        return {
            offsetParent: {},
            set value(v) { filled[unit] = Number(v); },
            get value() { return String(filled[unit] || 0); },
            dispatchEvent() {},
            parentNode: {
                querySelector: sel => sel === '.units-entry-all'
                    ? {textContent: '(' + (home[unit] || 0) + ')'} : null
            }
        };
    }

    const sandbox = {
        URLSearchParams: URLSearchParams,
        Event: class Event { constructor(type) { this.type = type; } },
        location: {search: '?screen=place&mode=scavenge'},
        localStorage: {
            _s: JSON.stringify(config.settings || {}),
            getItem() { return this._s; },
            setItem(k, v) { this._s = v; }
        },
        UI: {InfoMessage(msg) { messages.push(msg); }},
        game_data: {locale: 'en', speed: 'gameDataSpeed' in config ? config.gameDataSpeed : null},
        ScavengeScreen: {
            village: {
                options: options,
                unit_carry_factor: config.unitCarryFactor || 1
            },
            sendable_units: config.sendableUnits || null
        },
        document: {
            getElementById: () => null,
            querySelector: sel =>
                config.archerWorld && sel === '.units-entry-all[data-unit="archer"]'
                    ? {textContent: '(0)'} : null,
            querySelectorAll(sel) {
                const m = sel.match(/^input\[name="(\w+)"\]$/);
                if (m) return m[1] in home ? [makeInput(m[1])] : [];
                return [];
            },
            head: {appendChild() {}}
        }
    };
    sandbox.window = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(SCRIPT, sandbox, {filename: 'script.js'});

    return {filled, messages};
}

// the game's real duration formula, for asserting in-game run times
function gameDuration(capacity, lootFactor, durationFactor) {
    return (Math.pow(capacity * capacity * 100 * lootFactor * lootFactor, 0.45) + 1800)
        * durationFactor;
}

module.exports = {runScript, gameDuration, PL230_DURATION_FACTOR, LOOT_FACTORS};
