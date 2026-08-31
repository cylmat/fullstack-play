
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript

////////
// JS //
////////

// function creation // (arg1, arg2, functionBody)
let fct_construct = new Function('x', 'y', 'return x + y')

let arr_construct = new Array(8)
let arr_items = new Array('a', 'b', 'c')

/////////
// DOM //
/////////

function loadHtml() {
    const jsText = document.getElementById('js_text')

    // ! innerText is not fully implemented and can behave inconsistently, use textContent.
    jsText.textContent = 'my Vanilla JS'
}

// @https://developer.mozilla.org/fr/docs/Web/API/Document/DOMContentLoaded_event
const DOMContentLoaded = 'DOMContentLoaded'

document.addEventListener(DOMContentLoaded, () => {
    loadHtml()
})

// "Export" must use "modules" <script type="module" src="script.js"></script>
// export { loadHtml }
