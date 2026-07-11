
/**
 * Section: Type manipulation / Generics
 *
 * @https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
 */

import { create } from "domain";

function Types(): HTMLElement {

  class GenericClass<NumType> {
    zeroValue: NumType = 5 as NumType;
    add: (x: NumType) => string = function(x: NumType): string { return x as string }

    constructor(zeroValue: NumType, add: (x: NumType) => string) {
      this.zeroValue = zeroValue;
      this.add = add;
    }

    getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
      return obj[key];
    }
  }

  // Constructor

  // "c" must be a constructor that can be called with new, takes no arguments, and produces an AType.
  // extends object = {} is default type parameter
  function createInstance<AType extends object = { blob: number }>(c: new () => AType): AType {
    return new c()
  }
  class Person { name = "Alice"; }
  let a = createInstance(Person) // returns a Person instance
  let p = createInstance(class { name = "Bob" }) // returns an instance of an anonymous class with a name property

  // @ts-ignore
  let USE = {  }

  const container = document.createElement('div')
    container.innerHTML = `
      <h3>GenerTypesics</h3>
      <p>Generic classes</p>
    `

  // export html elements
  return container
}

  /****************/

export default Types