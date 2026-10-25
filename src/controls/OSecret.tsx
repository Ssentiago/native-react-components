import React, { FC, useState } from 'react';

import { setIcon } from 'obsidian';

import { useSettingRoot } from '../SettingRoot/SettingRootContext';
import { OSecretProps } from './types';

/**
 * Obsidian SecretComponent / SettingSecretControl mirror.
 * DOM: password input with a show/hide extra button.
 */
const OSecret: FC<OSecretProps> = ({
    value,
    onChange,
    placeholder,
    disabled,
    className,
    'aria-label': ariaLabel,
}) => {
    useSettingRoot();
    const [revealed, setRevealed] = useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useLayoutEffect(() => {
        const el = buttonRef.current;
        if (!el) return;
        setIcon(el, revealed ? 'eye-off' : 'eye');
    }, [revealed]);

    return (
        <div
            className={['osecret', className ?? ''].filter(Boolean).join(' ')}
        >
            <input
                type={revealed ? 'text' : 'password'}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                aria-label={ariaLabel}
                tabIndex={disabled ? -1 : 0}
                onChange={(e) => onChange(e.target.value)}
            />
            <button
                ref={buttonRef}
                type='button'
                className='clickable-icon osecret-toggle'
                aria-label={revealed ? 'Hide' : 'Show'}
                disabled={disabled}
                tabIndex={disabled ? -1 : 0}
                onClick={() => setRevealed((v) => !v)}
            />
        </div>
    );
};

export default OSecret;
