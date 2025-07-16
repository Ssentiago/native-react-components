import React from 'react';

import { ButtonWrapper } from './wrappers/ButtonWrapper';
import { CheckboxWrapper } from './wrappers/CheckboxWrapper';
import { SelectWrapper } from './wrappers/SelectWrapper';
import { SliderWrapper } from './wrappers/SliderWrapper';

export const WrapElements = (
    children: React.ReactNode,
    parentDisabled?: boolean
): React.ReactNode => {
    return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const props = child.props as any;
            const isDisabled = props.disabled || parentDisabled;

            if (child.type === 'input') {
                if (props.type === 'checkbox') {
                    return (
                        <CheckboxWrapper disabled={isDisabled}>
                            {child}
                        </CheckboxWrapper>
                    );
                }

                if (props.type === 'range') {
                    return (
                        <SliderWrapper disabled={isDisabled}>
                            {child}
                        </SliderWrapper>
                    );
                }

                return React.cloneElement<any>(child, {
                    disabled: isDisabled,
                    tabIndex: isDisabled ? -1 : props.tabIndex || 0,
                    style: {
                        ...props.style,
                        opacity: isDisabled ? 0.6 : 1,
                        cursor: isDisabled ? 'not-allowed' : 'text',
                    },
                });
            }

            if (child.type === 'button') {
                return (
                    <ButtonWrapper disabled={isDisabled}>{child}</ButtonWrapper>
                );
            }

            if (child.type === 'select') {
                return (
                    <SelectWrapper disabled={isDisabled}>{child}</SelectWrapper>
                );
            }

            if (child.type === 'textarea') {
                return React.cloneElement<any>(child, {
                    disabled: isDisabled,
                    tabIndex: isDisabled ? -1 : props.tabIndex || 0,
                    style: {
                        ...props.style,
                        opacity: isDisabled ? 0.6 : 1,
                        cursor: isDisabled ? 'not-allowed' : 'text',
                    },
                });
            }

            if (child.type === 'a') {
                return React.cloneElement<any>(child, {
                    tabIndex: isDisabled ? -1 : props.tabIndex || 0,
                    onClick: isDisabled
                        ? (e: Event) => e.preventDefault()
                        : props.onClick,
                    style: {
                        ...props.style,
                        opacity: isDisabled ? 0.6 : 1,
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        pointerEvents: isDisabled ? 'none' : 'auto',
                    },
                });
            }

            if (props.onClick || props.onMouseDown || props.onMouseUp) {
                return React.cloneElement<any>(child, {
                    onClick: isDisabled ? undefined : props.onClick,
                    onMouseDown: isDisabled ? undefined : props.onMouseDown,
                    onMouseUp: isDisabled ? undefined : props.onMouseUp,
                    tabIndex: isDisabled ? -1 : props.tabIndex || 0,
                    style: {
                        ...props.style,
                        opacity: isDisabled ? 0.6 : 1,
                        cursor: isDisabled
                            ? 'not-allowed'
                            : props.style?.cursor || 'pointer',
                        pointerEvents: isDisabled ? 'none' : 'auto',
                    },
                    children: props.children
                        ? WrapElements(props.children, isDisabled)
                        : props.children,
                });
            }

            if (props.children) {
                return React.cloneElement<any>(child, {
                    children: WrapElements(props.children, isDisabled),
                });
            }
        }

        return child;
    });
};
