function humanFileSize(bytes, si) {
    bytes = parseInt(bytes, 10)
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}

function addMathJaxLink() {
    window.MathJax = {
        tex: {
            inlineMath: [['$', '$']]
        }
    }

    let script = document.createElement('script')
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js"
    script.async = true
    document.head.appendChild(script)
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith('.md')) addMathJaxLink()

    document.querySelectorAll("a.item").forEach(function (i) {
        i.insertAdjacentHTML('beforeend',
            '<div style="flex-grow:1"></div>'
            + (i.hasAttribute("size") ? '<span class="size">' + humanFileSize(i.getAttribute("size"), true) + '</span>' : '')
        )
    })

});
