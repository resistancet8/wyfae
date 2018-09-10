import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

class About extends Component {
  render() {
    return (
      <div>
        <div className="row border-bottom">
          <h5 className="text-muted font-weight-bold">About</h5>
          <p className="font-italic">
            success is not final failure is not fatal - Winston Churchill
          </p>
        </div>
        <div className="row pt-3">
          <p>
            <strong>DOB:</strong> 10/11/1999
          </p>
          <p>
            <strong>Languages Known:</strong> English, Hindi
          </p>
          <p>
            <strong>Contact:</strong> 7003804266
          </p>
          <p>
            <strong>Email:</strong> codingzap07@gmail.com
          </p>
          <p>
            <strong>Favorite Artform:</strong> Writing, Singing and Dancing
          </p>
        </div>
      </div>
    );
  }
}

export default About;
