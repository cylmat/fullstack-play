
module.exports = api => {
  const isTest = api.env('test');
  // You can use isTest to determine what presets and plugins to use.

  return {
    presets: [
      // remove typescript annotations
      '@babel/preset-typescript',
      // Compile le code pour la version actuelle de Node.js qui exécute les tests.
      [ 
        '@babel/preset-env',
        { 
          targets: isTest ? { node: 'current' } : undefined,
          // modules: false, // Do not transform ES modules to CommonJS in test environment
          // use when importing ES modules in the test environment (@anthropic-ai/claude-agent-sdk)
        },
      ],
    ],
  };
}
