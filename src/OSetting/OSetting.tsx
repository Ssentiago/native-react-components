import React, { FC, useLayoutEffect, useRef } from 'react';

import { Setting } from 'obsidian';

import {
    OSETTING_CSS,
    OSETTING_STYLES_ID,
    StyleManager,
} from '../style-manager';
import { WrapElements } from './WrapElements';
import { OSettingProps } from './types/interfaces';
import { descToFragment } from './utils/descToFragment';

const OSetting: FC<OSettingProps> = ({
    name,
    heading,
    desc,
    className,
    noBorder,
    disabled,
    setupObsidianSettingManually,
    children,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const obsidianSettingRef = useRef<Setting | null>(null);

    useLayoutEffect(() => {
        if ((window as any).OSETTING_DISABLE_STYLES === 'true') {
            return;
        }

        StyleManager.getInstance().addStyle(OSETTING_STYLES_ID, OSETTING_CSS);

        return () => {
            StyleManager.getInstance().removeStyle(OSETTING_STYLES_ID);
        };
    }, []);

    useLayoutEffect(() => {
        if (!setupObsidianSettingManually || !containerRef.current) {
            return;
        }

        obsidianSettingRef.current?.clear();

        obsidianSettingRef.current = new Setting(containerRef.current);

        name && obsidianSettingRef.current.setName(name);
        heading && obsidianSettingRef.current.setHeading();
        desc && obsidianSettingRef.current.setDesc(descToFragment(desc));
        className && obsidianSettingRef.current.setClass(className);

        setupObsidianSettingManually(obsidianSettingRef.current);

        disabled && obsidianSettingRef.current.setDisabled(disabled);

        return () => {
            obsidianSettingRef.current?.clear();
            obsidianSettingRef.current = null;
        };
    }, [setupObsidianSettingManually, name, heading, desc, className]);

    if (setupObsidianSettingManually) {
        return (
            <div className={'react-obsidian-settings-item'}>
                <div ref={containerRef} />
            </div>
        );
    }

    return (
        <div
            className={`react-obsidian-settings-item ${noBorder ? 'no-border' : ''} ${className ?? ''}`}
        >
            <div
                className={`setting-item ${heading ? 'setting-item-heading' : ''}`}
            >
                <div className={'setting-item-info'}>
                    {name && <div className={'setting-item-name'}>{name}</div>}
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
                <div className={'setting-item-control'}>
                    {WrapElements(children, disabled)}
                </div>
            </div>
        </div>
    );
};
export default OSetting;
