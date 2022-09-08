import React from 'react'

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      todoInput: ''
    }
  }

  inputChange = evt => {
    const { value } = evt.target;
    this.setState({...this.state, todoInput: value })
  }

  render() {
    return (
      <form>
          <input onChange={this.inputChange} value={this.state.todoInput} type='text' placeholder='Type todo'/>
          <button>Submit</button>
        </form>
    )
  }
}
