import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TsIndex from '../../src/typescript/index.tsx';


describe('Ts', () => {

  test('Render component', () => {
    render(<TsIndex />)
  })

  test('Content component', () => {
    render(<TsIndex />)

    expect(screen.getByText(/^Basics/))
    expect(screen.getByText(/^Generics/))

    expect(screen.getByText(/^interface/)).toHaveTextContent(/interface IPerson = .*/)
  })

})

