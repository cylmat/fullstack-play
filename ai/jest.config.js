/** @type {import('jest').Config} */

 console.info("CONFIG | run tests on ", process.env.NODE_TEST_ENV); // "unit", "func" ou "inte"

/**
 * @doc https://jestjs.io/docs/configuration
 * Default: Jest will use babel-jest transformer for ESM to CommonJs
 */
const commonConfig = {
  moduleNameMapper: {
    // '^@app/(.*)$': '<rootDir>/server/$1' // DEFINED IN TSCONFIG too
  },
  transform: {
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      { configFile: './babel.config.jest.cjs' },
    ],
  },
  // @doc https://jestjs.io/docs/configuration#transformignorepatterns-arraystring
  // Ignore every node_modules except Claude agent SDK for ESM->Cjs
  // transformIgnorePatterns: [
  //   'node_modules/(?!(@anthropic-ai)/)',
  // ],
};

export default {
  bail: true, // Stop running tests after the first failure
  projects: [
     {
      ...commonConfig,
      displayName: "server",
      setupFilesAfterEnv: ["<rootDir>/server_tests/init.js"],
      testMatch: ["<rootDir>/server_tests/**/**.test.js"],
    },
    { // Functional browser "application" with playwright (php KernelTestCase)
      //(ex: allow users to add items to their cart, user+click+storage..)
      ...commonConfig,
      displayName: "server:functional",
      setupFilesAfterEnv: ["<rootDir>/server_tests/init.js"],
      testMatch: ["<rootDir>/server_tests/functional/**/**.test.js"],
    },
    { // Integration ctrl->to->database (php WebTestCase->BrowserKit)
      // (ex: HTTP GET /login, retrieve data..) with mocked dependencies if needed, or not
      ...commonConfig,
      displayName: "server:integration",
      setupFilesAfterEnv: ["<rootDir>/server_tests/init.js"],
      testMatch: ["<rootDir>/server_tests/integration/**/**.test.js"],
    },
    {
      ...commonConfig,
      displayName: "server:unit",
      setupFilesAfterEnv: ["<rootDir>/server_tests/init.js"],
      testMatch: ["<rootDir>/server_tests/unit/**/**.test.js"],
    },
  ],



  // extensionsToTreatAsEsm: ['.ts'],
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  // testEnvironment: 'node',
  // roots: ['<rootDir>'],
}

/**
 * ERROR
 * Le SDK @anthropic-ai/claude-agent-sdk est publié en ESM (sdk.mjs).
 * Or les tests Jest sont exécutés/transpilés en CommonJS.
 * Jest essaye donc de faire un require() du module ESM et échoue.
 * -> l’incompatibilité entre Jest/CommonJS et le SDK, qui est ESM -> .
    Must use import to load ES Module: /var/www/application/node_modules/@anthropic-ai/claude-agent-sdk/sdk.mjs
    The file contains ESM syntax (import/export) that could not be executed as CommonJS. Either:
 */