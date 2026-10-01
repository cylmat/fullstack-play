
module.exports = api => {
  const isTest = api.env('test'); // babel send NODE_ENV='test'
  // You can use isTest to determine what presets and plugins to use.

  /**
   * Babel is used for transpiling TypeScript and modern JavaScript syntax
   * use preset-env with module "AUTO" in tests to avoid error

     "Must use import to load ES Module: /var/www/application/server_tests/unit/client/anth.client.test.js"
      "The file contains ESM syntax (import/export) that could not be executed as CommonJS. Either:""
      "- Configure a transform (e.g. babel-jest) that compiles this file to CommonJS (see https://jestjs.io/docs/code-transformation)""
      "- If the file is in "node_modules", allow it to be transformed by adjusting "transformIgnorePatterns" (see https://jestjs.io/docs/configuration#transformignorepatterns-arraystring)
      "- Use Node v24.9+ where Jest supports require(esm) natively (see https://jestjs.io/docs/ecmascript-modules#require-of-esm)""

    */

  return {
    presets: [
      // @doc https://babeljs.io/docs/babel-preset-env
      // Compile le code pour la version actuelle de Node.js qui exécute les tests.
      [
        '@babel/preset-env',
        {
          targets: isTest ? { node: 'current' } : undefined,
          // Enable transformation of ES module syntax to another module type.
          // modules: "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false, defaults to "auto"
          // modules: 'auto': detect and convert ESM modules to CommonJS for Jest
          // Setting this to false will preserve ES modules.
          modules: isTest ? 'auto' : false,
        },
      ],

      // remove typescript annotations
      [
        '@babel/preset-typescript'
      ],
    ],
  };
}
