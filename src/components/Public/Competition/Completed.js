import React, { Component } from "react";

class Completed extends Component {
  render() {
    return (
      <div {...this.props}>
        <h4 className="font-weight-bold text-muted border-bottom">Completed</h4>
      </div>
    );
  }
}

export default Completed;
