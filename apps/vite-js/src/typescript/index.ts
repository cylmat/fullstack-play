
import Basics from "./basics"
import Generics from "./generics"
import Types from "./types"
import ElementHTMLWrapper from "../components/ElementHTMLWrapper"

// @see https://www.typescriptlang.org/cheatsheets/

function TsIndex(): HTMLElement {

    const basicsContent = new ElementHTMLWrapper(Basics())
    const genericsContent = new ElementHTMLWrapper(Generics())
    const typesContent = new ElementHTMLWrapper(Types())

    const container = document.createElement('div')
    container.innerHTML = `
        <div >
            <h3>TS</h3>
            <div>${basicsContent}</div>
            <div>${genericsContent}</div>
            <div>${typesContent}</div>
        </div>
    `

    return container

}

export default TsIndex
