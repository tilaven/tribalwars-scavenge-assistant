# Changelog

## Unreleased

### Added
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
