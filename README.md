# Native Obsidian Settings

A collection of declarative React-components in Obsidian Way

## Why this exists?

When developing Obsidian plugins with React, working with the native Setting object traditionally requires either:
- Passing `containerEl` directly to React components (non-idiomatic)
- Using multiple `useEffect` and `useRef` hooks (verbose and complex)

That inspired me to create an OSetting component, and then others followed.

## OSetting Usage Example

### Traditional Approach (15+ lines)
```tsx
const Page = () => {
    const ref = useRef<HTMLElement | null>(null)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        if (ref.current) {
            const containerEl = ref.current as HTMLElement;
            const setting = new Setting(containerEl)
                .setName('Save Settings')
                .addButton((button) => {
                    button
                        .setIcon('save')
                        .setDisabled(disabled)
                        .onClick(() => handleSave())
                })
        }
    }, [ref, disabled]) // Dependencies nightmare

    return <div ref={ref}></div>
}
````

### With OSetting (3 lines)
```tsx
const Page = () => (
    <OSetting name="Save Settings">
        <button data-icon="save" disabled={disabled} onClick={handleSave} />
    </OSetting>
)
```


## OSetting
### Basic Usage
```tsx
const Page = () => (
    <OSetting name="Save Settings">
        <button data-icon="save" disabled={disabled} onClick={handleSave} />
    </OSetting>
)
```
### Props Reference
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Setting name/title |
| `heading` | `boolean` | `false` | Render as heading style |
| `desc` | `string \| string[]` | - | Description text or array |
| `className` | `string` | - | Additional CSS classes |
| `noBorder` | `boolean` | `false` | Remove bottom border |
| `disabled` | `boolean` | `false` | Disable all child elements |
| `setupObsidianSettingManually` | `(setting: Setting) => void` | - | Imperative setup callback |


#### Examples

##### Basic setting
```tsx
<OSetting name="Enable feature" desc="Toggle this feature on/off">
    <input type="checkbox" />
</OSetting>
```

##### Heading style
```tsx
<OSetting name="Advanced Options" heading />
```

##### Imperative setup
```tsx
<OSetting setupObsidianSettingManually={(setting) => {
    setting.addButton(btn => btn.setIcon('save'));
}} />
```

##### Data-icon button props
```tsx
   <OSetting name="Save Settings">
    <button data-icon="save" disabled={disabled} onClick={handleSave} />
</OSetting>
```

As the value of data-icon, you can use the name of any [Lucide icon](https://lucide.dev/icons/) supported by Obsidian.



## OModal
### Usage
### Props Reference

## ODetails
### Usage
### Props Reference

## Installation
## Contributing
