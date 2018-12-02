import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Forgot from "./Auth/Forgot";
import Profile from "./Profile/Profile";
import Userpage from "./Userpage/Userpage";
import Public from "./Public/Public";
import PropTypes from "prop-types";
import Journal from "./Profile/Journal/Journal";
import UpdateProfile from "./Profile/Update-Profile/Update-profile";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

class App extends Component {
  state = {
    toast: {
      show: false,
      message: ""
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.toast.show) {
      this.setState({
        toast: nextProps.toast
      });
    }
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ toast: { show: false } });
    this.props.dispatch({ type: "CLOSE_TOAST", payload: null });
  };

  render() {
    let isAuth = false;
    if (
      localStorage.getItem("jToken") &&
      localStorage.getItem("jToken").length > 0
    ) {
      isAuth = true;
    }

    return (
      <div className="App">
        <Navbar />
        <div className="adjustment mt-1" />
        <Route
          path="/"
          exact
          render={() => {
            return <Redirect to="/trending" />;
          }}
        />
        <Route
          path="/trending"
          render={() => {
            if (isAuth) return <Public />;
            else return <Redirect to="/login" />;
          }}
        />
        <div className="container">
          <Route
            path="/profile"
            exact
            render={() => {
              if (isAuth) return <Profile />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            path="/profile/:username"
            exact
            render={() => {
              if (isAuth) return <Userpage />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route path="/register" exact component={Register} />
          <Route
            exact={true}
            path="/update/:userName"
            render={() => {
              if (isAuth) return <UpdateProfile />;
              else return <Redirect to="/login" />;
            }}
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
          <Route path="/forgot" exact component={Forgot} />
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.toast.show}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{ "aria-describedby": "message-id" }}
          message={<span id="message-id">{this.state.toast.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object,
  toast: PropTypes.object
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    toast: state.general.general.toast
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(App)
);
