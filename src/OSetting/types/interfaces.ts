import { ReactNode } from 'react';

import { Setting } from 'obsidian';

export interface OSettingProps {
    name?: string;
    heading?: boolean;
    desc?: string | string[];
    className?: string;
    noBorder?: boolean;
    disabled?: boolean;
    children?: ReactNode;
    setupObsidianSettingManually?: (setting: Setting) => void;
    collapsibleOptions?: {
        defaultCollapsed: false
    }
}
