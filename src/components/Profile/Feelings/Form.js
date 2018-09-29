import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export default class Form extends Component {
  render() {
    return (
      <div>
        <div className="data-holder form-group">
          <textarea
            name="thoughts-feelings"
            id="thoughts-feelings"
            cols="30"
            rows="7"
            className="form-control my-2"
            placeholder="Share Your Feelings/ Experience"
          />
          <div className="form-group">
            <label>Select Image/Video:</label>
            <input
              type="file"
              name="image-video"
              className="form-control"
              id="image-video"
            />
          </div>
          <div className="controls mr-auto">
            <Button variant="outlined" className="mr-2 mb-2 font-weight-normal">
              <i className="fas fa-share mx-1" />
              Share
            </Button>
            <Button variant="outlined" className="mr-2 mb-2 font-weight-normal">
              <i className="fas fa-share mx-1" />
              Share Anonymously
            </Button>
            <Button variant="outlined" className="mr-2 mb-2 font-weight-normal">
              <i className="fas fa-medal mx-1" />
              Compete
            </Button>
            <Button variant="outlined" className="mr-2 mb-2 font-weight-normal">
              <i className="fas fa-save mx-1" />
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
