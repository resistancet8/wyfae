import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./Todo.css";
import classnames from "classnames";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";

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
        <div className="bg-secondary p-2 mb-1 rounded todo-item">
          <p
            className={classnames({
              "line-through": !todo.completed
            })}
          >
            {todo.title}
          </p>
          <div className="d-flex">
            <small className="font-italic ml-auto mr-1 p-0 m-0">
              Created At: {todo.created_at}
            </small>
          </div>
        </div>
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
        <div className="row todos-holder mt-3">
          <Scrollbars autoHeight autoHeightMax={250} autoHide>
            {Todos}
          </Scrollbars>
        </div>
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

function mapStateToProps(state) {
  return {
    todos: state.todos.todos
  };
}

export default connect(
  mapStateToProps,
  {}
)(Todo);
