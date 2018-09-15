import React, { Component } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
// import "Feelbar.css";

class Feelbar extends Component {
  render() {
    return (
      <div className="Feelbar bg-secondary p-2">
        <NavLink className="p-2 text-dark" to="/profile">
          Profile
        </NavLink>
        <a href="" className="p-2 text-dark">
          Logout
        </a>
      </div>
    );
  }
}

export default Feelbar;
