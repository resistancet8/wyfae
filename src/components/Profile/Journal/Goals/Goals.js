import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Scrollbars } from "react-custom-scrollbars";
import classnames from "classnames";
import { connect } from "react-redux";
import { reduxForm, Field, reset } from "redux-form";
import { addGoal, deleteGoals } from "./../../../../actions/journal_actions";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import "./Goals.css";

class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  getData(formData) {
    this.props.addGoal(formData, this.props.history);
    this.props.dispatch(reset("goal-add"));
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { handleSubmit } = this.props;

    let Goals = this.props.goals.map((goal, index) => {
      return (
        <div className="bg-secondary p-2 mb-1 todo-item" key={index}>
          <DeleteIcon
            className="remove-goals-btn"
            onClick={event => this.props.deleteGoals(index)}
          />
          <p
            className={classnames({
              "line-through": goal.completed
            })}
          >
            {goal.title}
          </p>
          <div className="d-flex">
            <small className="font-italic ml-auto mr-1 p-0 m-0">
              By: {goal.date}
            </small>
          </div>
        </div>
      );
    });

    return (
      <React.Fragment>
        <div className="row">
          <h5 className="text-muted font-weight-bold">Goals</h5>
          <button
            type="button"
            className="ml-auto button-custom"
            onClick={this.toggle}
          >
            <i className=" fas fa-plus-circle fa-lg" />
          </button>
        </div>
        <div className="row goals-holder mt-3">
          <Scrollbars autoHeight autoHeightMax={250} autoHide>
            {Goals}
          </Scrollbars>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <form onSubmit={handleSubmit(this.getData.bind(this))}>
            <ModalHeader toggle={this.toggle}>
              <h2 className="font-weight-bold">Add New Goal</h2>
            </ModalHeader>
            <ModalBody>
              <div class="form-group">
                <Field
                  component="textarea"
                  class="form-control"
                  id="goal-field"
                  name="title"
                  placeholder="Type Your Goal"
                />
              </div>
              <div class="form-group">
                <label>Plan To Complete By:</label>
                <Field
                  component="input"
                  type="date"
                  name="date"
                  class="form-control"
                  id="goal-date"
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

Goals.propTypes = {
  goals: PropTypes.array,
  addGoal: PropTypes.func,
  deleteGoals: PropTypes.func
};

function mapStateToProps(state) {
  return {
    goals: state.goals.goals
  };
}

export default reduxForm({
  form: "goal-add"
})(
  connect(
    mapStateToProps,
    { addGoal, deleteGoals }
  )(Goals)
);
