
// JS

export function loadHtml() {
    const jsText = document.getElementById('js_text')

    // ! innerText is not fully implemented and can behave inconsistently, use textContent.
    jsText.textContent = 'my Vanilla JS'
}

// @https://developer.mozilla.org/fr/docs/Web/API/Document/DOMContentLoaded_event
const DOMContentLoaded = 'DOMContentLoaded'

document.addEventListener(DOMContentLoaded, () => {
    loadHtml()
})