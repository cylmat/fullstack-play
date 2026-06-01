import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Index from '../../src/react/Index.tsx';


describe('React', () => {

  test('Render component', () => {
    render(<Index />)
  })

  test('Content component', () => {
    render(<Index />)

    expect(screen.getByRole('button')).toHaveTextContent('count is 0')

    expect(screen.getByText(/^Loader data/)).toHaveTextContent(/Loader data: \d+/)
  })

  // test('increments count when button is clicked', () => {
  //   render(<Index />);
  //   const button = screen.getByRole('button');
  //   fireEvent.click(button);
  //   expect(button).toHaveTextContent('count is 1');
  // });

  // test('renders logos and other components', () => {
  //   // render(<Index />);

  //   // Look for images by alt text
  //   // expect(screen.getByAltText('Vite logo')).toBeInTheDocument();
  //   // expect(screen.getByAltText('React logo')).toBeInTheDocument();

  //   // Check if Tabs, Loader, and CssSample components render content
  //   // You may need to use text, roles, or test ids depending on their implementation
  //   // expect(screen.getByText(/React ⚛️ \+ Vite ⚡ \+ Replit 🌀/)).toBeInTheDocument();
  // });
})

