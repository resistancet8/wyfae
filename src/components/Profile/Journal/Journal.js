import React, { Component } from "react";
import Todos from "./Todos/Todos";
import Goals from "./Goals/Goals";
import Quotes from "./Quotes/Quotes";

class Journal extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="quotes col-md-4 bg-white rounded-left p-3 px-5">
          <Quotes />
        </div>
        <div className="todo col-md-4 bg-white border-left-overridden border-top-overridden p-3 px-5">
          <Todos />
        </div>
        <div className="goals col-md-4 bg-white rounded-right border-left-overridden border-top-overridden p-3 px-5">
          <Goals />
        </div>
      </React.Fragment>
    );
  }
}

export default Journal;
