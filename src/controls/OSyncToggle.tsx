import React, { FC, useLayoutEffect, useRef } from 'react';

import { setIcon } from 'obsidian';

import { useSettingRoot } from '../SettingRoot/SettingRootContext';
import { OSyncToggleProps } from './types';

/**
 * Custom control: per-setting sync toggle (cloud extra-button).
 * enabled = synced across devices, disabled = local-only storage.
 */
const OSyncToggle: FC<OSyncToggleProps> = ({
    synced,
    onChange,
    tooltipEnable = 'Enable sync',
    tooltipDisable = 'Disable sync',
    disabled,
    className,
    'aria-label': ariaLabel,
}) => {
    useSettingRoot();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const tooltip = synced ? tooltipDisable : tooltipEnable;

    useLayoutEffect(() => {
        const el = buttonRef.current;
        if (!el) return;
        setIcon(el, synced ? 'lucide-cloud' : 'lucide-cloud-off');
    }, [synced]);

    return (
        <button
            ref={buttonRef}
            type='button'
            className={['clickable-icon', 'osync-toggle', className ?? '']
                .filter(Boolean)
                .join(' ')}
            disabled={disabled}
            title={tooltip}
            aria-label={ariaLabel ?? tooltip}
            tabIndex={disabled ? -1 : 0}
            onClick={() => onChange(!synced)}
        />
    );
};

export default OSyncToggle;
