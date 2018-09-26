import React, { Component } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import "./Feelbar.css";
import FeelCircle from "./../../assets/img/feelcircle.svg";
import JournalCircle from "./../../assets/img/journal icon.svg";
import FeelRequest from "./../../assets/img/feelRequest.svg";
import IconButton from "@material-ui/core/IconButton";

console.log(FeelCircle);
class Feelbar extends Component {
  render() {
    return (
      <div className="Feelbar d-flex mb-3">
        <div className="ml-auto">
          <NavLink className="p-2 text-dark" to="/friends">
            <IconButton color="" className="icon-holder">
              <img src={FeelCircle} alt="" />
            </IconButton>
          </NavLink>
          <NavLink className="p-2 text-dark" to="/requests">
            <IconButton color="" className="icon-holder">
              <img src={FeelRequest} alt="" />
            </IconButton>
          </NavLink>
          <NavLink className="p-2 text-dark" to="/journal">
            <IconButton color="" className="icon-holder">
              <img src={JournalCircle} alt="" />
            </IconButton>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Feelbar;
