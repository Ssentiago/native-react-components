import React, { FC, useLayoutEffect, useRef } from 'react';

import { setIcon } from 'obsidian';

import { useSettingRoot } from '../SettingRoot/SettingRootContext';
import { OButtonProps } from './types';

/**
 * Obsidian ButtonComponent mirror.
 * DOM: `<button>` with `mod-cta` / `mod-warning` modifiers.
 */
const OButton: FC<OButtonProps> = ({
    label,
    icon,
    onClick,
    variant = 'default',
    tooltip,
    disabled,
    className,
    'aria-label': ariaLabel,
}) => {
    useSettingRoot();
    const iconRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        const el = iconRef.current;
        if (!el || !icon) return;
        setIcon(el, icon);
    }, [icon]);

    const variantClass =
        variant === 'cta' ? 'mod-cta' : variant === 'warning' ? 'mod-warning' : '';

    return (
        <button
            type='button'
            className={['obtn', variantClass, className ?? '']
                .filter(Boolean)
                .join(' ')}
            disabled={disabled}
            aria-label={ariaLabel ?? tooltip}
            title={tooltip}
            tabIndex={disabled ? -1 : 0}
            onClick={onClick}
        >
            {icon && <span ref={iconRef} className='obtn-icon' aria-hidden='true' />}
            {label && <span className='obtn-label'>{label}</span>}
        </button>
    );
};

export default OButton;
