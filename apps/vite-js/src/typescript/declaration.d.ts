// In a .d.ts file or .ts file that is not a module:
// @see https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html

declare module "SomeModule" {
  export function fn(): string;
}