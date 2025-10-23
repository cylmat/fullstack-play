export default {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },

  // Avoid Error ReferenceError: document is not defined
  // means your test is running in a Node environment without a DOM.
  // React testing libraries rely on the DOM APIs (like document), which Node does not have by default.
  testEnvironment: 'jest-environment-jsdom', // or shortcut 'jsdom'

  // Optionally mock non-JS assets like images and SCSS
  // happens because Jest tries to parse your SCSS file as JavaScript, which it cannot do by default.
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },

  // If you want Jest to transform some node_modules (rare)
//   transformIgnorePatterns: ['/node_modules/(?!(some-module)/)'],

  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
}
