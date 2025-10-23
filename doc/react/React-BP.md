Best practice
=============
* One of the patterns is Flux pattern. React library also provides lot of concepts like Higher Order component, Context, Render props, Refs etc.

Flux Pattern
------------

1. Action
- what triggers the sequence of event
```
export const addUser = (payload) => {
   return ({
       type: 'ADD_USER',
       payload
   })
}
```

2. Dispatcher:
- traffic controller in this scenario
- callback functions that will be used to update the store
```
var Dispatcher = function () {
  return {
    _stores: [],
    register: function (store) {  
      this._stores.push({ store: store });
    },
```

3. Store
- deals with our application state
- object that holds key: value pairs that assist in the rendering
```
constructor(props) {
   super(props);
   this.state = {
       loading: true,
       user: {
           name: "Jane Doe",
           age: 42,
           numKids: 0
       },

render() {
   return (
       <>
       <Movie movie={this.state.movie} />
```

4. View
- does not change until the state has been updated

Refs
----
* Reflux — It is one of the most popular implementations of Flux.
  - https://github.com/reflux/refluxjs

* https://www.javatpoint.com/react-flux-concept
* https://legacy.reactjs.org/blog/2014/05/06/flux.html
* https://fireart.studio/blog/9-react-best-practices-to-improve-your-react-code
* https://medium.com/weekly-webtips/flux-pattern-architecture-in-react-35d0b55313f6