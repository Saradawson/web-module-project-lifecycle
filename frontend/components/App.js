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
      todos: [],
      todoInput: '',
      displayCompleted: true
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
    this.setState({...this.props.todos, todoInput: value })
  }

  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoInput })
      .then(res => {
       this.fetchTodos();
       this.setState({...this.setState, todoInput: ''})
      })
      .catch(err => {
        console.error('post request not working')
      })
  }

  submitTodo = (e) => {
    e.preventDefault();
    this.postNewTodo();
  }

  toggleCompleted = (id) => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.map(todo => {
          if(todo.id !== id) return todo
          return res.data.data 
        })})
      })
      .catch(err => {
        console.error('patch request not working')
      })
  }

  hideCompleted = () => {
    this.setState({ ...this.state, todos: this.state.todos.filter(todo => {
      if(!todo.completed) return todo
    })}) 
  }

  

  render() {
    return (
      <div>
        <TodoList todos={this.state.todos} toggleCompleted={this.toggleCompleted}/>
        <form onSubmit={this.submitTodo}>
          <input onChange={this.inputChange} value={this.state.todoInput} type='text' placeholder='Type todo'/>
          <button>Submit</button>
        </form>
        <button onClick={this.hideCompleted}>{this.state.displayCompleted ? 'hide' : 'show'}</button>
      </div>
    )
  }
}
