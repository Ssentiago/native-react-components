## [0.1.0] — 2026-10-25

First release. React components that mirror Obsidian 1.13+ native settings DOM — `setting-item`, group headings, drill-down pages and every native control — as JSX, without touching Obsidian's imperative `Setting` API.

### Added

#### Settings structure

- **`SettingRoot`** — required root wrapper. Owns the active drill-down page: opening a drill-down swaps the root's content for the page body and renders a back header. Every library component calls `useSettingRoot()` and throws if rendered outside the root.
- **`useSettingRoot`** — single shared root check. One source of truth, no duplicated throws per component.
- **`OSetting`** — atomic setting row. Mirrors Obsidian `setting-item` exactly: name and description on the left, control on the right. Supports `heading`, `noBorder`, `disabled`, multi-line `desc` arrays, and an imperative `setupObsidianSettingManually` escape hatch for cases that need a real Obsidian `Setting`.
- **`OSettingGroup`** — block with an optional heading. Renders children as-is. No context coupling, no nesting requirements, no sibling dependencies.
- **`OSettingDrillDown`** — drill-down entry. Closed: clickable row with name, description, value preview and optional warning badge. Open: replaces the root content with its children and renders a back header. Supports nested drill-downs.

#### Controls

Fifteen atomic controls mirroring Obsidian's native setting controls. Each is self-contained, stateless outside its own props, and validates `SettingRoot` on mount.

| Control | Mirrors |
|---|---|
| `OToggle` | `ToggleComponent` |
| `ODropdown` | `DropdownComponent` |
| `OText` | `TextComponent` |
| `ONumber` | `NumberComponent` |
| `OTextArea` | `TextAreaComponent` |
| `OSlider` | `SliderComponent` |
| `OColor` | `ColorComponent` |
| `OSecret` | `SecretComponent` |
| `OSearch` | `SearchComponent` |
| `OButton` | `ButtonComponent` |
| `OExtraButton` | `ExtraButtonComponent` |
| `OFolder` | `FolderSuggest` |
| `OFile` | `FileSuggest` |
| `OPathSuggestInput` | generic path autocomplete |
| `OSyncToggle` | custom — per-setting sync indicator |
| `OColorSwatch` | custom — light/dark swatches with restore |

#### UI

- **`OModal`** — Obsidian-style modal. Portals to `document.body`. Sized via `width`/`height`/`maxWidth`/`maxHeight`, closable via ESC, backdrop click, or `closable={false}`.
- **`ODetails`** — in-place collapsible section with controlled and uncontrolled state.

#### Documentation

- **`README.md`** — quick-start with install from GitHub Release and a minimal `SettingRoot` example.
- **`docs/API.md`** — full reference: every prop on every component, with multiple examples per prop set. Covers `SettingRoot`, `useSettingRoot`, `OSetting`, `OSettingGroup`, `OSettingDrillDown`, `OModal`, `ODetails`, and all fifteen controls.

