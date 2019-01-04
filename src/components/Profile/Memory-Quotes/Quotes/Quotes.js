import React, { Component } from "react";
import "./Quotes.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import { reduxForm, Field, reset } from "redux-form";
import {
  saveJournal,
  deleteJournal
} from "./../../../../actions/journal_actions";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

class Quotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  getData(formData) {
    if(this.props.userpage)
      return;
    this.props.saveJournal("quotes", formData);
    this.props.dispatch(reset("quote-add"));
  }

  toggle() {
    if(this.props.userpage)
      return;
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { handleSubmit } = this.props;
    let { quotes } = this.props;
    let qs = [];
    
    if(this.props.userpage) {
      qs = this.props.quotess || []
    } else {
      qs = quotes;
    }

    let Quotes = qs.length ? (
      qs.map((quote, index) => {
        return (
          <div key={index} className="bg-secondary p-2 mb-1">
            {!this.props.userpage && <DeleteIcon
              className="remove-quote-btn"
              onClick={event => this.props.deleteJournal("quotes", quote._id)}
            /> }
            <p>
              {quote.text}
              <strong className="font-italic">
                {" - "} {quote.author}
              </strong>
            </p>
          </div>
        );
      })
    ) : (
      <small className="text-muted">No Quotes Available</small>
    );

    return (
      <React.Fragment>
         <div className="row">
          <h5 className="text-muted font-weight-bold">Quotes Collection</h5>
          {!this.props.userpage &&<button
            type="button"
            className="ml-auto button-custom"
            onClick={this.toggle}
          >
            <i className=" fas fa-plus-circle fa-lg" />
          </button>
        }

        </div>
        <div className="row quotes-holder mt-3">
          <Scrollbars autoHeight autoHeightMax={350} autoHide>
            {Quotes}
          </Scrollbars>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <form onSubmit={handleSubmit(this.getData.bind(this))}>
            <ModalHeader toggle={this.toggle}>
              <h2>Add New Quote</h2>
            </ModalHeader>
            <ModalBody>
              <div class="form-group">
                <Field
                  component="textarea"
                  class="form-control"
                  id="quote-field"
                  placeholder="Enter Quote"
                  name="text"
                />
              </div>
              <div class="form-group">
                <Field
                  component="input"
                  type="text"
                  class="form-control"
                  id="author-name"
                  name="author"
                  placeholder="Enter Author Name"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" variant="outlined" onClick={this.toggle}>
                Add
              </Button>{" "}
              <Button
                variant="outlined"
                color="secondary"
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

Quotes.propTypes = {
  quotes: PropTypes.array,
  saveJournal: PropTypes.func,
  deleteJournal: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  console.log("***", ownProps)
  return {
    quotes: state.quotes.quotes,
    quotess: ownProps.quotess
  };
}

export default reduxForm({
  form: "quote-add"
})(
  connect(
    mapStateToProps,
    { saveJournal, deleteJournal }
  )(Quotes)
);
