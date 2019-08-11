import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Row, Col } from 'reactstrap';
import { connect } from "react-redux";
import { withRouter, Route } from 'react-router-dom';
import AdminPosts from './../AdminPosts/AdminPosts';
import AdminCompetitions from './../AdminCompetitions/AdminCompetitions';
import AdminReports from './../AdminReports/AdminReports';
import AdminUsers from './../AdminUsers/AdminUsers';
import AdminUsersView from './../AdminUsers/AdminUsersView';
import AdminSettings from './../AdminSettings/AdminSettings';

import AdminOverview from './../AdminOverview/AdminOverview';

class Dashboard extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <Route exact path="/admin/dashboard/overview" component={AdminOverview} />

        <Route exact path="/admin/dashboard/posts" component={AdminPosts} />
        <Route exactpath="/admin/dashboard/competitions" component={AdminCompetitions} />
        <Route exact path="/admin/dashboard/reports" component={AdminReports} />

        <Route exact path="/admin/dashboard/users" component={AdminUsers} />
        <Route exact path="/admin/dashboard/users/view/:user_id" component={AdminUsersView} />

        <Route exact path="/admin/dashboard/settings" component={AdminSettings} />
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
