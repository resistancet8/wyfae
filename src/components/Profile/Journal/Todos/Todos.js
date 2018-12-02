import React, { Component } from "react";
import "./Todos.css";
import classnames from "classnames";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import { reduxForm, Field, reset } from "redux-form";
import {
  saveJournal,
  deleteJournal,
  toggleTodo
} from "../../../../actions/journal_actions";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  getData(formData) {
    this.props.saveJournal("todos", {
      ...formData,
      completed: "No"
    });
    this.props.dispatch(reset("todo-add"));
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { handleSubmit } = this.props;

    let Todos = this.props.todos.length ? (
      this.props.todos.map((todo, index) => {
        return (
          <div
            className="bg-secondary p-2 mb-1 todo-item"
            key={todo._id}
            onClick={event => {
              this.props.toggleTodo(todo._id, todo.completed, index);
            }}
          >
            <DeleteIcon
              className="remove-todo-btn"
              onClick={event => {
                event.stopPropagation();
                this.props.deleteJournal("todos", todo._id);
              }}
            />
            <p className={todo.completed === "Yes" ? "line-through" : ""}>
              {todo.text}
            </p>
          </div>
        );
      })
    ) : (
      <small className="text-muted">No To dos Available</small>
    );

    return (
      <React.Fragment>
        <div className="row">
          <h5 className="text-muted font-weight-bold">To dos</h5>
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
          <form onSubmit={handleSubmit(this.getData.bind(this))}>
            <ModalHeader toggle={this.toggle}>
              <h2>Add New Todo</h2>
            </ModalHeader>
            <ModalBody>
              <div class="form-group">
                <Field
                  component="textarea"
                  class="form-control"
                  id="todo-field"
                  name="text"
                  placeholder="Add Todo Title"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" variant="outlined" onClick={this.toggle}>
                Add
              </Button>{" "}
              <Button
                color="secondary"
                variant="outlined"
                onClick={this.toggle}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array,
  saveJournal: PropTypes.func,
  deleteJournal: PropTypes.func
};

function mapStateToProps(state) {
  return {
    todos: state.todos.todos
  };
}

export default reduxForm({
  form: "todo-add"
})(
  connect(
    mapStateToProps,
    { saveJournal, deleteJournal, toggleTodo }
  )(Todos)
);
