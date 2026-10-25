import React, { FC, ReactNode } from 'react';

import { useSettingRoot } from '../SettingRoot/SettingRootContext';

export interface OSettingGroupProps {
    heading?: string;
    children: ReactNode;
    className?: string;
}

const OSettingGroup: FC<OSettingGroupProps> = ({
    heading,
    children,
    className,
}) => {
    useSettingRoot();

    return (
        <div
            className={['osetting-group', className ?? '']
                .filter(Boolean)
                .join(' ')}
        >
            {heading && (
                <div className='setting-item setting-item-heading'>
                    <div className='setting-item-info'>
                        <div className='setting-item-name'>{heading}</div>
                    </div>
                </div>
            )}
            <div className='osetting-group-items'>{children}</div>
        </div>
    );
};

export default OSettingGroup;