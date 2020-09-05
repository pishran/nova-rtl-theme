overrideStyles();
fixPopover();
fixLens();

function overrideStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = window.config.nova_rtl_theme.stylesheet;

    const style = document.createElement('style');
    const css = 'html, button, input, optgroup, select, textarea, .chartist-tooltip, .font-sans, .font-serif {' +
        'font-family: ' + window.config.nova_rtl_theme.font_family + ';' +
        '}';
    style.appendChild(document.createTextNode(css));

    const head = document.head;
    head.appendChild(link);
    head.appendChild(style);
}

function fixPopover() {
    document.addEventListener('DOMContentLoaded', () => {
            const styleSheet = document.styleSheets[0];

            const observer = new MutationObserver(() => {
                const popovers = document.querySelectorAll('[id^="popover"]');

                popovers.forEach(popover => {
                    setTimeout(() => {
                        const placement = popover.getAttribute('x-placement');
                        const translate3d = extractTransformValues(popover.style.transform);
                        const translateX = distanceFromLeft(popover, placement, popOverParent(popover.id));

                        styleSheet.insertRule(`#${popover.id} {transform: translate3d(${translateX}px, ${translate3d[1]}, ${translate3d[2]}) !important;}`);
                    }, 0);
                });
            });

            const body = document.querySelector('body');
            observer.observe(body, {childList: true, subtree: true});
        }
    )

    function extractTransformValues(transform) {
        const translateRegex = /translate3d\(.*\)/;
        const extractedTranslate = transform.match(translateRegex)[0];

        return extractedTranslate.match(/\(.*\)/)[0]
            .replace(/[()]/g, '')
            .split(",")
            .map(a => a.trim());
    }

    function popOverParent(id) {
        return document.querySelector(`[aria-describedby=${id}]`);
    }

    function distanceFromLeft(popover, placement, popoverParent) {
        const boundaries = popoverParent.getBoundingClientRect();

        return placement.indexOf('start') > 0 ?
            boundaries.left :
            boundaries.left + popoverParent.clientWidth - popover.clientWidth;
    }
}

function fixLens() {
    document.addEventListener('DOMContentLoaded', () => {
            const content = document.querySelector('.content');

            const observer = new MutationObserver(() => {
                const back = document.querySelector('[data-testid="lens-back"]');
                if (back !== null) {
                    observer.disconnect();
                    back.innerText = '→';
                    observer.observe(content, {childList: true, subtree: true});
                }
            });

            observer.observe(content, {childList: true, subtree: true});
        }
    )
}
