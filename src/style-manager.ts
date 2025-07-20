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


`;
