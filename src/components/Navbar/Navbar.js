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
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <NavLink className="my-0 mr-md-auto font-weight-bold banner" to="/">
            Wyfae
          </NavLink>
          <nav className="my-2 my-md-0 mr-md-3">
            {!isAuth && (
              <React.Fragment>
                <NavLink className="p-2 text-dark" to="/register">
                  Register
                </NavLink>
                <NavLink className="p-2 text-dark" to="/login">
                  Login
                </NavLink>
              </React.Fragment>
            )}
            {isAuth && (
              <a
                href=""
                onClick={this.logoutUser.bind(this)}
                className="p-2 text-dark"
              >
                Logout
              </a>
            )}
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
