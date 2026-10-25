import React, { FC, useEffect, useState } from 'react';

import { useSettingRoot } from '../SettingRoot/SettingRootContext';
import { OTextProps } from './types';

/**
 * Obsidian TextComponent / SettingTextControl mirror.
 * DOM: `<input type="text">` inside `.setting-item-control`.
 */
const OText: FC<OTextProps> = ({
    value,
    onChange,
    placeholder,
    validate,
    disabled,
    className,
    'aria-label': ariaLabel,
}) => {
    useSettingRoot();
    const [draft, setDraft] = useState(value);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setDraft(value);
        setError(null);
    }, [value]);

    return (
        <div className={['otext', className ?? ''].filter(Boolean).join(' ')}>
            <input
                type='text'
                className={error ? 'is-invalid' : undefined}
                value={draft}
                placeholder={placeholder}
                disabled={disabled}
                aria-label={ariaLabel}
                aria-invalid={error ? true : undefined}
                tabIndex={disabled ? -1 : 0}
                onChange={(e) => {
                    const next = e.target.value;
                    setDraft(next);
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

export default OText;
