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

document.addEventListener('DOMContentLoaded', function () {
    var dropdowns = document.getElementsByClassName('v-popover ml-auto h-9 flex items-center dropdown-right');
    if (dropdowns.length >= 1) {
        var popupId = dropdowns[0].firstChild.getAttribute('aria-describedby');

        var style = document.createElement('style');
        style.type = 'text/css';
        var css = '#' + popupId + '{' +
            'left: 112px !important;' +
            '}';
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
    }
}, false);
