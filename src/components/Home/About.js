import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

class About extends Component {
  render() {
    return (
      <div>
        <div className="row border-bottom">
          <h5 className="text-muted font-weight-bold">About</h5>
          <p className="font-italic"> {this.props.user.about}</p>
        </div>
        <div className="row pt-3">
          <p>
            <strong>DOB:</strong>
            &nbsp;
            {this.props.user.dob}
          </p>
          <p>
            <strong>Languages Known:</strong>
            &nbsp;
            {this.props.user.langs}
          </p>
          <p>
            <strong>Contact:</strong>
            &nbsp;
            {this.props.user.contact}
          </p>
          <p>
            <strong>Email:</strong>
            &nbsp;
            {this.props.user.email}
          </p>
          <p>
            <strong>Favorite Artform:</strong>
            &nbsp;
            {this.props.user.favorite_art}
          </p>
        </div>
      </div>
    );
  }
}

export default About;
