export type OSettingDescription = string | string[];

export interface OControlBaseProps {
    disabled?: boolean;
    className?: string;
    /** Accessible name when the control is not labelled by a parent OSetting. */
    'aria-label'?: string;
}

export interface OToggleProps extends OControlBaseProps {
    value: boolean;
    onChange: (value: boolean) => void;
}

export interface ODropdownProps extends OControlBaseProps {
    value: string;
    /** Map of option value → label (matches Obsidian SettingDropdownControl.options). */
    options: Record<string, string>;
    onChange: (value: string) => void;
    placeholder?: string;
}

export interface OTextProps extends OControlBaseProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    /** Non-empty string rejects the change and shows an inline error (SettingControlBase.validate). */
    validate?: (value: string) => string | void | undefined;
}

export interface ONumberProps extends OControlBaseProps {
    value: number;
    onChange: (value: number) => void;
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
    validate?: (value: number) => string | void | undefined;
}

export interface OTextAreaProps extends OControlBaseProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
    validate?: (value: string) => string | void | undefined;
}

export interface OSliderProps extends OControlBaseProps {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    /** Formats the inline value next to the slider. Return '' to hide. */
    formatValue?: (value: number) => string;
}

export interface OColorProps extends OControlBaseProps {
    value: string;
    onChange: (value: string) => void;
}

export interface OSecretProps extends OControlBaseProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export interface OFileProps extends OControlBaseProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    /** Vault path filter for suggestions. */
    filter?: (path: string) => boolean;
}

export interface OFolderProps extends OControlBaseProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    filter?: (path: string) => boolean;
    includeRoot?: boolean;
}

export type OButtonVariant = 'default' | 'cta' | 'warning';

export interface OButtonProps extends OControlBaseProps {
    label?: string;
    icon?: string;
    onClick: () => void;
    variant?: OButtonVariant;
    tooltip?: string;
}

export interface OExtraButtonProps extends OControlBaseProps {
    icon: string;
    onClick: () => void;
    tooltip?: string;
}

export interface OSearchProps extends OControlBaseProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

/** Custom dual light/dark color swatches with optional restore-default. */
export interface OColorSwatchProps extends OControlBaseProps {
    value: string;
    onChange: (value: string) => void;
    /** When set, renders a second dark-theme swatch. */
    darkValue?: string;
    onDarkChange?: (value: string) => void;
    /** Shows a restore-to-default button. */
    defaultValue?: string;
    onRestoreDefault?: () => void;
    /** Opens the host color picker (pass through to your modal). */
    onOpenPicker?: (target: 'light' | 'dark') => void;
}

/** Custom per-setting sync toggle (cloud icon): synced vs local-only storage. */
export interface OSyncToggleProps extends OControlBaseProps {
    synced: boolean;
    onChange: (synced: boolean) => void;
    tooltipEnable?: string;
    tooltipDisable?: string;
}
