init();

function init() {
    overrideStyles();
    fixPopover();
}

function overrideStyles() {
    var head = document.head;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = window.config.nova_rtl_theme.stylesheet;
    head.appendChild(link);

    var style = document.createElement('style');
    style.type = 'text/css';
    var css = 'html, button, input, optgroup, select, textarea, .chartist-tooltip, .font-sans, .font-serif {' +
        'font-family: ' + window.config.nova_rtl_theme.font_family + ';' +
        '}';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
}

function fixPopover() {

    document.addEventListener('DOMContentLoaded', adjustRtlTheme)

    function adjustRtlTheme() {
        const body = document.querySelector('body');
        const config = {childList: true, subtree: true};
        const styleSheet = document.styleSheets[0];

        const observer = new MutationObserver(() => {
            const popovers = document.querySelectorAll("[id^='popover']")

            popovers.forEach(popover => {

                setTimeout(() => {
                    const placement = popover.getAttribute('x-placement');
                    const translate3d = extractTransformValues(popover.style.transform)
                    const translateX = distanceFromLeft(popover, placement, popOverParent(popover.id))

                    styleSheet.insertRule(`#${popover.id} {transform: translate3d(${translateX}px, ${translate3d[1]}, ${translate3d[2]}) !important;}`)
                }, 0)
            })
        });

        observer.observe(body, config)
    }

    function extractTransformValues(transform) {

        const translateRegex = /translate3d\(.*\)/;
        const extractedTranslate = transform.match(translateRegex)[0];

        return extractedTranslate.match(/\(.*\)/)[0]
            .replace(/\(|\)/g, '')
            .split(",")
            .map(a => a.trim());
    }

    function popOverParent(id) {
        return document.querySelector(`[aria-describedby=${id}]`);
    }

    function distanceFromLeft(popover, placement, popoverParent) {
        const boundaries = popoverParent.getBoundingClientRect()

        return placement.indexOf('start') > 0 ?
            boundaries.left :
            boundaries.left + popoverParent.clientWidth - popover.clientWidth;
    }
}