import React, { FC, useLayoutEffect, useRef } from 'react';

import { setIcon } from 'obsidian';

import { useSettingRoot } from '../SettingRoot/SettingRootContext';
import { OSearchProps } from './types';

/**
 * Obsidian SearchComponent mirror.
 * DOM: `.search-input-container` with `<input type="search">` and clear button.
 */
const OSearch: FC<OSearchProps> = ({
    value,
    onChange,
    placeholder,
    disabled,
    className,
    'aria-label': ariaLabel,
}) => {
    useSettingRoot();
    const clearRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const el = clearRef.current;
        if (!el) return;
        setIcon(el, 'x');
    }, []);

    return (
        <div
            className={['search-input-container', className ?? '']
                .filter(Boolean)
                .join(' ')}
        >
            <input
                type='search'
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                aria-label={ariaLabel}
                tabIndex={disabled ? -1 : 0}
                onChange={(e) => onChange(e.target.value)}
            />
            {value !== '' && !disabled && (
                <div
                    ref={clearRef}
                    className='search-input-clear-button'
                    role='button'
                    aria-label='Clear'
                    tabIndex={0}
                    onClick={() => onChange('')}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onChange('');
                        }
                    }}
                />
            )}
        </div>
    );
};

export default OSearch;
