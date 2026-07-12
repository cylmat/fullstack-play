
/**
 * Section: Utility Types
 *
 * @https://www.typescriptlang.org/docs/handbook/utility-types.html
 * @https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 */

/*
js parts: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects
*/


function UtilitiyTypes(): HTMLElement {

  // Try specfic internal interface Typescript for JS declaration, e.g.
  // Regexp, Promise, Map, Set, WeakMap, WeakSet, ...
  let regexp: RegExp = /ab+c/i


  // @ts-ignore
  let USE = { }

  const container = document.createElement('div')
    container.innerHTML = `
      <h3>Utility Types</h3>
    `

  // export html elements
  return container
}

  /****************/

export default UtilitiyTypes