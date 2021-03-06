import React, { Component } from "react";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";
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
import FollowingRoute from "./Following/FollowingRoute";
import FollowersRoute from "./Followers/FollowersRoute";
import SharedComp from "./Public/Competition/SharedComp";
import ScrollToTop from "react-scroll-up";
import Privacy from "./Public/Privacy";
import Usage from "./Public/Usage";
import MetaTags from 'react-meta-tags';
import AdminRoot from './Admin/AdminRoot';
import AdminDasboard from './Admin/DashboardLayout/DashboardLayout';

import PostView from './Public/PostView';

let dontIncludeHeader = [/login/, /register/, /admin*/];

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

  closeGlobalMessage() {
    localStorage.setItem('shown_message', 1);
    this.setState({})
  }

  render() {
    let isAuth = false;
    if (
      localStorage.getItem("jToken") &&
      localStorage.getItem("jToken").length > 0
    ) {
      isAuth = true;
    }
    let showHeader = true;

    let path = this.props.location.pathname;
    if (dontIncludeHeader.indexOf(path) >= 0 || dontIncludeHeader.some(function (rx) { return rx.test(path); })) {
      showHeader = false;
    } else {
      showHeader = true;
    }

    const { admin_message } = this.props.user;
    let adminMessageHTML;

    if(admin_message && admin_message.display == 'yes') {
      if( localStorage.getItem('shown_message') != 1 ) {
        localStorage.setItem('admin_message', admin_message.text);
        adminMessageHTML = <div className="admin-message-global">{admin_message.text} <span className="close" onClick={this.closeGlobalMessage.bind(this)}><i className="far fa-times-circle"></i></span> </div>;
      } else if(localStorage.getItem('admin_message') != admin_message.text && localStorage.getItem('shown_message') == 1) {
        localStorage.setItem('admin_message', admin_message.text);
        adminMessageHTML = <div className="admin-message-global">{admin_message.text} <span className="close" onClick={this.closeGlobalMessage.bind(this)}><i className="far fa-times-circle"></i></span> </div>;
        localStorage.setItem('shown_message', 0);
      }
    }

    return (
      <div className="App">
        <MetaTags>
          <meta name="title" content="Wyfae - Write your feelings and Experiences." />
          <meta name="keywords" content="yourquote, your quote, share poems, share stories, share letters, write feelings and emotions." />
          <meta name="description" content="A social network where everyone communicates by writing their true emotions and thoughts. Write your quotes, poems, stories and letters . Create your memory book and Share your post, participate in the vote based competitions.Collect the famous quotes, inspirational quotes, motivational quotes, romantic quotes, book quotes, writer’s quotes, funny quotes and all other quotes that lift you. Write your goals, maintain your To do list and maintain a completely private online journal." />
        </MetaTags>
        {admin_message && admin_message.display == 'yes' && adminMessageHTML}
        {showHeader && <Navbar />}
        <Route exact path="/admin" component={AdminRoot} />
        <Route path="/admin/dashboard" component={AdminDasboard} />
        <Route path="/privacy" exact component={Privacy} />
        <Route path="/usage" exact component={Usage} />
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
            return <Public />;
          }}
        />
        <Route
          path="/view/:post_id"
          render={() => {
            return <PostView />;
          }}
        />
        <Route
          path="/shared/:comp_id"
          render={() => {
            if (isAuth) return <SharedComp />;
            else return <Redirect to="/login" />;
          }}
        />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Switch>
          <Route
            path="/profile/:username"
            exact
            render={() => {
              if (isAuth) return <Userpage />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            path="/profile/data/"
            render={() => {
              if (isAuth) return <Profile />;
              else return <Redirect to="/login" />;
            }}
          />
          <Route
            path="/profile"
            exact
            render={() => {
              if (isAuth) return <Profile />;
              else return <Redirect to="/login" />;
            }}
          />
        </Switch>
        <Route
          path="/following"
          render={() => {
            if (isAuth) return <FollowingRoute />;
            else return <Redirect to="/login" />;
          }}
        />
        <Route
          path="/followers"
          render={() => {
            if (isAuth) return <FollowersRoute />;
            else return <Redirect to="/login" />;
          }}
        />
        <div className="container">
          <Route
            exact={true}
            path="/update/:userName"
            render={() => {
              if (isAuth) return <UpdateProfile />;
              else return <Redirect to="/login" />;
            }}
          />
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
        <ScrollToTop showUnder={160} style={{ zIndex: "9999" }}>
          <i class="fas fa-chevron-circle-up" />
        </ScrollToTop>
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
    user: state.user.user,
    toast: state.general.general.toast
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(App)
);
