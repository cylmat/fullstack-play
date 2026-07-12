
/**
 * Section: Type manipulation / Generics
 *
 * @https://www.typescriptlang.org/docs/handbook/2/functions.html
 * @https://www.typescriptlang.org/docs/handbook/2/generics.html
 */

function Generics(): HTMLElement {

  function printVar<T>(val: T): T { // T is a generic type
      return val
  }
  function concatenate<T, U>(first: T, second: U): T & U {
      return {...first, ...second}
  }

  function identityGen<Input>(arg: Input): Input {
    return arg;
  }

  function strToNumFct<In, Out>(num: In): Out {
    return num as unknown as Out
  }
  let strToNum: number = strToNumFct<string, number>('123')

  /********
   Generic types
  ********/

  let myGen: <Input>(arg: Input) => Input = identityGen;

  /********
  with array
  **********/
  function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
    console.log(arg.length); // Array has a .length, so no more error
    return arg;
  }

  /**********
  interfaces
  **********/
  interface GenericIdentityFn {
    <Type>(arg: Type): string;
  }
  function identityUseInt<Type>(arg: Type): string {
    return 'ret';
  }
  let myIdentity: GenericIdentityFn = identityUseInt

  //////////////
  // Advanced //
  //////////////

  // Constraints

  function longest<Type extends { length: number }>(a: Type) {
    let s =  typeof a // "string"
    if (a.length >= 2) {
      return a;
    }
  }
  let long = longest("hello")  // "String" have a .length method, so length = 5

  /***********
    interface with generic
  ***********/
  // interface GenericIdentityFnWithGen<Type> {
  //   (arg: number): Type;
  // }
  // function identityUseGen<Type>(arg: Type): string {
  //   return 'ret';
  // }
  // let myIdentityWithGen: GenericIdentityFnWithGen<string> = identityUseGen;
  //   // let genresult = myIdentityWithGen('123') // error string
  // let genresult = myIdentityWithGen(123) + 'str'

  // return (<div>
  //   <h2>Generics</h2>
  //   <p>{'printVar<T> (' + printVar('test') + '): T'}</p>
  //   <p>{'concatenate<T, U> (1, "b"): T & U = ' + JSON.stringify(concatenate(1, "b"))}</p>
  //   <p>{'strToNumFct<string, number>("123"): number = ' + strToNum}</p>
  // </div>)

  ////////////////////////////////////

  /***************
   * UTILITY TYPES
  // @see https://www.typescriptlang.org/docs/handbook/utility-types.htm
   **************/

  // await
  type Aw = Awaited<Promise<string>>
  let myString: Aw = 'test'

  // partial (make all properties optional)
  type MyPartialTodo = Partial<{ title: string; description: string; completed: boolean }>
  let myPartial: MyPartialTodo = { title: 'Clean room' }

  // opposite: Required
  type MyRequiredTodo = Required<{ title?: string; description?: string; completed?: boolean }>

  type MyRO = Readonly<{ title: string; description: string; completed: boolean }>
  let myRO: MyRO = { title: 'Clean room', description: 'Clean the room', completed: false }
  // myRO.title = 'Clean room' // Error: Cannot assign to 'title' because it is a read-only property.

  // Record<Keys, Type>
  type CatName = "miffy" | "boris"
  interface CatInfo { age: number; breed: string; info: string; adress: string; sevred: boolean; }
  const cats: Record<CatName, CatInfo> = {
    miffy: { age: 10, breed: "Persian", info: "Friendly cat", adress: "123 Street", sevred: true },
    boris: { age: 5, breed: "Maine Coon", info: "Playful cat", adress: "456 Avenue", sevred: false },
  }

  // Pick<Type, Keys> and Omit<Type, Keys>
  type TodoPreview = Pick<CatInfo, "age" | "breed"> // type is { age: number; breed: string; }
  type TodoWithoutInfo = Omit<CatInfo, "info"> // type is { age: number; breed: string; adress: string; sevred: boolean; }

  // Exclude<UnionType, ExcludedMembers> and Extract<Type, Union>
  type T0 = Exclude<"a" | "b" | "c", "a">; // type is "b" | "c"
  type T2 = Exclude<string | number | (() => void), Function> // type is string | number
  type T3 = Extract<"a" | "b" | "c", "a" | "f"> // type is "a"

  // Other
  type TParams = Parameters<(s: string) => void> // type is [s: string]
  type TReturn = ReturnType<() => string> // type is string
  class C { x=0; y=0 }
  type TypeC = InstanceType<typeof C> // let my: TypeC -like- let my: C
  type Direction = "left" | "right" | "up" | "down";
  let myUp:  Uppercase<Direction> = 'LEFT' // type is "LEFT" | "RIGHT" | "UP" | "DOWN"
  // Lowercase
  // Capitalize
  // Uncapitalize

  ///////////
  // see also ConstructorParameters, ThisParameterType, ThisType


  // @ts-ignore
  let USE = {
    myGen, loggingIdentity, myIdentity, long,
    myString
  }

  const container = document.createElement('div')
    container.innerHTML = `
      <h3>Generics</h3>
      <p>${'printVar<T> (' + printVar('test') + '): T'}</p>
      <p>${'concatenate<T, U> (1, "b"): T & U = ' + JSON.stringify(concatenate(1, "b"))}</p>
      <p>${'strToNumFct<string, number>("123"): number = ' + strToNum}</p>
    `

  // export html elements
  return container
}

  /****************/

export default Generics