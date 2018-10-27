import React, { Component } from "react";
import Ongoing from './Ongoing';
import Completed from './Completed';
import Upcoming from './Upcoming';

class Competition extends Component {
  render() {
    return (
      <div {...this.props}>
        <h3 className="font-weight-bold">Competitions</h3>
        <Ongoing/>
        <Upcoming/>
        <Completed/>
      </div>
    );
  }
}

export default Competition;
