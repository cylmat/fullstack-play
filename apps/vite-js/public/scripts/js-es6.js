'use strict'
// strict mode is a way to opt in to a restricted variant of JavaScript, thereby implicitly opting-out of "sloppy mode".
// It intentionally has different semantics from normal code.
// Strict mode eliminates some JavaScript silent errors by changing them to throw errors.
// It fixes mistakes that make it difficult for JavaScript engines to perform optimizations:
//  strict mode code can sometimes be made to run faster than identical code that's not strict mode.
// It prohibits some syntax likely to be defined in future versions of ECMAScript.

// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript
// https://www.w3schools.com/js/js_es6.asp

/////////
// ES6 (2015) //
/////////
// Summary of new features in ES6 (ECMAScript 2015):
// 1. let and const for block-scoped variables
// 2. Arrow functions
// 3. Destructuring assignment
// 4. Rest and spread operators
// 5. Iterators and for...of loops
// 6. Map and Set data structures

// 5. Template literals
// 6. Default parameters
// 7. Classes
// 8. Modules (import/export)
// 9. Promises
// 10. Generators
// 12. Symbols
// 14. Enhanced object literals
// 15. New built-in methods (e.g., Object.assign, Array.from, String.includes)
// 16. Block-scoped functions
// 17. Tail call optimization (in strict mode)
// 18. Binary and octal literals
// 19. New number and math methods
// 20. New string methods
// 21. New array methods (e.g., Array.find, Array.findIndex)
// 22. New global objects (e.g., Reflect, Proxy)
// 23. New syntax for iterables and generators
// 24. New syntax for modules and dynamic imports
// 25. New syntax for classes and inheritance
// 26. New syntax for template literals and tagged templates
// 27. New syntax for destructuring and default parameters
// 28. New syntax for arrow functions and concise methods
// 29. New syntax for rest and spread operators
// 30. New syntax for block-scoped variables and constants

function loadHtml() {
    const jsText = document.getElementById('js_es6_text')

    let { dest, structuring } = { dest: 'place', structuring: 'destructuring' }
    // or with affectation parenthesis ({} = {}), to avoid syntax error
    let dest1, structuring1
    ( { dest1, structuring1 } = { dest1: 'desti', structuring1: 'destructuring' } )
    let [ fruit1, fruit2 ] = ['apple', 'banana']
    const numbers = [23,55,21,87,56]
    let spread = [...numbers, 99]

    //

    for (variable of [56, 94, 23, 65, 71]) {}
    for (prop in {a: 1, b: 2, c: 3}) {}
    let p = {object: 5}
    const fruits = new Map([
        ["apples", 500],
        [['array'], 300],
        [p, 201]
    ])
    let fruitmap2 = fruits.get(p) // 201
    const uniqValues = new Set()
    uniqValues.add("blop")

    //

    class Car {
        constructor(name, year) {
            this.name = name
            this.year = year
        }
        age() {
            const date = new Date()
        }
        ageFrom(x) {
            return x - this.year
        }
    }
    console.log(Car)
    const myCar1 = new Car("Ford", 2014)

    let content =  `
        let x = 10; const fct = (a, b) => a + b <br/>
        let arrow = (x, y) => x * y <br/>
        let { dest, structuring } = { dest: '96', structuring: '14' } // {} = Op <br/>
        let [ fruit1, fruit2 ] = ['apple', 'banana'] // [] = Op <br/>
        let spread = [...[23,55,21,87,56], 99] <br/>
        <br/>
        for (variable of [56, 94, 23, 65, 71]) {} // (variable of iterable) <br/>
        for (prop in {a: 1, b: 2, c: 3}) {} // (property in object) <br/>
        new Map([ ["apples", 500], ["key2", "value2"], [{object: 5}, 200] ]) // Map keys can be object<br/>
        let fruits.get("apples") // Map.get() <br/>
        uniqValues = new Set(); uniqValues.add("blop") <br/>
        <br/>
        class {} // A JavaScript class is a template for JavaScript objects. <br/>
`


    // ! innerText is not fully implemented and can behave inconsistently, use textContent.
    jsText.innerHTML = content
}

// @https://developer.mozilla.org/fr/docs/Web/API/Document/DOMContentLoaded_event
const DOMContentLoaded = 'DOMContentLoaded'

document.addEventListener(DOMContentLoaded, () => {
    loadHtml()
})
