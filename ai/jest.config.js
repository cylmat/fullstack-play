/** @type {import('jest').Config} */

/**
 * @doc https://jestjs.io/docs/configuration
 * Default: Jest will use babel-jest transformer for ESM to CommonJs
 */
const commonConfig = {
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
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
  testEnvironment: 'node',
};

export default {
  projects: [
    {
      ...commonConfig,
      displayName: "server:integration",
      setupFilesAfterEnv: ["<rootDir>/server_tests/init.js"],
      testMatch: ["<rootDir>/server_tests/integration/**.test.js"],
    },
    {
      ...commonConfig,
      displayName: "server:functional",
      setupFilesAfterEnv: ["<rootDir>/server_tests/init.js"],
      testMatch: ["<rootDir>/server_tests/functional/**.test.js"],
    },
  ],
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testEnvironment: 'node',
  roots: ['<rootDir>'],
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