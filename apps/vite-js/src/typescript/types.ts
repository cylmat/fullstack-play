
/**
 * Section: Type manipulation
 *
 * @see https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
 * @see https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
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
  // @see https://www.typescriptlang.org/static/TypeScript%20Classes-83cc6f8e42ba2002d5e2c04221fa78f9.png
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

  /////////////////
  // CONDITIONAL //
  /////////////////

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

  ////////////////
  // CONSTRAINT //
  ////////////////

  interface IEmail { message: string }
  type MessageOf<T extends { message: any }> = T["message"]
  let usageConstraint: MessageOf<IEmail> = "Hello" // type is "string" (IEmail.message type)

  // condition //

  type MessageOfCond<T> = T extends { message: any } ? T["message"] : boolean
  type _DefaultBool = MessageOfCond<{}> // type is "boolean" (default type)
  let usageDefault: MessageOfCond<IdLabel> = false // type is "boolean" (IdLabel.message doesn't exists so default type is used)

  // Distributive //

  type ToArray<Type> = Type extends any ? Type[] : never // always true
  type StrArrOrNumArr = ToArray<string | number> // string[] | number[]
  let testDistributive: StrArrOrNumArr = ["hello", "world"]
  let testDistributive2: StrArrOrNumArr = [1, 2, 3]

  ////////////
  // MAPPED //
  ////////////

  type Horse = { robe: string }
  type OnlyBoolsAndHorses = {
    [key: string]: boolean | Horse
  }
  let usageMappedHorse: OnlyBoolsAndHorses = {
    isHorse: true,
    myHorse: { robe: "brown" }
  }

  // in keyof //
  //  remove or add  modifiers "readonly" and "?" by prefixing with - or +

  type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean
  }
  type OptionsFlags2<Type> = {
    -readonly [Property in keyof Type]+?: boolean // remove "readonly" and add "?" modifier
  }
  type FeatureFlags = {
    readonly darkMode: boolean,
    newUserProfile: BigInt,
    readonly alphaTest?: string,
    plantasia?: number,
  }
  let usageOfKeyOf: OptionsFlags<FeatureFlags> = {
    darkMode: true,
    newUserProfile: false,
  }

  // alias //

  type Getter<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
  }
  type GetterExclude<Type> = {
    [Property2 in keyof Type as Exclude<Property2, "alphaTest">]: () => Type[Property2]
  }
  type GetterBoth<Type> = {
    [Property2 in keyof Type as `get${Capitalize<string & Exclude<Property2, "alphaTest">>}`]: () => Type[Property2]
  }
  /* type FinalGetter = {
      readonly getDarkMode: () => boolean;
      getNewUserProfile: () => BigInt;
      readonly getAlphaTest?: (() => string | undefined) | undefined;
      getPlantasia?: (() => number | undefined) | undefined;
  } */
  type FinalGetter = Getter<FeatureFlags>
  let usageGetter: FinalGetter = {
    getDarkMode: () => true,
    getNewUserProfile: () => BigInt(42),
    getAlphaTest: () => "my string",
  }

  // TEST property //

  type DBFields = {
    id: { format: "incrementing" };
    name: { type: string; pii: true };
  }
  type ExtractPII<Type> = {
    [Prop5 in keyof Type]: Type[Prop5] extends { pii: boolean } ? 'withPII'|'flop' : 'notPII'
  }
  /* type ObjectsNeeding = {
      id: "notPII";
      name: "withPII" | "flop";
  } */
  type ObjectsNeeding = ExtractPII<DBFields> // type is "name"
  let testExtractPII: ObjectsNeeding = {
    id: 'notPII',
    name: 'withPII',
  }

  // @ts-ignore
  let USE = {
    myNameCheked, myNameCheked2, classA, a, p, pointKey, testA,
    typeOfString, typeName, appSettings, age, birth, tryArray,
    testExtAnimal, testExtNot, testNameOrId, usageConstraint, usageDefault,
    testDistributive, testDistributive2, usageMappedHorse,
    usageOfKeyOf, usageGetter, testExtractPII
  }


  // "infer" // let you create a type variable that can be used in the "true" branch of a conditional type

  // type Flatten<MyType> = MyType extends Array<infer ItemType> ? ItemType : MyType
  //   // equiv: type Flatten<MyType> = MyType extends any[] ? MyType[number] : MyType
  // type Str = Flatten<string[]> // Str is of type "string" // infer is true
  // let flattenStr: Str = "hello"
  // type Num = Flatten<number[]> // Num is of type "number" // infer is true
  // type Bool = Flatten<boolean> // Bool is of type "boolean" // infer is false, so MyType is used instead of ItemType



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