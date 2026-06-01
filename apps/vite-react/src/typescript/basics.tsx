import React from "react";

/**
 * @doc
 *
 * https://www.typescriptlang.org/docs/handbook/2/basic-types.html
 */

function Basics(): JSX.Element {

  // BASICS //

  let age: number = 30
  let first_name: string = 'John'
  let isReady: boolean = true
  const UNIQUE_KEY: symbol = Symbol('r') // symbol is a primitive data type to create unique values
  let empty: null = null
  let undef: undefined
  let person: object = {name: "Bob"}
  function logg(): void { }
  let numbers: number[] = [1, 2, 3]
  let tuple: [string, number] = ["hello", 10] //  express an array with a fixed number of elements
  enum Color {Red, Green, Blue}

  // Union
  const union: (number | string)[] = [5, 10, "TypeScript"];

  console.log(age, first_name, isReady, UNIQUE_KEY, empty, undef, person, logg, numbers, tuple, Color)
  console.log(union)

  function getNumber(num: number): number {
    return num + age
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

  return (<div>
    <h2>Basics</h2>
    <p>{'getNumber(5): number = ' + getNumber(5)}</p>
    <p>{'enum Direction {Up = 1}, Direction.Up, ' + Direction.Up}</p>
    <p>{'str2: string as unknown as number = ' + str2}</p>
    <p>{'interface IPerson = {' + obj.getFullName() + ': string}'}</p>
    <p>{'new Greeter("world").greet(): string = ' + new Greeter("world").greet()}</p>
  </div>)

}

export default Basics
