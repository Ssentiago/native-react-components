import React, { FC } from 'react';

import { useSettingRoot } from '../SettingRoot/SettingRootContext';
import { ODropdownProps } from './types';

/**
 * Obsidian DropdownComponent / SettingDropdownControl mirror.
 * DOM: `<select class="dropdown">`.
 */
const ODropdown: FC<ODropdownProps> = ({
    value,
    options,
    onChange,
    placeholder,
    disabled,
    className,
    'aria-label': ariaLabel,
}) => {
    useSettingRoot();
    const entries = Object.entries(options);
    const hasPlaceholder = placeholder !== undefined && placeholder !== '';
    const showPlaceholder = hasPlaceholder && value === '';

    return (
        <select
            className={['dropdown', className ?? ''].filter(Boolean).join(' ')}
            value={value}
            disabled={disabled}
            aria-label={ariaLabel}
            tabIndex={disabled ? -1 : 0}
            onChange={(e) => onChange(e.target.value)}
        >
            {showPlaceholder && (
                <option value='' disabled>
                    {placeholder}
                </option>
            )}
            {entries.map(([optionValue, label]) => (
                <option key={optionValue} value={optionValue}>
                    {label}
                </option>
            ))}
        </select>
    );
};

export default ODropdown;
