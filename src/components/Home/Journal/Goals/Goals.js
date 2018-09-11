import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Scrollbars } from "react-custom-scrollbars";

class Goals extends Component {
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
    let Goals = this.props.goals.map(goal => {
      return (
        <p>
          {goal.title}
          <strong className="font-italic" key={goal.title} />
        </p>
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
          <ModalHeader toggle={this.toggle}>
            <h2 className="font-weight-bold">Add New Goal</h2>
          </ModalHeader>
          <ModalBody>
            <form>
              <div class="form-group">
                <textarea
                  class="form-control"
                  id="goal-field"
                  placeholder="Type Your Goal"
                />
              </div>
              <div class="form-group">
                <input type="date" class="form-control" id="goal-date" />
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

export default Goals;
