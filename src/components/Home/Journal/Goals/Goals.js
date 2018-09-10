import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

class Goals extends Component {
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
        </div>
        <div className="row goals-holder mt-3">{Goals}</div>
      </React.Fragment>
    );
  }
}

export default Goals;
