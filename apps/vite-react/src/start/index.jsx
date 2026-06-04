import React from 'react'

function Start() {

  const element = document.querySelector('#counter-button')

  if (element) {
    let counter = 0
    const setCounter = (count) => {
      counter = count
      element.innerHTML = `Count is ${counter}`
    }

    element.addEventListener('click', () => setCounter(counter + 1))

    setCounter(0)
  }
/*
h1 - h6: "head"er
*/
  return (<div>
    {/* <h2>Vanilla JS</h2> */}
    <h1>Haut de la page</h1>
    <p>Voici un paragraphe</p>
    <p>
      <em>
        <span> coucou</span>
        <span> <b>mon texte</b> n'est pas en gras</span>
      </em>
    </p>
  </div>)
}

export default Start
