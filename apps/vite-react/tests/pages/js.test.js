
import {screen} from '@testing-library/dom';
import { loadHtml } from '../../public/scripts/vanilla';

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

})
