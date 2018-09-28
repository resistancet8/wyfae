import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Profile.css";
import Icon from "@material-ui/core/Icon";
import User from "./User";
import Stats from "./Statistics";
import About from "./About";
import Feelings from "./Feelings/Feelings";
import Memory from "./Memory-Quotes/Memory";
import Quotes from "./Memory-Quotes/Quotes/Quotes";

class Profile extends Component {
  render() {
    let { user } = this.props;

    return (
      <div className="home-wrapper bg-secondary px-4 py-2 mb-5">
        {/* user avatar,details and statistics */}
        <div className="row">
          <div className="col-md-4 bg-white p-3">
            {user && <User user={user} />}
            <div className="edit-profile">
              <Link to={`/update/${user.fname.toLowerCase()}`}>
                <Icon>edit</Icon>
              </Link>
            </div>
          </div>
          <div className="col-md-8 bg-white border-left-overridden border-top-overridden p-3">
            {user.stats && <Stats stats={user.stats} />}
          </div>
        </div>
        {/* user about and thoughts, feelings row */}
        <div className="row mt-2">
          <div className="col-md-4 bg-white p-3 px-5">
            {user && <About user={user} />}
          </div>
          <div className="col-md-8 bg-white border-left-overridden border-top-overridden p-3">
            <Feelings />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-6 bg-white border-top-overridden p-3">
            <Memory />
          </div>
          <div className="col-md-4 bg-white border-left-overridden border-top-overridden px-5 py-3">
            <Quotes />
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

export default connect(
  mapStateToProps,
  {}
)(Profile);
