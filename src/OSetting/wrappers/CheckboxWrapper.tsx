import React, { FC, useRef, useState } from 'react';

export const CheckboxWrapper: FC<{
    children: React.ReactElement;
    disabled?: boolean;
}> = ({ children, disabled: parentDisabled }) => {
    const props = children.props as React.InputHTMLAttributes<HTMLInputElement>;
    const checkboxRef = useRef<HTMLInputElement>(null);
    const isDisabled = props.disabled || parentDisabled;

    const isControlled = props.checked !== undefined;
    const [internalChecked, setInternalChecked] = useState(
        props.defaultChecked || false,
    );

    const checked = isControlled ? props.checked : internalChecked;

    const handleDivClick = () => {
        if (isDisabled) return;
        checkboxRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isDisabled) return;
        if (!isControlled) {
            setInternalChecked(e.target.checked);
        }
        if (props.onChange) {
            props.onChange(e);
        }
    };

    const ariaProps = Object.keys(props).reduce(
        (acc, key) => {
            if (key.startsWith('aria-')) {
                acc[key] = props[key as keyof typeof props];
            }
            return acc;
        },
        {} as Record<string, any>,
    );

    return (
        <div
            className={`checkbox-container ${checked ? 'is-enabled' : ''} ${isDisabled ? 'is-disabled' : ''}`}
            onPointerDown={handleDivClick}
            {...ariaProps}
            style={{
                cursor: isDisabled ? 'not-allowed' : 'default',
                opacity: isDisabled ? 0.6 : 1,
            }}
        >
            {React.cloneElement<any>(children, {
                ref: checkboxRef,
                tabIndex: isDisabled ? -1 : 0,
                onChange: handleChange,
                checked: checked,
                disabled: isDisabled,
                style: { pointerEvents: 'none' },
                ...Object.keys(ariaProps).reduce(
                    (acc, key) => {
                        acc[key] = undefined;
                        return acc;
                    },
                    {} as Record<string, any>,
                ),
            })}
        </div>
    );
};
