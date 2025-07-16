import React, { FC } from 'react';

export const SelectWrapper: FC<{
    children: React.ReactElement;
    disabled?: boolean;
}> = ({ children, disabled: parentDisabled }) => {
    const props = children.props as React.InputHTMLAttributes<HTMLInputElement>;
    const isDisabled = props.disabled || parentDisabled;

    return React.cloneElement<any>(children, {
        className: `dropdown ${props.className || ''}`.trim(),
        tabIndex: isDisabled ? -1 : 0,
        disabled: isDisabled,
        style: {
            ...props.style,
            opacity: isDisabled ? 0.6 : 1,
            cursor: isDisabled ? 'not-allowed' : 'pointer',
        },
    });
};
