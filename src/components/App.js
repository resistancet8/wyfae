import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
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
import UpdateProfile from "./Profile/Update-Profile/Update-profile";

const NotFound = () => <div> Not Found </div>;

class App extends Component {
  render() {
    const { isAuthenticated: isAuth } = this.props.auth;

    return (
      <div className="App">
        <Navbar />
        <div className="adjustment mt-1" />
        <div className="container">
          {isAuth && <Feelbar />}
          <Switch>
            <Route path="/" exact component={Public} />
            <Route
              path="/profile"
              exact
              render={() => {
                if (isAuth) return <Profile />;
                else return <Redirect to="/login" />;
              }}
            />
            <Route path="/register" exact component={Register} />
            <Route
              exact={true}
              path="/update/:userName"
              component={UpdateProfile}
            />
            <Route path="/login" exact component={Login} />
            <Route
              path="/journal"
              exact
              render={() => {
                if (isAuth) return <Journal />;
                else return <Redirect to="/login" />;
              }}
            />
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
