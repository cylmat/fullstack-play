// @https://www.typescriptlang.org/docs/handbook/2/generics.html
// @https://www.digitalocean.com/community/tutorials/how-to-use-generics-in-typescript
// @https://trungvose.com/experience/typescript-function-callback-type

let myIdentitySignature5: { <Type>(arg: Type): Type } = () => {};

function identityAny(arg: any): string {
  return arg+'e';
}
let myvar = identityAny('chose')
myvar = identityAny(98)

function identityS<Type>(num: number): boolean {
  let res = num
  return false;
}
let str = identityS<string>(123)
str = identityS(987)

/********
 Generic types
********/
function identityGen<Input>(arg: Input): Input {
  return arg;
}
let myIdentityGen: <Input>(arg: Input) => Input = identityGen;
let myIdentitySignature: { <Type>(arg: Type): Type } = identityGen;

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
  <Type>(arg: Type): Type;
}
function identityUseInt<Type>(arg: Type): string {
  return 'ret';
}
let myIdentity: GenericIdentityFn = identityUseInt;

/***********
  interface with generic
***********/
interface GenericIdentityFnWithGen<Type> {
  (arg: number): Type;
}
function identityUseGen<Type>(arg: Type): string {
  return 'ret';
}
let myIdentityWithGen: GenericIdentityFnWithGen<string> = identityUseGen;
  // let genresult = myIdentityWithGen('123') // error string
let genresult = myIdentityWithGen(123) + 'str'

  
  /****************/
export default function Generic() {return <></>}