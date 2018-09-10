import React, { Component } from "react";

export default class Form extends Component {
  render() {
    return (
      <div>
        <div className="data-holder form-group">
          <textarea
            name="thoughts-feelings"
            id="thoughts-feelings"
            cols="30"
            rows="10"
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
            <button
              type="button"
              className="btn btn-outline-dark mr-2 mb-2 font-weight-normal"
            >
              <i class="fas fa-share mx-1" />
              Share
            </button>
            <button
              type="button"
              className="btn btn-outline-dark mr-2 mb-2 font-weight-normal"
            >
              <i class="fas fa-share mx-1" />
              Share Anonymously
            </button>
            <button
              type="button"
              className="btn btn-outline-dark mr-2 mb-2 font-weight-normal"
            >
              <i class="fas fa-medal mx-1" />
              Compete
            </button>
            <button
              type="button"
              className="btn btn-outline-dark mr-2 mb-2 font-weight-normal"
            >
              <i class="fas fa-save mx-1" />
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
