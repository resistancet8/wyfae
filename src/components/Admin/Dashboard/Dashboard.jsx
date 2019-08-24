import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Route } from 'react-router-dom';
import AdminPosts from './../AdminPosts/AdminPosts';
import AdminPostView from './../AdminPosts/AdminPostView';
import AdminCompetitions from './../AdminCompetitions/AdminCompetitions';
import AdminCompetitionView from './../AdminCompetitions/AdminCompetitionView';
import AdminReports from './../AdminReports/AdminReports';
import AdminReportView from './../AdminReports/AdminReportView';
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
        <Route exact path="/admin/dashboard/" component={AdminOverview} />

        <Route exact path="/admin/dashboard/posts" component={AdminPosts} />
        <Route exact path="/admin/dashboard/posts/view/:post_id" component={AdminPostView} />
        
        <Route exact path="/admin/dashboard/competitions" component={AdminCompetitions} />
        <Route exact path="/admin/dashboard/competitions/view/:comp_id" component={AdminCompetitionView} />

        <Route exact path="/admin/dashboard/reports" component={AdminReports} />
        <Route exact path="/admin/dashboard/reports/view/:post_id" component={AdminReportView} />

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
