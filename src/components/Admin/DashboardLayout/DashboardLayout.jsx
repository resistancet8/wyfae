import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Dashboard/Dashboard';
import { Row, Col } from 'reactstrap';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

class DashboardLayout extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="p-2">
        <Row className="m-0">
          <Col lg="2">
            <Sidebar />
          </Col>
          <Col lg="10">
            <Dashboard />
          </Col>
        </Row>
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
  connect(
    mapStateToProps,
    {}
  )(withRouter(DashboardLayout));
