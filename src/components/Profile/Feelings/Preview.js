import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Button from "@material-ui/core/Button";

class Preview extends Component {
  componentDidMount() {
    this.props.previewImage();
  }

  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
          <form>
            <ModalHeader toggle={this.props.toggle}>
              <h2>Preview</h2>
            </ModalHeader>
            <ModalBody>
              <canvas id="canvas" />
              {this.props.img_tag}
              <div className="controls">
                <div className="font-size">
                  <p>Font Size:</p>
                  <div>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        this.props.handleFontSize("plus");
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        this.props.handleFontSize("minus");
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.props.toggle}
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

export default Preview;
