import React, { Component } from "react";
import "./Home.css";
import { Route, Switch } from "react-router-dom";
import User from "./User";
import Stats from "./Statistics";
import About from "./About";
import Feelings from "./Feelings/Feelings";

class Home extends Component {
  render() {
    return (
      <div className="home-wrapper bg-secondary px-4 py-2 mb-5">
        {/* user avatar,details and statistics */}
        <div className="row">
          <div className="col-md-4 bg-white rounded-left p-3">
            <User />
          </div>
          <div className="col-md-8 bg-white rounded-right border-left-overridden border-top-overridden p-3">
            <Stats />
          </div>
        </div>
        {/* user about and thoughts, feelings row */}
        <div className="row mt-2">
          <div className="col-md-4 bg-white rounded-left p-3 px-5">
            <About />
          </div>
          <div className="col-md-8 bg-white rounded-right border-left-overridden border-top-overridden p-3">
            <Feelings />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
