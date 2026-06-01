import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JsIndex from '../../src/vanilla/index.jsx';


describe('Js', () => {

  test('Render component', () => {
    render(<JsIndex />)
  })

  test('Content component', () => {
    render(<JsIndex />)

    expect(screen.getByText(/^Vanilla/))
  })

})

