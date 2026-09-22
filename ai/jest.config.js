/** @type {import('jest').Config} */

export default {
  transform: {
    // Babel-jest is already installed with jest-config
    '^.+\\.[jt]sx?$': ['babel-jest', { configFile: './babel.config.jest.cjs' }],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testEnvironment: 'node',
  roots: ['<rootDir>/server_test'],
};
