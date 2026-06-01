import React from 'react'

function JsIndex() {

  const element = document.querySelector('#counter-button')

  if (element) {
    let counter = 0
    const setCounter = (count) => {
      counter = count
      element.innerHTML = `count is ${counter}`
    }

    element.addEventListener('click', () => setCounter(counter + 1))

    setCounter(0)
  }

  return (<div>
    <h2>Vanilla JS</h2>
  </div>)
}

export default JsIndex
