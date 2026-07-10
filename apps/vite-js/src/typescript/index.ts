
import Basics from "./basics"
import Generics from "./generics"
import ElementHTMLWrapper from "../components/ElementHTMLWrapper"

function TsIndex(): HTMLElement {

    const basicsContent = new ElementHTMLWrapper(Basics())
    const genericsContent = new ElementHTMLWrapper(Generics())

    const container = document.createElement('div')
    container.innerHTML = `
        <div >
            <h3>TS</h3>
            <div>${basicsContent}</div>
            <div>${genericsContent}</div>
        </div>
    `

    return container

}

export default TsIndex
