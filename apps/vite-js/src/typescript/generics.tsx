import React from "react";

/**
 *
 * @doc
 *
 * @https://www.digitalocean.com/community/tutorials/how-to-use-generics-in-typescript
 * @https://trungvose.com/experience/typescript-function-callback-type
 */

/**
 * Section: Type manipulation / Generics
 *
 * @https://www.tutorialspoint.com/typescript/typescript_generics.htm
 * // @https://www.typescriptlang.org/docs/handbook/2/generics.html
 */

function Generics() {

  function printVar<T>(val: T): T { // T is a generic type
      return val
  }
  function concatenate<T, U>(first: T, second: U): T & U {
      return {...first, ...second}
  }

  function identityGen<Input>(arg: Input): Input {
    return arg;
  }

  // let myIdentitySignature: { <CustomType>(arg: CustomType): CustomType } = identityGen;

  function strToNumFct<In,Out>(num: In): Out {
    return num as unknown as Out
  }
  let strToNum: number = strToNumFct<string, number>('123')

  /********
   Generic types
  ********/

  let myIdentityGen: <Input>(arg: Input) => Input = identityGen;

  /********
  with array
  **********/
  // function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  //   console.log(arg.length); // Array has a .length, so no more error
  //   return arg;
  // }

  /**********
  interfaces
  **********/
  // interface GenericIdentityFn {
  //   <Type>(arg: Type): Type;
  // }
  // function identityUseInt<Type>(arg: Type): string {
  //   return 'ret';
  // }
  // let myIdentity: GenericIdentityFn = identityUseInt;

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

  return (<div>
    <h2>Generics</h2>
    <p>{'printVar<T> (' + printVar('test') + '): T'}</p>
    <p>{'concatenate<T, U> (1, "b"): T & U = ' + JSON.stringify(concatenate(1, "b"))}</p>
    <p>{'strToNumFct<string, number>("123"): number = ' + strToNum}</p>
  </div>)
}

  /****************/

export default Generics