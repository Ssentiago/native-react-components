# @obsidian-lib/native-react-components

React components that mirror Obsidian's native settings DOM.

```bash
npm i @obsidian-lib/native-react-components
```

```tsx
import {
    SettingRoot,
    OSetting,
    OSettingGroup,
    OSettingDrillDown,
} from '@obsidian-lib/native-react-components';

const Settings = () => (
    <SettingRoot>
        <OSettingGroup heading='Images'>
            <OSettingDrillDown name='General' desc='Interactivity, size, folding'>
                <General />
            </OSettingDrillDown>
            <OSetting name='Compact mode'>
                <input type='checkbox' />
            </OSetting>
        </OSettingGroup>
    </SettingRoot>
);
```

Full API reference: [docs/API.md](./docs/API.md)

Peer deps: `react` ^19, `obsidian` ^1.8.