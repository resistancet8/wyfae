import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Competition.css";

class Competition extends Component {

  render() {
    return (
      <div className={ this.props.className + " d-none d-lg-block"}>
        <h3 className="font-weight-bold">COMPETITIONS</h3>
        <div
          style={{
            padding: "10px"
          }}
        >
          <div className={`comp-link upcoming ${this.props.location.pathname.indexOf('upcoming') > 0 ? "active": ""}`}>
            <Link to="/trending/upcoming">Join a Competition</Link>
          </div>
          <div className={`comp-link ongoing ${this.props.location.pathname.indexOf('ongoing') > 0 ? "active": ""}`}>
            <Link to="/trending/ongoing">Vote your favorite author</Link>
          </div>
          <div className={`comp-link completed ${this.props.location.pathname.indexOf('completed') > 0 ? "active": ""}`}>
            <Link to="/trending/completed">Winners</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Competition);
