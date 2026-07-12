
/**
 * Section: Type manipulation
 *
 * @https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
 */

/*
  TypeScript has two separate namespaces:

  Value space (functions, variables, classes)
  Type space (interfaces, type aliases, classes)
*/

///////////////
// NAMESPACE //
///////////////

// import other namespace from files, for ex:
/// <reference path="generics.ts" />

namespace Validation {
    export interface MyExType { isAcceptable: boolean }
    export interface Blop { setNum: { myNum: number } }
    // export const isString = (x: any): x is string => typeof x === "string"
}

// aliases namespace //

import ValidationType = Validation.MyExType
import PolygonsType = Validation.Blop
let myPolygon: PolygonsType = { setNum: { myNum: 5 } }


function Types(): HTMLElement {

  // Namespaces //

  let myNameCheked: Validation.MyExType = { isAcceptable: true }
  let myNameCheked2: ValidationType = { isAcceptable: true }

  /////////////
  // Classes //
  /////////////

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
  let classA = new GenericClass<number>(0, (x) => x.toString())

  // Constructor

  // "c" must be a constructor that can be called with new, takes no arguments, and produces an AType.
  // extends object = {} is default type parameter
  type Blob = { blob: number }
  function createInstance<AType extends object = Blob>(c: new () => AType): AType {
    return new c()
  }
  class Person { name = "Alice"; }
  let a = createInstance(Person) // returns a Person instance
  let p = createInstance(class { name = "Bob" }) // returns an instance of an anonymous class with a name property

  ////////
  // Keyof Type Operator //

  type Point = { xPlace: number; y: number };
  type P = keyof Point // alias for "x" | "y"
  let pointKey: P = "xPlace"

  type Arrayish = { first: string, bloc: number, isPoint?: boolean} //{ [key: string]: unknown }
  type A = keyof Arrayish
  let testA: A = "isPoint"

  /////////
  // Typeof Type Operator //
  // typeof js (get variable type) <=> typeof ts (create a type from a variable)

  const str: string = 'welcome' // cast as string
  type StringType = typeof str // StringType is of type "string"
  let typeOfString: StringType = 'hello' // typeof str is "string"

  const name = "Alice"
  type DeclaredType = typeof name // DeclaredType is of type "Alice"
  let typeName: DeclaredType = "Alice"

  const settings = {
    theme: "dark",
    fontSize: 16,
  };
  type Settings = typeof settings
  let appSettings: Settings = { theme: "dark", fontSize: 16 }

  // @ts-ignore
  let USE = {
    myNameCheked, myNameCheked2, classA, a, p, pointKey, testA, typeOfString, typeName, appSettings
  }

  const container = document.createElement('div')
    container.innerHTML = `
      <h3>Types</h3>
      <p>Generic classes</p>
    `

  // export html elements
  return container
}

  /****************/

export default Types