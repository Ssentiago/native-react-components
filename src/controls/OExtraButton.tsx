import React, { FC, useLayoutEffect, useRef } from 'react';

import { setIcon } from 'obsidian';

import { useSettingRoot } from '../SettingRoot/SettingRootContext';
import { OExtraButtonProps } from './types';

/**
 * Obsidian ExtraButtonComponent mirror.
 * DOM: `<button class="clickable-icon">` with an SVG icon.
 */
const OExtraButton: FC<OExtraButtonProps> = ({
    icon,
    onClick,
    tooltip,
    disabled,
    className,
    'aria-label': ariaLabel,
}) => {
    useSettingRoot();
    const buttonRef = useRef<HTMLButtonElement>(null);

    useLayoutEffect(() => {
        const el = buttonRef.current;
        if (!el || !icon) return;
        setIcon(el, icon);
    }, [icon]);

    return (
        <button
            ref={buttonRef}
            type='button'
            className={['clickable-icon', 'oextra-button', className ?? '']
                .filter(Boolean)
                .join(' ')}
            disabled={disabled}
            aria-label={ariaLabel ?? tooltip}
            title={tooltip}
            tabIndex={disabled ? -1 : 0}
            onClick={onClick}
        />
    );
};

export default OExtraButton;
