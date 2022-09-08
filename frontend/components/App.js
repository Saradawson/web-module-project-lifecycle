import React from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import Form from './Form';

const URL = 'http://localhost:9000/api/todos'

const fetchTodos = () => {
  return axios.get(URL)
  .then(res => res)
  .catch(err => console.error('get request not working'));
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    fetchTodos(this.state.todos)
    .then(res => {
      this.setState({...this.state, todos: res.data.data});
    })
  }

  inputChange = evt => {
    const { value } = evt.target;
    this.setState({...this.state, todoInput: value })
  }

  render() {
    return (
      <div>
        <TodoList todos={this.state.todos}/>
        <Form inputChange={this.inputChange}/>
        <button>Hide Completed</button>
      </div>
    )
  }
}
