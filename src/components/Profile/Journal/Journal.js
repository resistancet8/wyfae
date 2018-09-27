import React, { Component } from "react";
import Todos from "./Todos/Todos";
import Goals from "./Goals/Goals";
import Notes from "./Notes/Notes";

class Journal extends Component {
  render() {
    return (
      <div className="journal bg-secondary">
        <div className="row first-row-journal m-1">
          <div className="todo col-md-4 bg-white border-left p-3 px-5">
            <Todos />
          </div>
          <div className="goals col-md-4 bg-white border-left  p-3 px-5">
            <Goals />
          </div>
        </div>
        <div className="row second-row-journal m-1">
          <div className="todo col-md-4 bg-white border-left p-3 px-5">
            <Notes />
          </div>
        </div>
      </div>
    );
  }
}

export default Journal;
