import React, { Component } from "react";
import Todos from "./Todos/Todos";
import Goals from "./Goals/Goals";

class Journal extends Component {
  render() {
    return (
      <div className="row bg-secondary p-1 journal">
        <div className="todo col-md-4 bg-white border-left p-3 px-5">
          <Todos />
        </div>
        <div className="goals col-md-4 bg-white border-left  p-3 px-5">
          <Goals />
        </div>
      </div>
    );
  }
}

export default Journal;
