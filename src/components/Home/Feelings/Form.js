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
              class="form-control"
              id="image-video"
            />
          </div>
          <div className="controls mr-auto">
            <button type="button" class="btn btn-outline-dark mr-2 mb-2">
              Share
            </button>
            <button type="button" class="btn btn-outline-dark mr-2 mb-2">
              Share Anonymously
            </button>
            <button type="button" class="btn btn-outline-dark mr-2 mb-2">
              Compete
            </button>
            <button type="button" class="btn btn-outline-dark mr-2 mb-2">
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
