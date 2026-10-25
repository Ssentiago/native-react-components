import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';

import {
    SettingRootContext,
    SettingRootContextValue,
} from './SettingRootContext';

export interface SettingRootProps {
    children: ReactNode;
    className?: string;
}

/**
 * Root wrapper for all library components. Provides the page stack
 * used by drill-downs and validates that children are inside the root.
 */
const SettingRoot: FC<SettingRootProps> = ({ children, className }) => {
    const [activePage, setActivePage] =
        useState<SettingRootContextValue['activePage']>(null);

    const openPage = useCallback(
        (id: string, name: string, content: ReactNode) => {
            setActivePage({ id, name, content });
        },
        [],
    );

    const closePage = useCallback(() => {
        setActivePage(null);
    }, []);

    const value = useMemo<SettingRootContextValue>(
        () => ({ openPage, closePage, activePage }),
        [openPage, closePage, activePage],
    );

    return (
        <SettingRootContext.Provider value={value}>
            <div
                className={['setting-root', className ?? '']
                    .filter(Boolean)
                    .join(' ')}
            >
                {activePage ? (
                    <div className='setting-root-page'>
                        <div className='setting-root-page-header'>
                            <button
                                type='button'
                                className='clickable-icon setting-root-back'
                                aria-label='Back'
                                title='Back'
                                onClick={closePage}
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='18'
                                    height='18'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    aria-hidden='true'
                                >
                                    <path d='M15 18l-6-6 6-6' />
                                </svg>
                            </button>
                            <div className='setting-root-page-title'>
                                {activePage.name}
                            </div>
                        </div>
                        <div className='setting-root-page-body'>
                            {activePage.content}
                        </div>
                    </div>
                ) : (
                    children
                )}
            </div>
        </SettingRootContext.Provider>
    );
};

export default SettingRoot;