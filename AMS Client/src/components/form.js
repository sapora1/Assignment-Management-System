import React, { Component } from 'react'

class App extends Component {
 
  render() {
    return (
      <form>
        <fieldset>
          <label for="name">Enter your name: </label>
          <input type="text" id="name" /><br/><br/>
          <label for="age">Enter your age: </label>
          <input type="number" id="age" /><br/><br/>
          <button>submit</button>
        </fieldset>
      </form>
    )
  }
}

export default App