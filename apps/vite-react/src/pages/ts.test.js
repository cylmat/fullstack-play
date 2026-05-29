import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TsIndex from '../typescript/index.tsx';


describe('Ts', () => {

  test('Render component', () => {
    render(<TsIndex />)
  })

  test('Content component', () => {
    render(<TsIndex />)

    expect(screen.getByText(/^basics /)).toHaveTextContent(/basics wip/)
  })

})

