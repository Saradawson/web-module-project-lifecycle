import React from 'react';
import axios from 'axios';
import TodoList from './TodoList';

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
        <TodoList todos={this.state.todos}/>
        <form>
          <input type='text' placeholder='Type todo'/>
          <button>Submit</button>
        </form>
        <button>Hide Completed</button>
      </div>
    )
  }
}
