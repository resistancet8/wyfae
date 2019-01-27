import React, { Component } from "react";
import truncate from "truncate";
class About extends Component {

  state = {
    expanded: false
  }
  render() {
    return (
      <div>
        <div className="border-bottom">
          <h5 className="text-muted font-weight-bold">About</h5>
          <p> {!this.state.expanded ? truncate(this.props.user.about, 80): this.props.user.about}<br/>{<a href="#" onClick={(e) => {
            e.preventDefault();
            this.setState((s) => {
              return {
                expanded: !s.expanded
              }
            })
          }}>{this.state.expanded ? "Hide": "More"}</a> }</p>
        </div>
        <div className="row about-holder">
          {this.props.user.dob && !this.props.userpage &&  (
            <p className="cols-12" style={{marginBottom: "2px"}}>
              <strong class="text-muted">DOB:</strong>
              &nbsp;
              {this.props.user.dob}
            </p>
          )}

          {this.props.user.langs && (
            <p className="cols-12" style={{marginBottom: "2px"}}>
              <strong class="text-muted">Languages Known:</strong>
              &nbsp;
              {this.props.user.langs}
            </p>
          )}
          {this.props.user.contact && (
            <p className="cols-12" style={{marginBottom: "2px"}}>
              <strong class="text-muted">Contact:</strong>
              &nbsp;
              {this.props.user.contact}
            </p>
          )}

          {this.props.user.email && (
            <p className="cols-12" style={{marginBottom: "2px"}}>
              <strong class="text-muted">Email:</strong>
              &nbsp;
              {this.props.user.email}
            </p>
          )}
          {this.props.user.favorite_art && (
            <p className="cols-12" style={{marginBottom: "2px"}}>
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
