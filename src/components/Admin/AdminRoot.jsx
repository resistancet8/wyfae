import React, { Component } from 'react'
import { Button, Form, FormGroup, Label } from 'reactstrap';

import { reduxForm, Field } from "redux-form";
import { loginAdminUser } from './../../actions/auth_actions';
import { withRouter, NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

import './Admin.css';

class AdminLogin extends Component {

  constructor(props) {
    super();
    this.getData = this.getData.bind(this);
  }

  state = { errors: {}, loading: false };

  getData(formData) {
    this.props.loginAdminUser({ ...formData, user_type: 'admin' }, this.props.history);
  }

  render() {

    const { isAdminAuthenticated: isAuth, adminUser, admin_token } = this.props.auth;
    const { handleSubmit } = this.props;
    const { errors } = this.state;

    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center admin-login-holder flex-column">
        <h1 className="font-weight-bold">Admin Login</h1>
        <Form onSubmit={handleSubmit(this.getData)}>
          <FormGroup>
            <Label for="admin-email" className="font-weight-bold">Email</Label>
            <Field
              component="input"
              type="text"
              autoComplete="off"
              name="username"
              className={classnames("form-control", {
                "is-invalid": errors.email
              })}
              id="admin-email"
              placeholder="Username"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="admin-password" className="font-weight-bold">Password</Label>
            <Field
              component="input"
              type="password"
              name="password"
              className={classnames("form-control", {
                "is-invalid": errors.password
              })}
              id="admin-password"
              placeholder="Enter Password"
              required
            />
          </FormGroup>
          <Button type="submit" className="w-100 font-weight-bold" color="info">LOGIN</Button>
        </Form>
      </div>
    )
  }
}

AdminLogin.propTypes = {
  errors: PropTypes.object,
  auth: PropTypes.object,
  loginAdminUser: PropTypes.func,
  handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return {
    errors: state.errors.errors,
    auth: state.admin
  };
}

export default reduxForm({
  form: "admin-login"
})(
  connect(
    mapStateToProps,
    { loginAdminUser }
  )(withRouter(AdminLogin))
);
