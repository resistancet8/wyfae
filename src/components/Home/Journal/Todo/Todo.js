import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./Todo.css";
import classnames from "classnames";

class Todo extends Component {
  render() {
    let Todos = this.props.todos.map(todo => {
      return (
        <p
          className={classnames("bg-secondary p-2 todo-item", {
            "line-through": !todo.completed
          })}
        >
          {todo.title}
          <strong className="font-italic" key={todo.title} />
        </p>
      );
    });

    return (
      <React.Fragment>
        <div className="row">
          <h5 className="text-muted font-weight-bold">Todos</h5>
        </div>
        <div className="row goals-holder mt-3">{Todos}</div>
      </React.Fragment>
    );
  }
}

export default Todo;
