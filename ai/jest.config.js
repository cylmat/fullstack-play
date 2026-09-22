/** @type {import('jest').Config} */

const commonConfig = {
  transform: {
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      { configFile: './babel.config.jest.cjs' },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testEnvironment: 'node',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

export default {
  projects: [
    {
      ...commonConfig,
      displayName: "server:integration",
      testMatch: ["<rootDir>/server_tests/integration/**.test.js"],
    },
    {
      ...commonConfig,
      displayName: "server:functional",
      testMatch: ["<rootDir>/server_tests/functional/**.test.js"],
    },
  ],
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testEnvironment: 'node',
  roots: ['<rootDir>'],
}
