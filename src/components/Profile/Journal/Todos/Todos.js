import React, { Component } from "react";
import "./Todos.css";
import classnames from "classnames";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { addTodo, deleteTodo } from "../../../../actions/journal_actions";
import PropTypes from "prop-types";

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  getData(formData) {
    this.props.addTodo(
      {
        title: formData.title,
        completed: false,
        created_at: new Date().toLocaleDateString()
      },
      this.props.history
    );
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { handleSubmit } = this.props;

    let Todos = this.props.todos.map((todo, index) => {
      return (
        <div className="bg-secondary p-2 mb-1 rounded todo-item" key={index}>
          {/* from here. */}
          <DeleteIcon
            className="remove-todo-btn"
            onClick={event => this.props.deleteTodo(index)}
          />
          {/* <button
            className="remove-todo-btn"
            onClick={event => this.props.deleteTodo(index)}
          >
            Remove
          </button> */}
          <p
            className={classnames({
              "line-through": todo.completed
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
                  name="title"
                  placeholder="Add Todo Title"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" onClick={this.toggle}>
                Add
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
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
  addTodo: PropTypes.func,
  deleteTodo: PropTypes.func
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
    { addTodo, deleteTodo }
  )(Todos)
);
