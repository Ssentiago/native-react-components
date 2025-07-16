export const descToFragment = (desc: string | string[]): DocumentFragment => {
    const fragment = document.createDocumentFragment();
    const text = typeof desc === 'string' ? desc : desc.join('\n');
    const lines = text.split('\n');

    lines.forEach((line, i) => {
        fragment.append(document.createTextNode(line));
        if (i < lines.length - 1) {
            fragment.append(document.createElement('br'));
        }
    });

    return fragment;
};
