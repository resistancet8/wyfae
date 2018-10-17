import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Memory from "./Memory";
import Art from "./Art";
import "./Timeline.css";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      currentPost: {}
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(post) {
    this.setState({
      modal: !this.state.modal,
      currentPost: post ? post : {}
    });
  }

  render() {
    let { arts, memory } = this.props;
    return (
      <div>
        <h2 className=" p-2 font-weight-bold text-center">Timeline</h2>
        {arts.length || memory.length ? (
          <div className="p-2">
            <div>
              <h2 className="font-weight-bold">Arts: </h2>
              <Art arts={arts} modalToggle={this.toggle} />
            </div>
            <hr />
            <div>
              <h2 className="font-weight-bold">Memory: </h2>
              <Memory memories={memory} modalToggle={this.toggle} />
            </div>
          </div>
        ) : (
          <small>Nothing to display</small>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <h2 className="font-weight-bold text-uppercase">
              {this.state.currentPost.post_title}
            </h2>
          </ModalHeader>
          <ModalBody>
            {this.state.currentPost.text}
            <br />
            <p className="text-muted font-weight-bold mt-3">
              By: {this.state.currentPost.author}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" variant="outlined" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    memory: state.memory.memory,
    arts: state.arts.arts
  };
}

export default connect(
  mapStateToProps,
  {}
)(Timeline);
