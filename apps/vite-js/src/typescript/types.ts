
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
  class PersonName { name = "Alice"; }
  let a = createInstance(PersonName) // returns a PersonName instance
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

  const settingsAsType = {
    theme: "dark",
    fontSize: 16,
  };
  type SettingsType = typeof settingsAsType
  let appSettings: SettingsType = { theme: "alpha", fontSize: 4 }

  /////////////
  // Indexed //
  /////////////

  type Person = { age: number; birth: {lets: number}; name: string; alive: boolean; bloc?: number };
  type Age = Person["age"|"birth"]
  type EveryKeys = Person[keyof Person] // union of all property types
  let age: Age = 30; // age is of type number
  let birth: Age = {lets: 5} // birth is of type {lets: number}

  const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
  ];
  type PersonArbitraryIndex = typeof MyArray[0] // get the type of an element in the array
  type PersonArbitraryGlobal = typeof MyArray[number] // get the type of an element in the array
  let tryArray: PersonArbitraryGlobal = { name: "Charlie", age: 42 } // type is { name: string; age: number }

  // CONDITIONAL //

  interface Animal { live(): void }
  interface Dog extends Animal { woof(): void }
  interface Piou { piou(): void }
  type ConditionNum = Dog extends Animal ? number : string
  type ConditionStr = Piou extends Animal ? number : string
  let testExtAnimal: ConditionNum = 5 // type is number
  let testExtNot: ConditionStr = "hello" // type is string


  interface IdLabel { id: number  }
  interface NameLabel { name: string  }
  type NameOrId<T extends number | string> = T extends number
    ? IdLabel
    : NameLabel
  let testNameOrId: NameOrId<number> = { id: 5 }


  // @ts-ignore
  let USE = {
    myNameCheked, myNameCheked2, classA, a, p, pointKey, testA,
    typeOfString, typeName, appSettings, age, birth, tryArray,
    testExtAnimal, testExtNot, testNameOrId
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