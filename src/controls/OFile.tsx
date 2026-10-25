import React, { FC, useEffect, useState } from 'react';

import { useSettingRoot } from '../SettingRoot/SettingRootContext';
import { OFileProps } from './types';
import { OPathSuggestInput } from './OFolder';

/**
 * Obsidian SettingFileControl — vault file path with suggester.
 */
const OFile: FC<OFileProps> = ({
    value,
    onChange,
    placeholder = 'File path',
    filter,
    disabled,
    className,
    'aria-label': ariaLabel,
}) => {
    useSettingRoot();
    const [files, setFiles] = useState<string[]>([]);

    useEffect(() => {
        const vault = (window as any).app?.vault;
        if (!vault?.getFiles) {
            setFiles([]);
            return;
        }
        const paths: string[] = [];
        for (const f of vault.getFiles()) {
            const path: string = f?.path;
            if (path && (!filter || filter(path))) {
                paths.push(path);
            }
        }
        setFiles(paths);
    }, [filter]);

    return (
        <OPathSuggestInput
            value={value}
            onChange={onChange}
            suggestions={files}
            placeholder={placeholder}
            disabled={disabled}
            className={['ofile', className ?? ''].filter(Boolean).join(' ')}
            aria-label={ariaLabel}
            emptyLabel='No files found'
        />
    );
};

export default OFile;
