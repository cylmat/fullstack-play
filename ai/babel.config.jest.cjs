
module.exports = api => {
  const isTest = api.env('test');
  // You can use isTest to determine what presets and plugins to use.

  return {
    presets: [
      // remove typescript annotations
      [
        '@babel/preset-typescript'
      ],

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
    ],
  };
}
