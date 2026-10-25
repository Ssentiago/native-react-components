import React, { FC, ReactNode, useLayoutEffect, useRef } from 'react';

import { setIcon } from 'obsidian';

import { useSettingRoot } from '../SettingRoot/SettingRootContext';

export interface OSettingDrillDownProps {
    name: string;
    desc?: string | string[];
    displayValue?: string;
    status?: 'warning' | null;
    visible?: boolean;
    className?: string;
    children: ReactNode;
}

const OSettingDrillDown: FC<OSettingDrillDownProps> = ({
    name,
    desc,
    displayValue,
    status,
    visible = true,
    className,
    children,
}) => {
    const { openPage } = useSettingRoot();
    const chevronRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (chevronRef.current) setIcon(chevronRef.current, 'chevron-right');
    }, []);

    if (!visible) return null;

    return (
        <div
            className={[
                'setting-item',
                'osetting-drilldown-link',
                status === 'warning' ? 'has-warning' : '',
                className ?? '',
            ]
                .filter(Boolean)
                .join(' ')}
            role='button'
            tabIndex={0}
            aria-label={name}
            onClick={() => openPage(name, name, children)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openPage(name, name, children);
                }
            }}
        >
            <div className='setting-item-info'>
                <div className='setting-item-name'>
                    {name}
                    {status === 'warning' && (
                        <span
                            className='osetting-drilldown-status'
                            aria-label='Needs attention'
                            title='Needs attention'
                        >
                            !
                        </span>
                    )}
                </div>
                {desc && (
                    <div className='setting-item-description'>
                        {typeof desc === 'string'
                            ? desc
                            : desc.map((line, i) => (
                                  <div key={i}>{line}</div>
                              ))}
                    </div>
                )}
            </div>
            <div className='setting-item-control'>
                {displayValue && (
                    <div className='osetting-drilldown-value'>
                        {displayValue}
                    </div>
                )}
                <div
                    ref={chevronRef}
                    className='osetting-drilldown-chevron'
                    aria-hidden='true'
                />
            </div>
        </div>
    );
};

export default OSettingDrillDown;