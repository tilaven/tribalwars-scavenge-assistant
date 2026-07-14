# Changelog

## Unreleased

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
