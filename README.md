# @obsidian-lib/native-react-components

React components that mirror Obsidian's native settings DOM.

Install from a GitHub Release:

```bash
npm i https://github.com/Ssentiago/native-react-components/releases/download/v0.1.0/native-react-components.tgz
```

```tsx
import {
    SettingRoot,
    OSetting,
    OSettingGroup,
    OSettingDrillDown,
    ODropdown,
    OToggle,
} from '@obsidian-lib/native-react-components';

const Settings = () => (
    <SettingRoot>
        <OSettingGroup heading='Images'>
            <OSettingDrillDown name='General' desc='Interactivity, size, folding'>
                <General />
            </OSettingDrillDown>
            <OSetting name='Compact mode'>
                <OToggle value={compact} onChange={setCompact} />
            </OSetting>
            <OSetting name='Format'>
                <ODropdown
                    value={format}
                    onChange={setFormat}
                    options={{ png: 'PNG', jpg: 'JPEG', webp: 'WebP' }}
                />
            </OSetting>
        </OSettingGroup>
    </SettingRoot>
);
```

Also includes 15 atomic controls (`OToggle`, `ODropdown`, `OText`, `ONumber`, `OTextArea`, `OSlider`, `OColor`, `OColorSwatch`, `OSecret`, `OSearch`, `OButton`, `OExtraButton`, `OFolder`, `OFile`, `OPathSuggestInput`, `OSyncToggle`).

Full API reference: [docs/API.md](./docs/API.md)

Peer deps: `react` ^19, `obsidian` ^1.8.
