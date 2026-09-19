// @doc https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
/// <reference types="vite/client" />

declare module '*.svg' {
    const src: string;
    export default src;
}
