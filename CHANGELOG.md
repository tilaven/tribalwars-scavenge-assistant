# Changelog

## Unreleased

### 0.0.8
- **Max time cap fixed on fast worlds** - the cap sized squads using a duration factor derived from `game_data.speed`, which doesn't match the real scavenge duration factor on some worlds (e.g. pl230, world speed 1.6)
- **Unit carry from game data** - per-unit carry capacity is read from `ScavengeScreen.sendable_units` (worlds can tweak unit stats); the standard values remain as fallback.
- **Tests** - `npm test` (plain `node --test`, no dependencies) runs the planner against a stubbed scavenge screen: the pl230 regression, the speed fallback, sequential fills, carry overrides, skip-level-1, reserves.

### 0.0.7
- **Set alarm removed** - the alarm button and everything behind it (Android SET_ALARM intent, hosted .ics flow, related translations) is gone; it worked poorly on iOS and couldn't be verified on Android. No other functionality affected.

### 0.0.6
- **iOS alarm fixed** - the .ics blob download was a silent no-op on iOS Safari. The button now links to a hosted .ics (ics.agical.io) generated from URL params, so Safari shows the native event preview with "Add All" - tap the button, tap Add, done. Event carries the organizer (tilaven) and a link to this repo. Android/desktop unchanged.
- **Version in settings** - the settings header now shows the script version next to the (translated) title.
- **Full translations** - added the missing strings (skip level 1, order, max time, set alarm + its messages) for all 16 remaining languages; previously they fell back to English.

### 0.0.5
- **Max run time** - optional "Max time" setting (hour/minute dropdowns, native wheel pickers on mobile) caps each scavenge run's duration; troops are scaled down per level to fit. If fewer troops are available (e.g. due to reserves) the run is simply shorter. 0:00 = off; persisted in localStorage.
- **Set alarm button** - one tap schedules a wake-up for when the last running squad returns: on Android it opens the Clock app pre-filled via the SET_ALARM intent, elsewhere (iOS/desktop) it hands over an .ics calendar event with an alert. Return time is taken from the game's server clock, so a skewed device clock doesn't move it.

### 0.0.4
- **Auto-advance** - clicking the highlighted Start button sends the squad, then automatically fills and scrolls to the next free level (waits for the send to register, ~6s cap if it fails).
- **Skip level 1** - optional setting to leave the weakest level out of the split; persisted in localStorage.

## 0.0.3

### Added
- **Fill order setting** - choose lowest-level-first (1 → 4) or highest-first (4 → 1); persisted across runs.
- **Active-level highlight** - the Start button of the level just filled gets a pulsing green glow.
- **Scroll into view** - on launch, the filled level scrolls into view (handy on mobile).

### Changed
- Settings header and table now share one cohesive gold-framed box with a rotating ▸/▾ arrow.
- Missing translations fall back to English instead of showing the raw key.
