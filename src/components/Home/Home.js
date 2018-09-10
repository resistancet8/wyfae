import React, { Component } from "react";
import "./Home.css";
import { Route, Switch } from "react-router-dom";
import User from "./User";
import Stats from "./Statistics";
import About from "./About";
import Feelings from "./Feelings/Feelings";
import { connect } from "react-redux";
import { fetchUserDetails } from "./../../actions/user_actions";
import Journal from "./Journal/Journal";

class Home extends Component {
  componentDidMount() {
    this.props.fetchUserDetails();
  }

  render() {
    let { user } = this.props;

    return (
      <div className="home-wrapper bg-secondary px-4 py-2 mb-5">
        {/* user avatar,details and statistics */}
        <div className="row">
          <div className="col-md-4 bg-white rounded-left p-3">
            {user && <User user={user} />}
          </div>
          <div className="col-md-8 bg-white rounded-right border-left-overridden border-top-overridden p-3">
            {user.stats && <Stats stats={user.stats} />}
          </div>
        </div>
        {/* user about and thoughts, feelings row */}
        <div className="row mt-2">
          <div className="col-md-4 bg-white rounded-left p-3 px-5">
            {user && <About user={user} />}
          </div>
          <div className="col-md-8 bg-white rounded-right border-left-overridden border-top-overridden p-3">
            <Feelings />
          </div>
        </div>
        {/* Private Journal */}
        <div className="row mt-2">
          {user.journal && <Journal journal={user.journal} />}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

export default connect(
  mapStateToProps,
  { fetchUserDetails }
)(Home);
