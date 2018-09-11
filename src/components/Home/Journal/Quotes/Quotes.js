import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Scrollbars } from "react-custom-scrollbars";

class Quotes extends Component {
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
          <ModalHeader toggle={this.toggle}>
            <h2>Add New Quote</h2>
          </ModalHeader>
          <ModalBody>
            <form>
              <div class="form-group">
                <textarea
                  class="form-control"
                  id="quote-field"
                  placeholder="Enter Quote"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="author-name"
                  placeholder="Enter Author Name"
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

export default Quotes;
