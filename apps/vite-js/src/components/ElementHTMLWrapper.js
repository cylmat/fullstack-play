
class ElementHTMLWrapper {
    constructor (htmlElement) {
        this.htmlElement = htmlElement
    }

    toString() {
        return this.htmlElement.outerHTML
    }
}

export default ElementHTMLWrapper