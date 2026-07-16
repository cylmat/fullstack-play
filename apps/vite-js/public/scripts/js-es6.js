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
// 7. Classes
// 8. Promises
// 9. Symbols (unique identifier)
// 10. Default and rest parameters
// 11. Modules (import/export)
// 12. Template literals
// 13. Generators
// 14. Enhanced object literals
// 15. New built-in methods (e.g., Object.assign, Array.from, String.includes)


// Block-scoped functions
// Tail call optimization (in strict mode)
// Binary and octal literals

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

    for (let variable of [56, 94, 23, 65, 71]) {}
    for (let prop in {a: 1, b: 2, c: 3}) {}
    let p = {object: 5}
    const fruits = new Map([
        ["apples", 500],
        [['array'], 300],
        [p, 201]
    ])
    let fruitmap2 = fruits.get(p) // 201
    const uniqValues = new Set()
    uniqValues.add("blop").add("blop").add("blop") // keep only one

    //

    class Car {
        constructor(name, year) {
            this.name = name
            this.year = year
        }
        static hello() { // defined in class itself
            return "Hello!!";
        }
        age() {
            const date = new Date()
        }
        ageFrom(x) {
            return x - this.year
        }
    }
    class Model extends Car { constructor(brand, mod) { super(brand) } }
    console.log(Car)
    const myCar1 = new Car("Ford", 2014)

    const myPromise = new Promise(function(myResolve, myReject) {
        myResolve(); // when successful
        myReject();  // when error
    });

        // "Consuming Code" (Must wait for a fulfilled Promise).
    myPromise.then(
        function(value) { /* code if successful */ },
        function(error) { /* code if some error */ }
    );

    //

    const person = { firstName: "John" }
    let hiddenUniqId = Symbol('_my_uniq_id') // "global" hidden registry
    person[hiddenUniqId] = 140353
    let undef = person.hiddenUniqId
    function myDefaultParams(x, y = 10) { return x + y }
    function myRestParams(x, y = 10, ...restOf) { return x + y }
    let includes = "aaaa".includes("world"); "aaaa".startsWith('a'); "aaaa".endsWith('a')
    let entries = ["Banana", "Orange"].entries() // [0, Banana]
    let aFrom = Array.from('ABC') // from object
    let keys = ["Banana", "Orange"].keys() // [0, 1]

    const person2 = {firstName: "Anne",lastName: "Smith"};
    Object.assign(person, person2) // Assign Source to Target
    let pattern = /\p{Emoji}/u; // "u" modifier for Unicode, there is a "y" (Sticky) flag too
    let result = pattern.test("Hello 😄")

    //

    function fff (val, index, arr) { return val > 7 }
    let firstPass_8 = [1, 6, 8, 12].find(fff)
    let firstIndex_8 = [1, 6, 8, 12].findIndex(fff)

    //

    const person5 = {name: "John", lastname: "Doe"}
    let reflecHas = Reflect.has(person5, "name")
    function* myGenerator() { // Generator
        yield 'Hello'
        yield 'World'
        yield 'both'
    }
    let a = myGenerator().next().value // Hello
    let b = myGenerator().return('myret') // myret

    // A Proxy is a JavaScript object that can wrap other objects.
    // A Proxy lets you control operations on other objects.
    const myProxy = new Proxy(person5, {
        get: function(target, prop, receiver) {
            return prop in target ? 'blop' + target[prop] : 42
        },
        set: function(target, prop, value) {
            return target[prop] = value
        }
    })
    let myProxy2 = myProxy.name // blopJohn
    let nan = isNaN('Hi')

    // other

    let octal = 0o51 // ES5: 051
    let binary = 0b101 // ES5: parseInt('111', 2)

    // tail call optimization (strict mode)
    // -> a tail call occurs when a function calls another function (or itself)
    //    as its last action before returning a result.
    function factorial(n, accumulator = 1) {
        if (n === 0) {
            return accumulator;
        } else {
            // NOT return n * factorial(n - 1); // Non-optimized recursive call
            return factorial(n - 1, n * accumulator);  // tail call
        }
    }

    let content =  `
        let x = 10; const fct = (a, b) => a + b <br/>
        let arrow = (x, y) => x * y <br/>
        let { dest, structuring } = { dest: '96', structuring: '14' } // {} = Op <br/>
        let [ fruit1, fruit2 ] = ['apple', 'banana'] // [] = Op <br/>
        let spread = [...[23,55,21,87,56], 99] <br/>
        <br/>
        for (variable of [56, 94, 23, 65, 71]) {} // (variable of iterable) <br/>
        for (prop in {a: 1, b: 2, c: 3}) {} // (property in object) <br/>
        new Map([ ["apples", 500], ["key2", "value2"], [{object: 5}, 200] ]) // Map keys can be object <br/>
        let fruits.get("apples") // Map.get() <br/>
        uniqValues = new Set(); uniqValues.add("blop") <br/>
        <br/>
        class {} // A JavaScript class is a template for JavaScript objects. <br/>
        const myPromise = new Promise(function(resolvSuccess, rejectError) { resolvSuccess();  rejectError(); }) <br/>
        <br/>
        let hiddenGlobalUniqId = Symbol('my_id') <br/>
        function myDefaultParams(x, y = 10) { return x + y } <br/>
        function myRestParams(x, y = 10, ...restOf) { return x + y } <br/>
        let includes = "aaaa".includes("world"); "aaaa".startsWith('a'); "aaaa".endsWith('a') <br/>
        let entries = ["Banana", "Orange"].entries() <br/>
        let aFrom = Array.from('ABC') <br/>
        let keys = ["Banana", "Orange"].keys() <br/>
        Object.assign(person, person2) // Assign Source to Target  <br/>
        let pattern = /\p{Emoji}/u; // "u" modifier for Unicode  <br/>
        let result = pattern.test("Hello 😄");  <br/>
        <br/>
        let firstPass_8 = [1, 6, 8, 12].find((val, index, arr) => val > 7 ) <br/>
        let firstIndex_8 = [1, 6, 8, 12].findIndex(fff) <br/>
        <br/>
        import { name, age } from "./person.js"; <br/>
        import message from "./message.js"; <br/>
        const person5 = {name: "John", lastname: "Doe"} <br/>
        let reflecHas = Reflect.has(person5, "name") <br/>
        <br/>
        \`template text \$\{expression} string text\` <br/>
        function* myGenerator() { yield 'Hello'; yield 'World'; } <br/>
        const myProxy = new Proxy(person5, {get.. set..}<br/>
        isNaN('Hi') <br/>
`

/* ES5 (2009)
    "use strict"	Allows code to be executed in "strict mode"
    String [] access	Returns the character at a specified index in a string
    Multiline strings	Aallows strings over multiple lines if escaped with \
    String.trim()	Removes whitespace from both sides of a string
    Array.isArray()	Returns true if a variable is an array
    Array forEach()	Calls a function for each array element
    Array map()	Creates a new array from a function on each element
    Array filter()	Creates an array from array elements that passes a test
    Array reduce()	Reduces an array to a single value (from left)
    Array reduceRight()	Reduces an array to a single value (from right)
    Array every()	Checks if all array values pass a test
    Array some()	Checks if some values pass a test
    Array indexOf()	Search for an element value and returns its position
    Array lastIndexOf()	Search for an element value and returns its position
    JSON.parse()	Convert JSON into a JavaScript object
    JSON.stringify()	Convert JSON into a string
    Date.now()	Returns the number of milliseconds since zero date
    Date toISOString()	Converts a date object into to an ISO string
    Date toJSON()	Converts a date object into to a JSON string
    Property getters	Allows for defining how a property value is retrieved
    Property setters	Allows for defining how a property value is set
    Reserved names	Allows reserved names as property names
    Object.create()	Creates an object from an existing object
    Object.keys()	Returns an array with the keys of an object
    Object management	Object management methods
    Object protection	Object protection methods
    Object defineProperty()	Allows for defining or changing object properties
    Function bind()	Let objects borrow methods from other objects
    Trailing commas	allows trailing commas in object and array definitions:
*/


    // ! innerText is not fully implemented and can behave inconsistently, use textContent.
    jsText.innerHTML = content
}

// @https://developer.mozilla.org/fr/docs/Web/API/Document/DOMContentLoaded_event
const DOMContentLoaded = 'DOMContentLoaded'

document.addEventListener(DOMContentLoaded, () => {
    loadHtml()
})
