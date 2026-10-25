export class StyleManager {
    private static instance: StyleManager;
    private refCounts = new Map<string, number>();
    private styleElements = new Map<string, HTMLStyleElement>();

    static getInstance(): StyleManager {
        if (!StyleManager.instance) {
            StyleManager.instance = new StyleManager();
        }
        return StyleManager.instance;
    }

    addStyle(id: string, css: string): void {
        const currentCount = this.refCounts.get(id) || 0;
        const newCount = currentCount + 1;
        this.refCounts.set(id, newCount);

        if (this.styleElements.has(id)) {
            const styleElement = this.styleElements.get(id)!;
            styleElement.setAttribute('data-ref-count', newCount.toString());
            return;
        }

        const styleElement = document.createElement('style');
        styleElement.id = id;
        styleElement.textContent = css;
        styleElement.setAttribute('data-ref-count', newCount.toString());
        document.head.appendChild(styleElement);

        this.styleElements.set(id, styleElement);
    }

    removeStyle(id: string): void {
        const currentCount = this.refCounts.get(id) || 0;

        if (currentCount <= 1) {
            const styleElement = this.styleElements.get(id);
            if (styleElement) {
                styleElement.remove();
                this.styleElements.delete(id);
            }
            this.refCounts.delete(id);
        } else {
            const newCount = currentCount - 1;
            this.refCounts.set(id, newCount);

            const styleElement = this.styleElements.get(id);
            if (styleElement) {
                styleElement.setAttribute(
                    'data-ref-count',
                    newCount.toString()
                );
            }
        }
    }
}

export const OSETTING_STYLES_ID = 'osetting-styles';
export const OSETTING_CSS = `
   .osetting-item {
       padding: 8px !important;
       margin-bottom: 12px !important;
       transition: box-shadow 0.3s ease !important;
       border-bottom: 1px solid var(--color-base-30) !important;
   }
   
   .osetting-item.no-border {
       border-bottom: none !important;
   }
   
   .osetting-item:last-child {
       border-bottom: none !important;
   }
   
   .osetting-item .setting-item .button-active {
       background-color: var(--interactive-accent) !important;
       color: var(--text-on-accent) !important;
   }
   
   .osetting-item .setting-item .clickable-icon {
       color: var(--text-muted);
       transition: color 0.2s ease;
   }
   
   .osetting-item .setting-item .clickable-icon:hover {
       color: var(--text-normal);
   }
   
   .osetting-item .setting-item input[type='text'],
   .osetting-item .setting-item input[type='number'] {
       background-color: var(--background-secondary);
       border: 1px solid var(--background-modifier-border);
       border-radius: 4px;
       padding: 6px 8px;
       width: 100%;
   }
   
   .osetting-item svg {
       width: 18px;
       height: 18px;
       transition: transform 0.2s ease;
       flex-shrink: 0;
   }
   
   .osetting-item.collapsible {
    margin-bottom: 1em;
    }
    
    .osetting-item.collapsible details {
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 0.5em;
}

.osetting-item.collapsible summary {
    outline: none;
    display: list-item;
    list-style: disclosure-closed;
    align-items: center;
    gap: 0.5em;
}

.osetting-item.collapsible details[open] > summary {
    list-style: disclosure-open;
}

.collapsible-content {
    margin-top: 0.75em;
    padding-left: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.75em;
}

/* ===== OSettings (drill-down pages) ===== */

.osettings {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.osettings-header {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 0 12px 0;
    position: sticky;
    top: 0;
    background: var(--background-primary);
    z-index: 1;
}

.osettings-header-title {
    font-weight: var(--font-semibold);
    font-size: var(--font-ui-large);
    color: var(--text-normal);
    flex: 1;
}

.osettings-back,
.osettings-root {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
}

.osettings-back:hover,
.osettings-root:hover {
    color: var(--text-normal);
}

.osettings-body {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.osettings-group-items {
    display: flex;
    flex-direction: column;
}

.osettings-page {
    display: flex;
    flex-direction: column;
    gap: 0;
}

/* Page link row — mirrors SettingDefinitionPage entry */
.osettings-page-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    text-align: left;
}

.osettings-page-link:hover {
    background: var(--background-modifier-hover);
}

.osettings-page-link:focus-visible {
    outline: 2px solid var(--interactive-accent);
    outline-offset: -2px;
}

.osettings-page-link .setting-item-control {
    display: flex;
    align-items: center;
    gap: 8px;
}

.osettings-page-value {
    color: var(--text-muted);
    font-size: var(--font-ui-small);
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.osettings-page-chevron {
    display: flex;
    align-items: center;
    color: var(--text-faint);
}

.osettings-page-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 6px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--text-warning, #d9862b);
    color: var(--text-on-accent, #fff);
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
}

/* ===== Controls ===== */

.otext,
.onumber,
.otextarea {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
}

.otext input[type='text'],
.onumber input[type='number'],
.otextarea textarea,
.osecret input[type='text'],
.osecret input[type='password'],
.opath-suggest input[type='text'] {
    background-color: var(--background-primary);
    border: 1px solid var(--background-modifier-border);
    border-radius: var(--radius-s, 4px);
    color: var(--text-normal);
    padding: 6px 8px;
    width: 100%;
    font-size: var(--font-ui-small);
}

.otext input.is-invalid,
.onumber input.is-invalid,
.otextarea textarea.is-invalid {
    border-color: var(--text-error, #e93147);
}

.otext-error {
    color: var(--text-error, #e93147);
    font-size: var(--font-ui-smaller);
}

.otextarea textarea {
    resize: vertical;
    min-height: 4em;
    font-family: var(--font-monospace);
}

.oslider {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-width: 160px;
}

.oslider input[type='range'] {
    flex: 1;
    accent-color: var(--interactive-accent);
}

.oslider-value {
    color: var(--text-muted);
    font-size: var(--font-ui-smaller);
    min-width: 2.5em;
    text-align: right;
    font-variant-numeric: tabular-nums;
}

.ocolor input[type='color'] {
    width: 32px;
    height: 24px;
    padding: 0;
    border: 1px solid var(--background-modifier-border);
    border-radius: var(--radius-s, 4px);
    background: transparent;
    cursor: pointer;
}

.ocolor-swatch {
    display: flex;
    align-items: center;
    gap: 6px;
}

.ocolor-swatch-button {
    width: 28px;
    height: 28px;
    border-radius: var(--radius-s, 4px);
    border: 1px solid var(--background-modifier-border);
    padding: 2px;
    cursor: pointer;
    background: var(--background-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
}

.ocolor-swatch-button:hover {
    border-color: var(--text-muted);
}

.ocolor-swatch-fill {
    width: 100%;
    height: 100%;
    border-radius: 2px;
    display: block;
}

.ocolor-swatch-copy {
    color: var(--text-muted);
    cursor: pointer;
    background: none;
    border: none;
    padding: 0 2px;
    font-size: 14px;
}

.ocolor-swatch-copy:hover {
    color: var(--text-normal);
}

.ocolor-swatch-reset {
    color: var(--text-muted);
}

.ocolor-swatch-reset:hover {
    color: var(--text-normal);
}

.osecret {
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
}

.osecret input {
    flex: 1;
}

.osecret-toggle {
    flex-shrink: 0;
}

.obtn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: var(--button-radius, 4px);
    border: 1px solid var(--background-modifier-border);
    background: var(--background-secondary);
    color: var(--text-normal);
    cursor: pointer;
    font-size: var(--font-ui-small);
}

.obtn:hover:not(:disabled) {
    background: var(--background-modifier-hover);
}

.obtn.mod-cta {
    background: var(--interactive-accent);
    border-color: var(--interactive-accent);
    color: var(--text-on-accent);
}

.obtn.mod-cta:hover:not(:disabled) {
    background: var(--interactive-accent-hover, var(--interactive-accent));
}

.obtn.mod-warning {
    background: var(--text-error, #e93147);
    border-color: var(--text-error, #e93147);
    color: #fff;
}

.obtn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.obtn-icon {
    display: inline-flex;
    align-items: center;
}

.obtn-icon svg {
    width: 16px;
    height: 16px;
}

.oextra-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
}

.oextra-button:hover:not(:disabled) {
    color: var(--text-normal);
}

.oextra-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.osync-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
}

.osync-toggle:hover:not(:disabled) {
    color: var(--text-normal);
}

/* Path suggester */
.opath-suggest {
    position: relative;
    width: 100%;
}

.opath-suggest .suggestion {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 2px;
    background: var(--background-secondary);
    border: 1px solid var(--background-modifier-border);
    border-radius: var(--radius-s, 4px);
    max-height: 200px;
    overflow-y: auto;
    z-index: 20;
    box-shadow: var(--shadow-s, 0 2px 8px rgba(0,0,0,0.15));
}

.opath-suggest .suggestion-item {
    padding: 6px 10px;
    cursor: pointer;
    color: var(--text-normal);
    font-size: var(--font-ui-small);
}

.opath-suggest .suggestion-item.is-selected,
.opath-suggest .suggestion-item:hover {
    background: var(--background-modifier-hover);
}

.opath-suggest .suggestion-empty {
    padding: 6px 10px;
    color: var(--text-muted);
    font-size: var(--font-ui-small);
}

/* Search input (Obsidian .search-input-container) */
.search-input-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
}

.search-input-container input[type='search'] {
    width: 100%;
    padding: 6px 28px 6px 8px;
    border: 1px solid var(--background-modifier-border);
    border-radius: var(--radius-s, 4px);
    background: var(--background-primary);
    color: var(--text-normal);
    font-size: var(--font-ui-small);
}

.search-input-clear-button {
    position: absolute;
    right: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    cursor: pointer;
}

.search-input-clear-button:hover {
    color: var(--text-normal);
}

.search-input-clear-button svg {
    width: 14px;
    height: 14px;
}
.osetting-group {
    display: flex;
    flex-direction: column;
}

.osetting-group-items {
    display: flex;
    flex-direction: column;
}

.setting-root {
    display: flex;
    flex-direction: column;
}

.setting-root-page {
    display: flex;
    flex-direction: column;
}

.setting-root-page-header {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 0 12px 0;
    position: sticky;
    top: 0;
    background: var(--background-primary);
    z-index: 1;
}

.setting-root-page-title {
    font-weight: var(--font-semibold);
    font-size: var(--font-ui-large);
    color: var(--text-normal);
    flex: 1;
}

.setting-root-back {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
}

.setting-root-back:hover {
    color: var(--text-normal);
}

.setting-root-page-body {
    display: flex;
    flex-direction: column;
}

.osetting-drilldown-link {
    cursor: pointer;
}

.osetting-drilldown-link:hover {
    background: var(--background-modifier-hover);
}

.osetting-drilldown-link:focus-visible {
    outline: 2px solid var(--interactive-accent);
    outline-offset: -2px;
}

.osetting-drilldown-link .setting-item-control {
    display: flex;
    align-items: center;
    gap: 8px;
}

.osetting-drilldown-value {
    color: var(--text-muted);
    font-size: var(--font-ui-small);
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.osetting-drilldown-chevron {
    display: flex;
    align-items: center;
    color: var(--text-faint);
}

.osetting-drilldown-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 6px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--text-warning, #d9862b);
    color: var(--text-on-accent, #fff);
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
}
`;
