import React, { FC, useEffect, useState } from 'react';

import { useSettingRoot } from '../SettingRoot/SettingRootContext';
import { ONumberProps } from './types';

/**
 * Obsidian SettingNumberControl mirror.
 * DOM: `<input type="number">` with min/max/step.
 */
const ONumber: FC<ONumberProps> = ({
    value,
    onChange,
    placeholder,
    min,
    max,
    step,
    validate,
    disabled,
    className,
    'aria-label': ariaLabel,
}) => {
    useSettingRoot();
    const [draft, setDraft] = useState(String(value));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setDraft(String(value));
        setError(null);
    }, [value]);

    return (
        <div className={['onumber', className ?? ''].filter(Boolean).join(' ')}>
            <input
                type='number'
                className={error ? 'is-invalid' : undefined}
                value={draft}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                aria-label={ariaLabel}
                aria-invalid={error ? true : undefined}
                tabIndex={disabled ? -1 : 0}
                onChange={(e) => {
                    const raw = e.target.value;
                    setDraft(raw);
                    if (raw === '' || Number.isNaN(Number(raw))) {
                        return;
                    }
                    const next = Number(raw);
                    const validationError = validate?.(next);
                    if (typeof validationError === 'string' && validationError.length > 0) {
                        setError(validationError);
                        return;
                    }
                    setError(null);
                    onChange(next);
                }}
            />
            {error && <div className='otext-error'>{error}</div>}
        </div>
    );
};

export default ONumber;
