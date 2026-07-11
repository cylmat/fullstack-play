
/**
 * @doc
 *
 * https://www.typescriptlang.org/docs/handbook/2/basic-types.html
 * https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
 */


// T, K extends keyof T ?


function Basics(): HTMLElement {

  // BASICS //

  let age: number = 30
  let first_name: string = 'John'
  let isReady: boolean = Boolean("hello") // true (@see typescript/lib/lib.es5.d.ts)
  let person: object = { name: "Bob" }
  // type Impossible = string & number => equiv to "never";
  let choice: string | number = "hello"
  let intersection: object & { name: string } = { name: "Alice" } // intersection type
  let myObj: { name: string} = { name: "Alice" } // object type with specific properties
  let numbers: number[] = [1, 2, 3]
  const UNIQUE_KEY: symbol = Symbol('r') // symbol is a primitive data type to create unique values
  enum Color {Red, Green, Blue}
  enum Direction { Up = 1, Down, Left, Right }

  // Union and others
  // @see strictNullChecks option

  type children = { first: string, second: number}
  let child: children["first"] = "John"
  let empty: null = null
  let undef: undefined
  let nevermind: () => never = () => { throw new Error("Never!") } // represents the type of values that never occur
  type Fct = {
    updateArray: (x: number) => number, // arrow
    updateFct(x: number): number, // function
    (): string, // callable
    new (s: string): Date // newable, constructor
    [key: string]: any, // index signature
  }
  const union: (number | string)[] = [5, 10, "TypeScript"]
  type status =
    | { status: 200, data: any}
    | { status: 404, error: string }
  type literaltype = "hello" | "world" // literal types can only have one of the specified values
  let literalValue: literaltype = "hello"
  // tuples with optional and rest elements
  let tuple: [string, number, number?, string?, ...boolean[]] = ["hello", 10] //  express an array with a fixed number of elements
  const oneHundred: bigint = BigInt(100)

  // Fct //

  function logg(): void { }
  function myFct(name: string, optionAge?: number): void { console.log(name, optionAge) } // optional parameter
  var my_fct: (x: number) => number = function (x: number): number { return x * 2 }

  type MyFunctionType = {
    (x: number): number;
  }
  var my_fct_declare: MyFunctionType = function (x: number): number { return 51 }

  function getNumber(
    num: number,
    other: readonly [string, number],
    defaultValue: number = 1,
    optional?: number,
    ...rest: number[]
  ): number {
    // @ts-ignore
    let USE = { other, ...rest }
    return num + age + defaultValue + (optional || 0)
  }

  // Type assertion

  var str: string = '1'
  var str2: number = str as unknown as number
  var str3: number = str2 as any as number
  let str30: number = <number><unknown>str3
  let obj1: any = { name: "Alice" } as object

  // Narrow "rétrécir" //
  // -> typeof, instanceof, in, (type-guards predicate)


  // JS -typeof- can be "string", "number", "boolean", "symbol", "undefined", "object", "bigint", or "function"..
  // JS -in- check if a property exists in an object
  // JS -instanceof- check if an object is an instance of a class

  function printId(id: number | string) {
    if (typeof id === "string") {
      // In this branch, id is of type 'string'
      let a = id.toUpperCase()
    } else {
      // Here, id is of type 'number'
      let a = id
    }
  }

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
    attributes?: {
      [key: string]: number
    }
  }

  interface Iperson2 extends IPerson {
    readonly addProperty: number // cannot be changed after initialization
  }

  interface API<ResponseType> {
    data: ResponseType
  }

  let obj: IPerson & Iperson2 = {
    firstName: 'John',
    lastName: 'Doe',
    addProperty: 6,
    attributes: { test: 5 },
    getFullName() {
      return this.firstName + ' ' + this.lastName
    }
  }

  // CLASS //

  abstract class AGreeter<SpecificType, Specific2> {
    greeting: string
    #attributePrivate: Map<string, number> // private field
    readonly display?: boolean
    static staticProperty: string = "static property" // static field
    testSpe: SpecificType | Specific2

    // Constructor method
    constructor(message: string, testSpe?: SpecificType) {
      this.greeting = message
      this.#attributePrivate = new Map()
      this.testSpe = testSpe ?? 'r' as SpecificType
    }

    get getAccount() {
      console.log(this.#attributePrivate)
      return this.greeting
    }

    // Class Method
    public greet() {
      return "Hello, " + this.greeting
    }
  }

  class Greeter extends AGreeter<string, number> {}

  // Type Predicate //
  // A type predicate is a special return type that narrows the type of a variable within a conditional block.
  // @see https://www.typescriptlang.org/docs/handbook/2/narrowing.html

  type Fish = { swim: () => void };
  type Bird = { fly: () => void };

  // Type-guard "is"
  function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined
  }

  let testFish: Fish | Bird = { swim: () => true }
  if (isFish(testFish)) testFish.swim() // TypeScript knows that testFish is a Fish here
  else var a = ("Not a fish")

  // Assertions
  function assertIsNumber(value: number): asserts value is number {
    if (typeof value !== 'number') {
      throw new Error('Value is not a number');
    }
  }
  assertIsNumber(5)

// @ts-ignore
let USE = {
  age, first_name, isReady, UNIQUE_KEY, empty, undef, person, myObj, numbers, tuple, Color,
  logg, myFct, my_fct, my_fct_declare, choice, intersection, child,
  union, nevermind, literalValue, p: printId(2),
  oneHundred, aliasValue, aliasId, str30, obj1, testFish,
}

// OTHERS //

  // constructor

  // type CallOrConstruct  = {
  //   (n?: number): string;
  //   new (s: string): Date;
  // }
  // function fnWithConstructor(ctor: CallOrConstruct ): void {
  //   console.log(new ctor("hello"), ctor(42)) // both accepted
  // }

  // overload //

  // function makeDate(timestamp: number): Date;
  // function makeDate(m: number, d: number, y: number): Date;
  // function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {

  const container = document.createElement('div')
  container.innerHTML = `
    <h3>Basics</h3>
    <p>${'getNumber(5): number = ' + getNumber(5, ['test', 3])}</p>
    <p>${'enum Direction {Up = 1}, Direction.Up, ' + Direction.Up}</p>
    <p>${'str2: string as unknown as number = ' + str2}</p>
    <p>${'interface IPerson = {' + obj.getFullName() + ': string}'}</p>
    <p>${'new Greeter("world").greet(): string = ' + new Greeter("world").greet()}</p>
  `

    return container
}

export default Basics
