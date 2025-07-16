import React, { FC, useLayoutEffect, useRef } from 'react';

import { setIcon } from 'obsidian';

export const ButtonWrapper: FC<{
    children: React.ReactElement;
    disabled?: boolean;
}> = ({ children, disabled }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const props =
        children.props as React.ButtonHTMLAttributes<HTMLButtonElement> &
            Record<string, any>;

    const iconName = props['data-icon'];

    useLayoutEffect(() => {
        const el = buttonRef.current;

        if (!el || !iconName || disabled) return;

        setIcon(el, iconName);
    }, [disabled, iconName]);

    return React.cloneElement<any>(children, {
        ref: buttonRef,
        disabled: disabled,
        tabIndex: disabled ? -1 : props.tabIndex || 0,
        style: {
            ...props.style,
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? 'not-allowed' : 'default',
        },
    });
};
