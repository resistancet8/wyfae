import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "./../../actions/auth_actions";

import "./Navbar.css";

class NavbarComponent extends Component {
  logoutUser(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { user, isAuthenticated: isAuth } = this.props.auth;

    return (
      <header>
        <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <h5 class="my-0 mr-md-auto font-weight-bold">Wyfae</h5>
          <nav class="my-2 my-md-0 mr-md-3">
            <NavLink className="p-2 text-dark" to="/register">
              Register
            </NavLink>
            <NavLink className="p-2 text-dark" to="/login">
              Login
            </NavLink>
          </nav>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavbarComponent);
