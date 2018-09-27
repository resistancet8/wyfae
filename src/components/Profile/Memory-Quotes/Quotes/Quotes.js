import React, { Component } from "react";
import "./Quotes.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { addQuote, deleteQuotes } from "./../../../../actions/journal_actions";
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
    this.props.addQuote(formData, this.props.history);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { handleSubmit } = this.props;

    let Quotes = this.props.quotes.length ? (
      this.props.quotes.map((quote, index) => {
        return (
          <div key={index} className="bg-secondary p-2 mb-1">
            <DeleteIcon
              className="remove-quote-btn"
              onClick={event => this.props.deleteQuotes(index)}
            />
            <p>
              {quote.quote}
              <strong className="font-italic" key={quote}>
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
          <h5 className="text-muted font-weight-bold">Quotes</h5>
          <button
            type="button"
            className="ml-auto button-custom"
            onClick={this.toggle}
          >
            <i className=" fas fa-plus-circle fa-lg" />
          </button>
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
                  name="quote"
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

Quotes.propTypes = {
  quotes: PropTypes.array,
  addQuote: PropTypes.func,
  deleteQuotes: PropTypes.func
};

function mapStateToProps(state) {
  console.log("Map", state);
  return {
    quotes: state.quotes.quotes
  };
}

export default reduxForm({
  form: "quote-add"
})(
  connect(
    mapStateToProps,
    { addQuote, deleteQuotes }
  )(Quotes)
);
