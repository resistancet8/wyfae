import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./Todo.css";
import classnames from "classnames";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

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
          <button
            type="button"
            className="ml-auto button-custom"
            onClick={this.toggle}
          >
            <i className=" fas fa-plus-circle fa-lg" />
          </button>
        </div>
        <div className="row goals-holder mt-3">{Todos}</div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <h2>Add New Todo</h2>
          </ModalHeader>
          <ModalBody>
            <form>
              <div class="form-group">
                <textarea
                  class="form-control"
                  id="todo-field"
                  placeholder="Add Todo Title"
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Add
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Todo;
