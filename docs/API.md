# API Reference

React components that mirror Obsidian's native settings DOM. Import into any React-based Obsidian plugin.

```bash
npm i @obsidian-lib/native-react-components
```

Peer deps: `react` ^19, `obsidian` ^1.8.

---

## Table of contents

- [SettingRoot](#settingroot) — required root wrapper
- [OSetting](#osetting) — setting row
- [OSettingGroup](#osettinggroup) — group with heading
- [OSettingDrillDown](#osettingdrilldown) — drill-down page
- [OModal](#omodal) — Obsidian-style modal
- [ODetails](#odetails) — collapsible section
- [useSettingRoot](#usesettingroot) — root context hook

---

## SettingRoot

Root wrapper. Every library component throws if rendered outside it. Owns the drill-down page stack.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Settings content |
| `className` | `string` | — | Extra class on the root div |

### Example — minimal

```tsx
<SettingRoot>
    <OSetting name='Auto-save'>
        <input type='checkbox' />
    </OSetting>
</SettingRoot>
```

### Example — with groups and drill-down

```tsx
<SettingRoot>
    <OSettingGroup heading='Editor'>
        <OSettingDrillDown name='Keymap' desc='Keyboard shortcuts'>
            <KeymapSettings />
        </OSettingDrillDown>
    </OSettingGroup>
    <OSettingGroup heading='Danger zone'>
        <OSetting name='Delete all data'>
            <button className='mod-warning'>Delete</button>
        </OSetting>
    </OSettingGroup>
</SettingRoot>
```

### Example — conditional root class

```tsx
<SettingRoot className='my-plugin-settings'>
    <OSetting name='Enabled'>
        <input type='checkbox' defaultChecked />
    </OSetting>
</SettingRoot>
```

---

## OSetting

Atomic setting row. Mirrors Obsidian `setting-item`. Name and description on the left, control on the right.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Row title |
| `desc` | `string \| string[]` | — | Description text or array of lines |
| `heading` | `boolean` | `false` | Render as heading style (`setting-item-heading`) |
| `className` | `string` | — | Extra class |
| `noBorder` | `boolean` | `false` | Remove bottom border |
| `disabled` | `boolean` | `false` | Disable all child controls |
| `setupObsidianSettingManually` | `(setting: Setting) => void` | — | Imperative escape hatch (real Obsidian `Setting`) |

### Example — checkbox

```tsx
<OSetting name='Spellcheck' desc='Check spelling while typing'>
    <input type='checkbox' checked={on} onChange={e => setOn(e.target.checked)} />
</OSetting>
```

### Example — text input

```tsx
<OSetting name='Default folder' desc='Where new notes are created'>
    <input type='text' value={folder} onChange={e => setFolder(e.target.value)} placeholder='Inbox' />
</OSetting>
```

### Example — select

```tsx
<OSetting name='Theme' desc='Color scheme'>
    <select value={theme} onChange={e => setTheme(e.target.value)}>
        <option value='system'>System</option>
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
    </select>
</OSetting>
```

### Example — range slider

```tsx
<OSetting name='Font size' desc='Editor font size in pixels'>
    <input type='range' min={12} max={24} value={size} onChange={e => setSize(Number(e.target.value))} />
</OSetting>
```

### Example — button

```tsx
<OSetting name='Export config' desc='Save settings to a file'>
    <button onClick={exportConfig}>Export</button>
</OSetting>
```

### Example — textarea

```tsx
<OSetting name='Custom CSS' desc='Injected into the editor'>
    <textarea value={css} onChange={e => setCss(e.target.value)} rows={4} />
</OSetting>
```

### Example — multiple controls in one row

```tsx
<OSetting name='Opacity' desc='Preview opacity'>
    <input type='range' min={0} max={1} step={0.1} value={opacity} onChange={e => setOpacity(e.target.value)} />
    <button onClick={() => setOpacity(1)}>Reset</button>
</OSetting>
```

### Example — disabled row

```tsx
<OSetting name='Sync' desc='Requires an account' disabled>
    <input type='checkbox' />
</OSetting>
```

### Example — heading-only row

```tsx
<OSetting name='Advanced options' heading />
```

### Example — multi-line description

```tsx
<OSetting
    name='Auto-update'
    desc={[
        'Check for updates on startup.',
        'Disabling this requires manual update checks.',
    ]}
>
    <input type='checkbox' checked={auto} onChange={e => setAuto(e.target.checked)} />
</OSetting>
```

### Example — no border

```tsx
<OSetting name='Last item in group' noBorder>
    <input type='checkbox' />
</OSetting>
```

### Example — imperative Obsidian Setting

```tsx
<OSetting
    setupObsidianSettingManually={setting => {
        setting
            .setName('Raw setting')
            .addButton(btn => btn.setIcon('save').onClick(save));
    }}
/>
```

### Example — color input

```tsx
<OSetting name='Accent color'>
    <input type='color' value={color} onChange={e => setColor(e.target.value)} />
</OSetting>
```

### Example — number input

```tsx
<OSetting name='Max results' desc='Search result limit'>
    <input type='number' min={1} max={100} value={limit} onChange={e => setLimit(e.target.value)} />
</OSetting>
```

### Example — nested custom component

```tsx
const Toggle = ({ value, onChange }) => (
    <button
        className={value ? 'mod-cta' : ''}
        onClick={() => onChange(!value)}
    >
        {value ? 'On' : 'Off'}
    </button>
);

<OSetting name='Animations'>
    <Toggle value={anim} onChange={setAnim} />
</OSetting>
```

---

## OSettingGroup

Block with a heading. Renders children as-is.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | — | Group heading |
| `children` | `ReactNode` | — | Group items |
| `className` | `string` | — | Extra class |

### Example — basic group

```tsx
<OSettingGroup heading='Editor'>
    <OSetting name='Line numbers'>
        <input type='checkbox' />
    </OSetting>
    <OSetting name='Word wrap'>
        <input type='checkbox' />
    </OSetting>
</OSettingGroup>
```

### Example — group without heading

```tsx
<OSettingGroup>
    <OSetting name='First'>
        <input type='checkbox' />
    </OSetting>
    <OSetting name='Second'>
        <input type='checkbox' />
    </OSetting>
</OSettingGroup>
```

### Example — group with drill-down and rows

```tsx
<OSettingGroup heading='Files'>
    <OSettingDrillDown name='Naming rules' desc='File name patterns'>
        <NamingRules />
    </OSettingDrillDown>
    <OSetting name='Auto-reveal' desc='Reveal active file in explorer'>
        <input type='checkbox' />
    </OSetting>
</OSettingGroup>
```

### Example — multiple groups in a root

```tsx
<SettingRoot>
    <OSettingGroup heading='General'>
        <OSetting name='Start on boot'>
            <input type='checkbox' />
        </OSetting>
    </OSettingGroup>
    <OSettingGroup heading='Privacy'>
        <OSetting name='Telemetry'>
            <input type='checkbox' />
        </OSetting>
    </OSettingGroup>
</SettingRoot>
```

### Example — group with custom className

```tsx
<OSettingGroup heading='Experimental' className='my-experimental-group'>
    <OSetting name='Beta features'>
        <input type='checkbox' />
    </OSetting>
</OSettingGroup>
```

---

## OSettingDrillDown

Drill-down entry. Closed: clickable row with name, description and chevron. Open: replaces the entire root content with its children plus a back header.

Clicking the row calls `openPage` on `SettingRoot`. The root hides all other content and renders the drill-down children as a full page. The back button returns to the root.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Entry title and page title |
| `desc` | `string \| string[]` | — | Description on the entry |
| `displayValue` | `string` | — | Value preview on the entry |
| `status` | `'warning' \| null` | — | Warning badge on the entry |
| `visible` | `boolean` | `true` | Hide the entry entirely |
| `className` | `string` | — | Extra class |
| `children` | `ReactNode` | — | Page content when opened |

### Example — simple page

```tsx
<OSettingDrillDown name='Shortcuts' desc='Keyboard bindings'>
    <OSetting name='Open command palette'>
        <input type='text' value={hotkey} onChange={e => setHotkey(e.target.value)} />
    </OSetting>
</OSettingDrillDown>
```

### Example — page with multiple settings

```tsx
<OSettingDrillDown name='Notifications' desc='How and when to notify'>
    <OSettingGroup heading='Desktop'>
        <OSetting name='Sound'>
            <input type='checkbox' />
        </OSetting>
        <OSetting name='Badge count'>
            <input type='checkbox' />
        </OSetting>
    </OSettingGroup>
    <OSettingGroup heading='Mobile'>
        <OSetting name='Push'>
            <input type='checkbox' />
        </OSetting>
    </OSettingGroup>
</OSettingDrillDown>
```

### Example — with displayValue

```tsx
<OSettingDrillDown
    name='Profile'
    desc='Active configuration profile'
    displayValue={activeProfile.name}
>
    <ProfileEditor profile={activeProfile} onChange={setProfile} />
</OSettingDrillDown>
```

### Example — with warning status

```tsx
<OSettingDrillDown
    name='Sync conflicts'
    desc='3 unresolved conflicts'
    status={conflicts.length > 0 ? 'warning' : null}
>
    <ConflictList conflicts={conflicts} onResolve={resolve} />
</OSettingDrillDown>
```

### Example — conditionally hidden

```tsx
<OSettingDrillDown
    name='Cloud'
    desc='Remote storage settings'
    visible={isCloudAvailable}
>
    <CloudSettings />
</OSettingDrillDown>
```

### Example — nested drill-downs

```tsx
<OSettingDrillDown name='Appearance' desc='Visual customization'>
    <OSettingDrillDown name='Colors' desc='Theme palette'>
        <ColorPicker value={palette} onChange={setPalette} />
    </OSettingDrillDown>
    <OSettingDrillDown name='Fonts' desc='Typography'>
        <FontPicker value={fonts} onChange={setFonts} />
    </OSettingDrillDown>
</OSettingDrillDown>
```

### Example — full settings panel

```tsx
const Settings = () => (
    <SettingRoot>
        <OSettingGroup heading='Images'>
            <OSettingDrillDown name='General' desc='Interactivity, size, folding'>
                <GeneralImageSettings />
            </OSettingDrillDown>
            <OSettingDrillDown name='Presets' desc='Image presets'>
                <ImagePresets />
            </OSettingDrillDown>
            <OSetting name='Show controls' desc='Display overlay controls'>
                <input type='checkbox' />
            </OSetting>
        </OSettingGroup>

        <OSettingGroup heading='Maintenance'>
            <OSettingDrillDown name='Debug' desc='Logging and troubleshooting'>
                <DebugSettings />
            </OSettingDrillDown>
            <OSetting name='Reset settings' desc='Restore all settings to their defaults'>
                <button className='mod-warning' onClick={reset}>Reset</button>
            </OSetting>
        </OSettingGroup>
    </SettingRoot>
);
```

---

## OModal

Obsidian-style modal. Portals to `document.body`.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Modal title |
| `children` | `ReactNode` | — | Modal body |
| `onClose` | `() => void` | — | Close handler |
| `onOpen` | `() => void` | — | Open handler |
| `width` | `string` | — | Modal width |
| `height` | `string` | — | Modal height |
| `maxWidth` | `string` | — | Max width |
| `maxHeight` | `string` | — | Max height |
| `className` | `string` | — | Extra class on `.modal` |
| `closable` | `boolean` | `true` | Allow ESC / backdrop close |

### Example — confirmation dialog

```tsx
{confirming && (
    <OModal title='Delete note' onClose={() => setConfirming(false)}>
        <p>This cannot be undone.</p>
        <button className='mod-warning' onClick={deleteNote}>Delete</button>
    </OModal>
)}
```

### Example — non-closable modal

```tsx
<OModal title='Processing' closable={false} onClose={() => {}}>
    <p>Do not close this window.</p>
</OModal>
```

### Example — sized modal

```tsx
<OModal
    title='Import data'
    width='500px'
    maxHeight='80vh'
    onClose={close}
    onOpen={() => console.log('opened')}
>
    <textarea rows={10} />
</OModal>
```

---

## ODetails

In-place collapsible section.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Summary title |
| `desc` | `string` | — | Summary description |
| `defaultExpanded` | `boolean` | `false` | Initial open state (uncontrolled) |
| `expanded` | `boolean` | — | Controlled open state |
| `onToggle` | `(opened: boolean) => void` | — | Toggle callback |
| `className` | `string` | — | Extra class |

### Example — uncontrolled

```tsx
<ODetails name='Advanced' defaultExpanded>
    <OSetting name='Internal flag'>
        <input type='checkbox' />
    </OSetting>
</ODetails>
```

### Example — controlled

```tsx
const [open, setOpen] = useState(false);

<ODetails name='Expert mode' expanded={open} onToggle={setOpen}>
    <OSetting name='Dangerous option'>
        <input type='checkbox' />
    </OSetting>
</ODetails>
```

### Example — with description

```tsx
<ODetails name='Migration' desc='Move data from an older version'>
    <OSetting name='Source version'>
        <select><option>1.0</option><option>2.0</option></select>
    </OSetting>
</ODetails>
```

---

## useSettingRoot

Hook that returns the root context and validates that the caller is inside `SettingRoot`.

### Returns

| Field | Type | Description |
|-------|------|-------------|
| `openPage` | `(id: string, name: string, content: ReactNode) => void` | Show a drill-down as the full page |
| `closePage` | `() => void` | Return to the root content |
| `activePage` | `{ id, name, content } \| null` | Currently open page |

Throws if called outside `SettingRoot`.

### Example — custom trigger

```tsx
const OpenButton = () => {
    const { openPage } = useSettingRoot();
    return (
        <button onClick={() => openPage('custom', 'Custom page', <CustomForm />)}>
            Open custom
        </button>
    );
};
```

### Example — read active page

```tsx
const Status = () => {
    const { activePage } = useSettingRoot();
    return <div>{activePage ? activePage.name : 'Root'}</div>;
};
```

### Example — programmatic back

```tsx
const DoneButton = () => {
    const { closePage } = useSettingRoot();
    return <button onClick={closePage}>Done</button>;
};
```

---

## Styling

Components use Obsidian's own CSS class names and variables. Additional CSS is injected once via `<style id="osetting-styles">`.

Opt out:

```ts
(window as any).OSETTING_DISABLE_STYLES = 'true';
```