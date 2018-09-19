import React, { Component } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import "./Feelbar.css";

class Feelbar extends Component {
  render() {
    return (
      <div className="Feelbar d-flex mb-3">
        <div className="ml-auto">
          <NavLink className="p-2 text-dark" to="/friends">
            <Button outline color="primary">
              Friend Circle
            </Button>
          </NavLink>
          <NavLink className="p-2 text-dark" to="/requests">
            <Button outline color="info">
              Requests
            </Button>
          </NavLink>
          <NavLink className="p-2 text-dark" to="/journal">
            <Button outline color="success">
              Journal
            </Button>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Feelbar;
