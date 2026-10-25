import React, { FC } from 'react';

import { useSettingRoot } from '../SettingRoot/SettingRootContext';
import { OColorSwatchProps } from './types';

/**
 * Custom control: light/dark color swatches with copy and restore-default actions.
 * Visual language matches Obsidian settings extra-buttons.
 */
const OColorSwatch: FC<OColorSwatchProps> = ({
    value,
    onChange,
    darkValue,
    onDarkChange,
    defaultValue,
    onRestoreDefault,
    onOpenPicker,
    disabled,
    className,
    'aria-label': ariaLabel,
}) => {
    useSettingRoot();
    const hasDark = darkValue !== undefined && onDarkChange !== undefined;

    const handleLightClick = () => {
        if (disabled) return;
        if (onOpenPicker) {
            onOpenPicker('light');
            return;
        }
        const input = document.createElement('input');
        input.type = 'color';
        input.value = value?.startsWith('#') ? value : `#${value ?? '000000'}`;
        input.addEventListener('input', () => onChange(input.value));
        input.click();
    };

    const handleDarkClick = () => {
        if (disabled || !onDarkChange) return;
        if (onOpenPicker) {
            onOpenPicker('dark');
            return;
        }
        const input = document.createElement('input');
        input.type = 'color';
        input.value = darkValue?.startsWith('#')
            ? darkValue
            : `#${darkValue ?? '000000'}`;
        input.addEventListener('input', () => onDarkChange(input.value));
        input.click();
    };

    return (
        <div
            className={['ocolor-swatch', className ?? '']
                .filter(Boolean)
                .join(' ')}
            aria-label={ariaLabel}
        >
            <button
                type='button'
                className={`ocolor-swatch-button${hasDark ? '' : ' is-single'}`}
                disabled={disabled}
                title={hasDark ? `Light: ${value}` : value}
                aria-label={hasDark ? 'Light color' : ariaLabel ?? 'Color'}
                tabIndex={disabled ? -1 : 0}
                onClick={handleLightClick}
            >
                <span
                    className='ocolor-swatch-fill'
                    style={{ backgroundColor: value }}
                />
            </button>

            {hasDark && (
                <>
                    <button
                        type='button'
                        className='ocolor-swatch-copy'
                        disabled={disabled}
                        title='Copy light to dark'
                        aria-label='Copy light to dark'
                        tabIndex={disabled ? -1 : 0}
                        onClick={() => onDarkChange(value)}
                    >
                        →
                    </button>
                    <button
                        type='button'
                        className='ocolor-swatch-button is-dark'
                        disabled={disabled}
                        title={`Dark: ${darkValue}`}
                        aria-label='Dark color'
                        tabIndex={disabled ? -1 : 0}
                        onClick={handleDarkClick}
                    >
                        <span
                            className='ocolor-swatch-fill'
                            style={{ backgroundColor: darkValue }}
                        />
                    </button>
                </>
            )}

            {onRestoreDefault && (
                <button
                    type='button'
                    className='clickable-icon ocolor-swatch-reset'
                    disabled={disabled}
                    title='Restore default'
                    aria-label='Restore default'
                    tabIndex={disabled ? -1 : 0}
                    onClick={onRestoreDefault}
                >
                    ↺
                </button>
            )}
        </div>
    );
};

export default OColorSwatch;
