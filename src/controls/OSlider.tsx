import React, { FC, useId } from 'react';

import { useSettingRoot } from '../SettingRoot/SettingRootContext';
import { OSliderProps } from './types';

/**
 * Obsidian SliderComponent / SettingSliderControl mirror.
 * DOM: `.slider` `<input type="range">` + optional inline value.
 */
const OSlider: FC<OSliderProps> = ({
    value,
    onChange,
    min,
    max,
    step,
    formatValue,
    disabled,
    className,
    'aria-label': ariaLabel,
}) => {
    useSettingRoot();
    const id = useId();
    const display =
        formatValue === undefined ? String(value) : formatValue(value);

    return (
        <div
            className={['oslider', className ?? ''].filter(Boolean).join(' ')}
        >
            <input
                id={id}
                type='range'
                className='slider'
                value={value}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                aria-label={ariaLabel}
                aria-valuetext={display || undefined}
                tabIndex={disabled ? -1 : 0}
                onChange={(e) => onChange(Number(e.target.value))}
            />
            {display !== '' && (
                <div className='oslider-value' aria-hidden='true'>
                    {display}
                </div>
            )}
        </div>
    );
};

export default OSlider;
