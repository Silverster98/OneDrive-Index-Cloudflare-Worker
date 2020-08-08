
async function renderReadme() {
    const resp = await fetch("readme.md")
    if (!resp.ok) return
    document.querySelector(".container").insertAdjacentHTML('beforeend', '<div class="readme">' + window.marked(await resp.text()) + "</div>")
    Prism.highlightAll()

    // latex math render
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

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll("a.item").forEach(function (i) {
        i.insertAdjacentHTML('beforeend',
            '<div style="flex-grow:1"></div>'
            + (i.hasAttribute("size") ? '<span class="size">' + humanFileSize(i.getAttribute("size"), true) + '</span>' : '')
        )
    })

});

import "https://cdn.jsdelivr.net/npm/marked/marked.min.js"

renderReadme().catch(console.error)

function generatePath(path) {

    const el = (tag, attrs, content) => `<${tag} ${attrs.join(" ")}>${content}</${tag}>`;
    const div = (className, content) => el("div", [`class="${className}"`], content);

    let items = path.split('/')
    let link = ['']
    let els = []

    let i = 0
    for (; i < items.length - 1; i++) {
        link.push(link[i] + items[i] + '/')
        els.push(el('a', [`href="${link[i+1]}"`], items[i] == '' ? '🚩 Home' : decodeURI(items[i])))
    }
    // if (items[i] !== '') link.push(link[i] + items[i])

    if (items[i] !== '') els.push(decodeURI(items[i]))

    // console.log(els)
    return div('path', els.join(' / '))
}

document.getElementsByClassName('container')[0].insertAdjacentHTML('afterbegin', generatePath(window.location.pathname))