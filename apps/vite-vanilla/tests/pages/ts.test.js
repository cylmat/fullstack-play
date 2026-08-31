
import {screen} from '@testing-library/dom';
import TsIndex from '../../src/typescript/index.ts';

function loadFakeBody () {
  document.body.innerHTML = `
    <div id="ts_root"></div>
  `;
}

describe('Ts', () => {

  test('Contet ts ', () => {
      loadFakeBody()

      const tsRoot = document.getElementById('ts_root')
    if (tsRoot) {
        tsRoot.appendChild(TsIndex())
    }

    expect(screen.getByText(/^TS/)).toBeInTheDocument()
  })

  // test('Content component', () => {
  //   render(<TsIndex />)

  //   expect(screen.getByText(/^Basics/))
  //   expect(screen.getByText(/^Generics/))

  //   expect(screen.getByText(/^interface/)).toHaveTextContent(/interface IPerson = .*/)
  // })

})

