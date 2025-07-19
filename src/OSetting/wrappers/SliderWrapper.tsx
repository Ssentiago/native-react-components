import React, { FC, useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

export const SliderWrapper: FC<{
    children: React.ReactElement;
    disabled?: boolean;
}> = ({ children, disabled: parentDisabled }) => {
    const props = children.props as React.InputHTMLAttributes<HTMLInputElement>;
    const isDisabled = props.disabled || parentDisabled;
    const sliderRef = useRef<HTMLInputElement>(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipValue, setTooltipValue] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const updateTooltipPosition = () => {
        if (sliderRef.current) {
            const rect = sliderRef.current.getBoundingClientRect();
            setTooltipPosition({
                x: rect.left + rect.width / 2,
                y: rect.top - 40,
            });
        }
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setShowTooltip(true);

        if (!isDragging) {
            timeoutRef.current = setTimeout(() => {
                setShowTooltip(false);
                timeoutRef.current = null;
            }, 200);
        }

        const value = e.currentTarget.value;
        setTooltipValue(value);
        updateTooltipPosition();
        if (props.onInput) {
            props.onInput(e);
        }
    };
    useEffect(() => {
        const handleEnd = () => {
            setIsDragging(false);
            setShowTooltip(false);
        };

        if (isDragging) {
            document.addEventListener('pointerup', handleEnd);
            document.addEventListener('pointercancel', handleEnd);

            return () => {
                document.removeEventListener('pointerup', handleEnd);
                document.removeEventListener('pointercancel', handleEnd);
            };
        }
    }, [isDragging]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLInputElement>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setTooltipValue(e.currentTarget.value);
        setShowTooltip(true);
        updateTooltipPosition();
        if (props.onMouseEnter) {
            props.onMouseEnter(e);
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLInputElement>) => {
        if (!isDragging) {
            setShowTooltip(false);
        }
        if (props.onMouseLeave) {
            props.onMouseLeave(e);
        }
    };

    const handlePointerDown = () => {
        setIsDragging(true);
        if (!showTooltip) {
            setTooltipValue(sliderRef.current?.value || '');
            setShowTooltip(true);
            updateTooltipPosition();
        }
    };
    return (
        <>
            {React.cloneElement<any>(children, {
                ref: sliderRef,
                className: `slider ${props.className || ''}`.trim(),
                tabIndex: isDisabled ? -1 : 0,
                disabled: isDisabled,
                onInput: handleInput,
                onPointerDown: handlePointerDown,
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
                style: {
                    ...props.style,
                    opacity: isDisabled ? 0.6 : 1,
                    cursor: isDisabled ? 'not-allowed' : 'default',
                },
            })}
            {showTooltip &&
                createPortal(
                    <div
                        className='tooltip mod-top'
                        style={{
                            position: 'fixed',
                            left: tooltipPosition.x,
                            top: tooltipPosition.y,
                            transform: 'translateX(-50%)',
                            zIndex: 1000,
                            pointerEvents: 'none',
                        }}
                    >
                        {tooltipValue}
                        <div className={'tooltip-arrow'}></div>
                    </div>,
                    document.body
                )}{' '}
        </>
    );
};
