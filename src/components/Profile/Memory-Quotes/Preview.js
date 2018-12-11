import React, { Component } from "react";

class Preview extends Component {
  render() {
    return (
      <div className={this.props.show ? "" : "d-none"}>
        <h2>Preview</h2>
        <canvas id="canvas1" />
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
          <input
            type="color"
            name="color"
            id="color"
            value={this.props.color}
            onChange={e => {
              e.preventDefault();
              this.props.colorChange(e.target.value);
            }}
          />
        </div>
      </div>
    );
  }
}

export default Preview;
