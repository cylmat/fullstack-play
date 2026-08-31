
import {screen} from '@testing-library/dom';
import {
  loadHtml,
  fct_construct,
  arr_construct,
  arr_items,
} from '../../public/scripts/vanilla';

// This is pure JS, no frameworks

function loadFakeBody () {
  document.body.innerHTML = `
    <div id="js_text"></div>
  `;
}

describe('Js', () => {

  test('Content js', () => {

    loadFakeBody()
    loadHtml()

    expect(screen.getByText(/^my Vanilla/)).toBeInTheDocument()

    // screen.debug()
  })

  test('functions js', () => {

    let fct = fct_construct(2, 3)


    expect(fct).toBe(5)
    expect(arr_construct.length).toBe(8)
    expect(arr_construct[5]).toBeUndefined()
    expect(arr_items[2]).toBe('c')
  })

})
