
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
  let isReady: boolean = true
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
  var my_fct: (x: number) => number = function (x: number): number { return x * 2 } // function type

  // Type assertion

  var str: string = '1'
  var str2: number = str as unknown as number
  var str3: number = str2 as any as number
  let str30: number = <number><unknown>str3
  let obj1: any = { name: "Alice" } as object

  // Narrow "rétrécir"

  function printId(id: number | string) {
    if (typeof id === "string") {
      // In this branch, id is of type 'string'
      console.log(id.toUpperCase());
    } else {
      // Here, id is of type 'number'
      console.log(id);
    }
  }

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


// @ts-ignore
let USE = {
  age, first_name, isReady, UNIQUE_KEY, empty, undef, person, myObj, numbers, tuple, Color,
  logg, myFct, my_fct, union, nevermind, literalValue, p: printId(2),
   oneHundred, aliasValue, aliasId, str30, obj1
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
