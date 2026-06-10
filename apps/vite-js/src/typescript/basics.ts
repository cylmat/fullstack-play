
/**
 * @doc
 *
 * https://www.typescriptlang.org/docs/handbook/2/basic-types.html
 */

function Basics(): HTMLElement {

  // BASICS //

  let age: number = 30
  let first_name: string = 'John'
  let isReady: boolean = true
  const UNIQUE_KEY: symbol = Symbol('r') // symbol is a primitive data type to create unique values
  let person: object = { name: "Bob" }
  function logg(): void { }
  let numbers: number[] = [1, 2, 3]
  let tuple: [string, number] = ["hello", 10] //  express an array with a fixed number of elements
  enum Color {Red, Green, Blue}

  // Union and others

  let empty: null = null
  let undef: undefined
  let nevermind: () => never = () => { throw new Error("Never!") } // represents the type of values that never occur
  const union: (number | string)[] = [5, 10, "TypeScript"]
  type literaltype = "hello" | "world" // literal types can only have one of the specified values
  let literalValue: literaltype = "hello"

  // Custom

  type specificOneCustomType = string | number
  type aliasName = specificOneCustomType
  let aliasValue: aliasName = 42
  var my_fct: (x: number) => number = function (x: number): number { return x * 2 } // function type

let USE = {
  age, first_name, isReady, UNIQUE_KEY, empty, undef, person, logg, numbers, tuple, Color,
  union, nevermind, literalValue, aliasValue, my_fct
}
  // console.log(age, first_name, isReady, UNIQUE_KEY, empty, undef, person, logg, numbers, tuple, Color)
  // console.log(union, nevermind, literalValue, aliasValue)

  function getNumber(
    num: number,
    optional?: number,
    defaultValue: number = 1,
    ...rest: number[]
  ): number {
    // console.log(rest)
    let USE = { ...rest }
    return num + age + defaultValue + (optional || 0)
  }

  enum Direction {
    Up = 1,
    Down,
    Left,
    Right
  }

  // https://www.tutorialspoint.com/typescript/typescript_variables.htm

  var str: string = '1'
  var str2: number = str as unknown as number // Type assertion

  // Interface //
  interface IPerson {
    firstName: string;
    lastName: string;
    getFullName(): string;
  }

  let obj: IPerson = {
    firstName: 'John',
    lastName: 'Doe',
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

  // return (<div>
  //   <h2>Basics</h2>
  //   <p>{'getNumber(5): number = ' + getNumber(5)}</p>
  //   <p>{'enum Direction {Up = 1}, Direction.Up, ' + Direction.Up}</p>
  //   <p>{'str2: string as unknown as number = ' + str2}</p>
  //   <p>{'interface IPerson = {' + obj.getFullName() + ': string}'}</p>
  //   <p>{'new Greeter("world").greet(): string = ' + new Greeter("world").greet()}</p>
  // </div>)

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
