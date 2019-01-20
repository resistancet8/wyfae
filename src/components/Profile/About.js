import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div>
        <div className="border-bottom mt-5">
          <h5 className="text-muted font-weight-bold">About</h5>
          <p className="font-italic"> {this.props.user.about}</p>
        </div>
        <div className="row pt-3 about-holder">
          {this.props.user.dob && !this.props.userpage &&  (
            <p className="cols-12">
              <strong class="text-muted">DOB:</strong>
              &nbsp;
              {this.props.user.dob}
            </p>
          )}

          {this.props.user.langs && (
            <p className="cols-12">
              <strong class="text-muted">Languages Known:</strong>
              &nbsp;
              {this.props.user.langs}
            </p>
          )}
          {this.props.user.contact && (
            <p className="cols-12">
              <strong class="text-muted">Contact:</strong>
              &nbsp;
              {this.props.user.contact}
            </p>
          )}

          {this.props.user.email && (
            <p className="cols-12">
              <strong class="text-muted">Email:</strong>
              &nbsp;
              {this.props.user.email}
            </p>
          )}
          {this.props.user.favorite_art && (
            <p className="cols-12">
              <strong class="text-muted">Favorite Artform:</strong>
              &nbsp;
              {this.props.user.favorite_art}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default About;
