import React, { FC } from 'react';

import { useSettingRoot } from '../SettingRoot/SettingRootContext';
import { OColorProps } from './types';

/**
 * Obsidian SettingColorControl mirror.
 * DOM: native `<input type="color">` styled as a swatch.
 */
const OColor: FC<OColorProps> = ({
    value,
    onChange,
    disabled,
    className,
    'aria-label': ariaLabel,
}) => {
    useSettingRoot();
    const normalized = value?.startsWith('#') ? value : `#${value ?? '000000'}`;

    return (
        <div
            className={['ocolor', className ?? ''].filter(Boolean).join(' ')}
        >
            <input
                type='color'
                value={normalized}
                disabled={disabled}
                aria-label={ariaLabel}
                tabIndex={disabled ? -1 : 0}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default OColor;
