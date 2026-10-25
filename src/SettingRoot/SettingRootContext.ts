import { createContext, useContext, ReactNode } from 'react';

export interface SettingRootContextValue {
    /** Show a drill-down as the full page. */
    openPage: (id: string, name: string, content: ReactNode) => void;
    /** Return to the root content. */
    closePage: () => void;
    /** Currently open drill-down page, or null. */
    activePage: { id: string; name: string; content: ReactNode } | null;
}

export const SettingRootContext = createContext<SettingRootContextValue | null>(
    null,
);

/**
 * Shared root check used by every library component.
 * Throws if the component is rendered outside <SettingRoot>.
 */
export function useSettingRoot(): SettingRootContextValue {
    const ctx = useContext(SettingRootContext);
    if (!ctx) {
        throw new Error(
            'Setting components must be rendered inside <SettingRoot>',
        );
    }
    return ctx;
}