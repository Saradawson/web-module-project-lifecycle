import React from 'react';
import axios from 'axios';

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
      this.setState({todos: res.data.data});
    })
  }

  render() {
    return (
      <div>
        <ul>
        {this.state.todos.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
        </ul>
        <form>
          <input type='text' placeholder='Type todo'/>
          <button>Submit</button>
        </form>
        <button>Hide Completed</button>
      </div>
    )
  }
}
