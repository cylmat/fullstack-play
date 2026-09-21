
module.exports = api => {
  const isTest = api.env('test');
  // You can use isTest to determine what presets and plugins to use.

  return {
    presets: [
      // remove typescript annotations
      '@babel/preset-typescript',
      // Compile le code pour la version actuelle de Node.js qui exécute les tests.
      [ '@babel/preset-env', { targets: isTest ? { node: 'current' } : undefined } ],
    ],
  };
};
