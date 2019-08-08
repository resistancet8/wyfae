import React, { Component } from 'react';
import Sidebar from './Sidebar/Sidebar';
import { Row, Col } from 'reactstrap';
import { connect } from "react-redux";
import { Route, Redirect, withRouter, NavLink} from 'react-router-dom';
import Login from './Auth/Login';
import './Admin.css';

class AdminRoot extends Component {

  constructor(props) {
    super();
  }

  state = { errors: {}, loading: false };

  render() {

    let { isAdminAuthenticated: isAuth, adminUser, token} = this.props.auth;

    if ( token &&
      token.length > 0
    ) {
      isAuth = true;
    }

    if (!isAuth) {
      return <Redirect to="/admin/login" />;
    }

    return (
      <div>
        <Route path="/admin/login" component={Login} />
        <Row>
          <Col lg="2">
            <Sidebar />
          </Col>
          <Col lg="10">
            AdminRoot
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
  )(withRouter(AdminRoot));
