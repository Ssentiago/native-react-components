import React, { FC, useId } from 'react';

import { useSettingRoot } from '../SettingRoot/SettingRootContext';
import { OToggleProps } from './types';

/**
 * Obsidian ToggleComponent / SettingToggleControl mirror.
 * DOM: `.checkbox-container` wrapping `<input type="checkbox">`.
 */
const OToggle: FC<OToggleProps> = ({
    value,
    onChange,
    disabled,
    className,
    'aria-label': ariaLabel,
}) => {
    useSettingRoot();
    const id = useId();

    return (
        <div
            className={[
                'checkbox-container',
                value ? 'is-enabled' : '',
                disabled ? 'is-disabled' : '',
                className ?? '',
            ]
                .filter(Boolean)
                .join(' ')}
            onClick={() => {
                if (!disabled) onChange(!value);
            }}
        >
            <input
                id={id}
                type='checkbox'
                checked={value}
                disabled={disabled}
                aria-label={ariaLabel}
                tabIndex={disabled ? -1 : 0}
                onChange={(e) => onChange(e.target.checked)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                    if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
                        e.preventDefault();
                        onChange(!value);
                    }
                }}
            />
        </div>
    );
};

export default OToggle;
