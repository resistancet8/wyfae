import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { addQuote } from "./../../../../actions/journal_actions";

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

    let Quotes = this.props.quotes.map(quote => {
      return (
        <p>
          {quote.quote}
          <strong className="font-italic" key={quote}>
            {" - "}
            {quote.author}
          </strong>
        </p>
      );
    });

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
          <Scrollbars autoHeight autoHeightMax={250} autoHide>
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

function mapStateToProps(state) {
  return {
    quotes: state.quotes.quotes
  };
}

export default reduxForm({
  form: "quote-add"
})(
  connect(
    mapStateToProps,
    { addQuote }
  )(Quotes)
);
