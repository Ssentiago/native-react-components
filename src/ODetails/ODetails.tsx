import React, {
    FC,
    PropsWithChildren,
    useCallback,
    useLayoutEffect,
    useState,
} from 'react';

import {
    OSETTING_CSS,
    OSETTING_STYLES_ID,
    StyleManager,
} from '../style-manager';

interface ODetailsProps {
    name?: string;
    desc?: string;
    defaultExpanded?: boolean;
    expanded?: boolean;
    onToggle?: (opened: boolean) => void;
    className?: string;
}

const ODetails: FC<PropsWithChildren<ODetailsProps>> = ({
    name,
    desc,
    defaultExpanded = false,
    expanded,
    onToggle,
    className,
    children,
}) => {
    const [internalOpen, setInternalOpen] = useState(defaultExpanded);
    const isControlled = expanded !== undefined;

    const open = isControlled ? expanded : internalOpen;

    useLayoutEffect(() => {
        if (process.env.OSETTING_DISABLE_STYLES === 'true') {
            return;
        }

        StyleManager.getInstance().addStyle(OSETTING_STYLES_ID, OSETTING_CSS);

        return () => {
            StyleManager.getInstance().removeStyle(OSETTING_STYLES_ID);
        };
    }, []);

    const toggleHandle = useCallback(
        (e: React.ToggleEvent<HTMLDetailsElement>) => {
            setInternalOpen(e.currentTarget.open);
            onToggle?.(e.currentTarget.open);
        },
        [onToggle]
    );

    return (
        <div
            className={`react-obsidian-settings-item collapsible ${className ?? ''}`}
        >
            <details
                open={open}
                onToggle={toggleHandle}
            >
                <summary>
                    {name && <div className='setting-item-name'>{name} </div>}
                    {desc && (
                        <div className={'setting-item-description'}>{desc}</div>
                    )}
                </summary>
                <div className='collapsible-content'>{children}</div>
            </details>
        </div>
    );
};

export default ODetails;
