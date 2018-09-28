import React, { Component } from "react";
import classnames from "classnames";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import { reduxForm, Field, reset } from "redux-form";
import { addNotes, deleteNotes } from "../../../../actions/journal_actions";
import PropTypes from "prop-types";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  getData(formData) {
    this.props.addNotes(
      {
        title: formData.title,
        created_at: new Date().toLocaleDateString()
      },
      this.props.history
    );
    this.props.dispatch(reset("note-add"));
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { handleSubmit } = this.props;

    let Notes = this.props.notes.length ? (
      this.props.notes.map((note, index) => {
        return (
          <div className="bg-secondary p-2 mb-1 todo-item" key={index}>
            <DeleteIcon
              className="remove-todo-btn"
              onClick={event => this.props.deleteNotes(index)}
            />
            <p
              className={classnames({
                "line-through": note.completed
              })}
            >
              {note.title}
            </p>
          </div>
        );
      })
    ) : (
      <small className="text-muted">No Notes Available</small>
    );

    return (
      <React.Fragment>
        <div className="row">
          <h5 className="text-muted font-weight-bold">Notes</h5>
          <button
            type="button"
            className="ml-auto button-custom"
            onClick={this.toggle}
          >
            <i className=" fas fa-plus-circle fa-lg" />
          </button>
        </div>
        <div className="row notes-holder mt-3">
          <Scrollbars autoHeight autoHeightMax={250} autoHide>
            {Notes}
          </Scrollbars>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <form onSubmit={handleSubmit(this.getData.bind(this))}>
            <ModalHeader toggle={this.toggle}>
              <h2>Add A Note</h2>
            </ModalHeader>
            <ModalBody>
              <div class="form-group">
                <Field
                  component="textarea"
                  class="form-control"
                  id="note-field"
                  name="title"
                  placeholder="Add New Note"
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

Notes.propTypes = {
  notes: PropTypes.array,
  addNotes: PropTypes.func
};

function mapStateToProps(state) {
  return {
    notes: state.notes.notes
  };
}

export default reduxForm({
  form: "note-add"
})(
  connect(
    mapStateToProps,
    { addNotes, deleteNotes }
  )(Notes)
);