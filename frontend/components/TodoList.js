import React from 'react'

export default class TodoList extends React.Component {

  render() {
    return (
      <div>
        {this.props.todos.map((todo) => (
          <li onClick={this.props.toggleCompleted(todo.id)} key={todo.id}>{todo.name}{todo.completed ? <span>-complete</span> : <span></span>}</li>
        ))}
        </div>
    )
  }
}
