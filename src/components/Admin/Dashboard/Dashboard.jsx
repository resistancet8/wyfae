import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Row, Col } from 'reactstrap';
import { connect } from "react-redux";
import { withRouter, Route } from 'react-router-dom';
import AdminPosts from './../AdminPosts/AdminPosts';
import AdminCompetitions from './../AdminCompetitions/AdminCompetitions';
import AdminReports from './../AdminReports/AdminReports';
import AdminUsers from './../AdminUsers/AdminUsers';
import AdminSettings from './../AdminSettings/AdminSettings';

class Dashboard extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <Route path="/admin/dashboard/posts" component={AdminPosts} />
        <Route path="/admin/dashboard/competitions" component={AdminCompetitions} />
        <Route path="/admin/dashboard/reports" component={AdminReports} />
        <Route path="/admin/dashboard/users" component={AdminUsers} />
        <Route path="/admin/dashboard/settings" component={AdminSettings} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.admin
  };
}

export default
  withRouter(connect(
    mapStateToProps,
    {}
  )(Dashboard));
