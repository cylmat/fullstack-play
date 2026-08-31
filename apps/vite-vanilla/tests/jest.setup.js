// jest.setup.js
import '@testing-library/jest-dom';

/* REACT TESTING LIBRARY (render react components) */
// @doc https://testing-library.com/docs/react-testing-library
// @doc: roles https://testing-library.com/docs/queries/byrole

/*
 * @doc https://jestjs.io/fr/docs/getting-started
 * npm install --save-dev jest
 * npm init jest@latest

// sum.test
function sum(a, b) {
  return a + b;
}
module.exports = sum;

// sum.test.js
const sum = require('./sum');
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// Usage
jest my-test --notify --config=config.json
*/

// AVOID in tests
// TypeError: expect(...).toHaveTextContent is not a function