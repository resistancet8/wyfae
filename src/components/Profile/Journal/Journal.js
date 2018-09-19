import React, { Component } from "react";
import Todos from "./Todos/Todos";
import Goals from "./Goals/Goals";
import Quotes from "./Quotes/Quotes";
import { fetchUserDetails } from "../../../actions/user_actions";
import PropTypes from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Journal extends Component {
  componentDidMount() {
    this.props.fetchUserDetails();
  }

  render() {
    return (
      <div className="row bg-secondary p-1 journal">
        <div className="quotes col-md-4 bg-white p-3 px-5">
          <Quotes />
        </div>
        <div className="todo col-md-4 bg-white border-left p-3 px-5">
          <Todos />
        </div>
        <div className="goals col-md-4 bg-white border-left  p-3 px-5">
          <Goals />
        </div>
      </div>
    );
  }
}

Journal.propTypes = {
  fetchUserDetails: PropTypes.func
};

export default withRouter(
  connect(
    null,
    { fetchUserDetails }
  )(Journal)
);
