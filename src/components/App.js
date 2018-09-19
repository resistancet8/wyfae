import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Profile from "./Profile/Profile";
import Public from "./Public/Public";
import Feelbar from "./Feelbar/Feelbar";
import PropTypes from "prop-types";
import Journal from "./Profile/Journal/Journal";

const NotFound = () => <div> Not Found </div>;

class App extends Component {
  render() {
    const { isAuthenticated: isAuth } = this.props.auth;

    return (
      <div className="App">
        <Navbar />
        <div className="adjustment mt-1" />
        <div className="container">
          {isAuth && (
            <div className="d-flex">
              <div className="ml-auto">
                <Feelbar />
              </div>
            </div>
          )}
          <Switch>
            <Route path="/" exact component={Public} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/journal" exact component={Journal} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(App)
);
