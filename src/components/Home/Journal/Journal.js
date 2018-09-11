import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Todo from "./Todo/Todo";
import Goals from "./Goals/Goals";
import Quotes from "./Quotes/Quotes";

class Journal extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="quotes col-md-4 bg-white rounded-left p-3 px-5">
          <Quotes quotes={this.props.journal.quotes} />
        </div>
        <div className="todo col-md-4 bg-white border-left-overridden border-top-overridden p-3 px-5">
          <Todo todos={this.props.journal.todos} />
        </div>
        <div className="goals col-md-4 bg-white rounded-right border-left-overridden border-top-overridden p-3 px-5">
          <Goals goals={this.props.journal.goals} />
        </div>
      </React.Fragment>
    );
  }
}

export default Journal;
