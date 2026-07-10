
/**
 * @doc
 *
 * https://www.typescriptlang.org/docs/handbook/2/basic-types.html
 * https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
 */

function Basics(): HTMLElement {

  // BASICS //

  let age: number = 30
  let first_name: string = 'John'
  let isReady: boolean = Boolean("hello") // true (@see typescript/lib/lib.es5.d.ts)
  const UNIQUE_KEY: symbol = Symbol('r') // symbol is a primitive data type to create unique values
  let person: object = { name: "Bob" }
  let myObj: { name: string} = { name: "Alice" } // object type with specific properties
  let numbers: number[] = [1, 2, 3]
  let tuple: [string, number] = ["hello", 10] //  express an array with a fixed number of elements
  enum Color {Red, Green, Blue}
  enum Direction { Up = 1, Down, Left, Right }

  // Union and others
  // @see strictNullChecks option

  let empty: null = null
  let undef: undefined
  let nevermind: () => never = () => { throw new Error("Never!") } // represents the type of values that never occur
  const union: (number | string)[] = [5, 10, "TypeScript"]
  type literaltype = "hello" | "world" // literal types can only have one of the specified values
  let literalValue: literaltype = "hello"
  const oneHundred: bigint = BigInt(100)

  // Fct //

  function logg(): void { }
  function myFct(name: string, optionAge?: number): void { console.log(name, optionAge) } // optional parameter
  var my_fct: (x: number) => number = function (x: number): number { return x * 2 }

  type MyFunctionType = {
    (x: number): number;
  }
  var my_fct_declare: MyFunctionType = function (x: number): number { return 51 }

  // constructor //
  // type CallOrConstruct  = {
  //   (n?: number): string;
  //   new (s: string): Date;
  // }
  // function fnWithConstructor(ctor: CallOrConstruct ): void {
  //   console.log(new ctor("hello"), ctor(42)) // both accepted
  // }

  function getNumber(
    num: number,
    optional?: number,
    defaultValue: number = 1,
    ...rest: number[]
  ): number {
    // @ts-ignore
    let USE = { ...rest }
    return num + age + defaultValue + (optional || 0)
  }

  // Type assertion

  var str: string = '1'
  var str2: number = str as unknown as number
  var str3: number = str2 as any as number
  let str30: number = <number><unknown>str3
  let obj1: any = { name: "Alice" } as object

  // Narrow "rétrécir" //
  // JS -typeof- can be "string", "number", "boolean", "symbol", "undefined", "object", "bigint", or "function"..
  // JS -in- check if a property exists in an object
  // JS -instanceof- check if an object is an instance of a class

  function printId(id: number | string) {
    if (typeof id === "string") {
      // In this branch, id is of type 'string'
      console.log(id.toUpperCase());
    } else {
      // Here, id is of type 'number'
      console.log(id);
    }
  }

  let fish: { swimAttribute: boolean } = { swimAttribute: true }
  if ("swimAttribute" in fish) console.log('swim fish')

  ////////////////////
  // Advanced Types //
  ////////////////////

  // Custom

  type specificOneCustomType = string | number
  type typeAlias = specificOneCustomType // Type alias
  type ID = typeAlias & {add: string} & number | string
  let aliasValue: typeAlias = 42
  let aliasId: ID = "abc123"


  // Interface //
  interface IPerson {
    firstName: string;
    getFullName(): string;
  }

  interface IPerson { // ! Caution: Can add properties to an existing interface ! ("declaration merging")
    lastName: string;
  }

  interface Iperson2 extends IPerson {
    addProperty: number
  }

  let obj: IPerson & Iperson2 = {
    firstName: 'John',
    lastName: 'Doe',
    addProperty: 6,
    getFullName() {
      return this.firstName + ' ' + this.lastName
    }
  }

  // CLASS //

  class Greeter {
    greeting: string;
    // Constructor method
    constructor(message: string) {
      this.greeting = message
    }
    // Class Method
    public greet() {
      return "Hello, " + this.greeting
    }
  }

  // Type Predicate //
  // A type predicate is a special return type that narrows the type of a variable within a conditional block.
  // @see https://www.typescriptlang.org/docs/handbook/2/narrowing.html

  type Fish = { swim: () => void };
  type Bird = { fly: () => void };
  function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined
  }
  let testFish: Fish | Bird = { swim: () => true }
  if (isFish(testFish)) testFish.swim() // TypeScript knows that testFish is a Fish here
  else console.log("Not a fish")


// @ts-ignore
let USE = {
  age, first_name, isReady, UNIQUE_KEY, empty, undef, person, myObj, numbers, tuple, Color,
  logg, myFct, my_fct, my_fct_declare,
  union, nevermind, literalValue, p: printId(2),
  oneHundred, aliasValue, aliasId, str30, obj1, testFish
}


  const container = document.createElement('div')
  container.innerHTML = `
    <h3>Basics</h3>
    <p>${'getNumber(5): number = ' + getNumber(5)}</p>
    <p>${'enum Direction {Up = 1}, Direction.Up, ' + Direction.Up}</p>
    <p>${'str2: string as unknown as number = ' + str2}</p>
    <p>${'interface IPerson = {' + obj.getFullName() + ': string}'}</p>
    <p>${'new Greeter("world").greet(): string = ' + new Greeter("world").greet()}</p>
  `

    return container
}

export default Basics
