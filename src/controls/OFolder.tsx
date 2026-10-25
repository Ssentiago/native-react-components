import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import { useSettingRoot } from '../SettingRoot/SettingRootContext';
import { OFolderProps } from './types';

/**
 * Obsidian SettingFolderControl mirror (simplified path suggester).
 * DOM: text input + `.suggestion` dropdown of folder paths.
 * Pass `suggestions` to control the list; without it, uses a free-text input.
 */
export interface OPathSuggestInputProps {
    value: string;
    onChange: (value: string) => void;
    suggestions: string[];
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    'aria-label'?: string;
    emptyLabel?: string;
}

const OPathSuggestInput: FC<OPathSuggestInputProps> = ({
    value,
    onChange,
    suggestions,
    placeholder,
    disabled,
    className,
    'aria-label': ariaLabel,
    emptyLabel = 'No matches',
}) => {
    useSettingRoot();
    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState(value);
    const [highlight, setHighlight] = useState(0);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setDraft(value);
    }, [value]);

    useEffect(() => {
        const onPointerDown = (e: PointerEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('pointerdown', onPointerDown);
        return () => document.removeEventListener('pointerdown', onPointerDown);
    }, []);

    const filtered = useMemo(() => {
        const q = draft.trim().toLowerCase();
        if (!q) return suggestions;
        return suggestions.filter((s) => s.toLowerCase().includes(q));
    }, [draft, suggestions]);

    return (
        <div
            ref={rootRef}
            className={['opath-suggest', className ?? '']
                .filter(Boolean)
                .join(' ')}
        >
            <input
                type='text'
                value={draft}
                placeholder={placeholder}
                disabled={disabled}
                aria-label={ariaLabel}
                role='combobox'
                aria-expanded={open}
                aria-autocomplete='list'
                tabIndex={disabled ? -1 : 0}
                onChange={(e) => {
                    setDraft(e.target.value);
                    setOpen(true);
                    setHighlight(0);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={(e) => {
                    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
                        setOpen(true);
                        return;
                    }
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        setHighlight((h) => Math.min(h + 1, filtered.length - 1));
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        setHighlight((h) => Math.max(h - 1, 0));
                    } else if (e.key === 'Enter') {
                        e.preventDefault();
                        const pick = filtered[highlight];
                        if (pick !== undefined) {
                            setDraft(pick);
                            onChange(pick);
                            setOpen(false);
                        }
                    } else if (e.key === 'Escape') {
                        setOpen(false);
                    }
                }}
                onBlur={() => {
                    onChange(draft);
                }}
            />
            {open && !disabled && (
                <div className='suggestion' role='listbox'>
                    {filtered.length === 0 ? (
                        <div className='suggestion-empty'>{emptyLabel}</div>
                    ) : (
                        filtered.map((item, index) => (
                            <div
                                key={item}
                                role='option'
                                aria-selected={index === highlight}
                                className={`suggestion-item${index === highlight ? ' is-selected' : ''}`}
                                onPointerDown={(e) => {
                                    e.preventDefault();
                                    setDraft(item);
                                    onChange(item);
                                    setOpen(false);
                                }}
                                onPointerEnter={() => setHighlight(index)}
                            >
                                {item}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

/**
 * Obsidian SettingFolderControl — folder path with suggester.
 */
const OFolder: FC<OFolderProps> = ({
    value,
    onChange,
    placeholder = 'Folder path',
    filter,
    includeRoot = false,
    disabled,
    className,
    'aria-label': ariaLabel,
}) => {
    useSettingRoot();
    const [allFolders, setAllFolders] = useState<string[]>([]);

    useEffect(() => {
        // Prefer a caller-provided vault when running inside Obsidian.
        const vault = (window as any).app?.vault;
        if (!vault?.getAllLoadedFiles) {
            setAllFolders(includeRoot ? ['/'] : []);
            return;
        }
        const paths: string[] = includeRoot ? ['/'] : [];
        for (const f of vault.getAllLoadedFiles()) {
            if (f?.children !== undefined) {
                const path: string = f.path === '/' ? '/' : f.path;
                if (!filter || filter(path)) {
                    paths.push(path);
                }
            }
        }
        setAllFolders(paths);
    }, [filter, includeRoot]);

    return (
        <OPathSuggestInput
            value={value}
            onChange={onChange}
            suggestions={allFolders}
            placeholder={placeholder}
            disabled={disabled}
            className={['ofolder', className ?? ''].filter(Boolean).join(' ')}
            aria-label={ariaLabel}
        />
    );
};

export default OFolder;
export { OPathSuggestInput };
