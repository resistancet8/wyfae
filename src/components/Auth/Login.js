import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "./../../actions/auth_actions";
import classnames from "classnames";
import PropTypes from "prop-types";

class Login extends Component {
  state = { errors: {} };

  getData(formData) {
    this.props.loginUser(formData, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const { errors } = this.state;

    return (
      <div>
        <div className="mt-3">
          <h2 className="font-weight-bold">Login</h2>
          <div className="row">
            <div className="col-md-5">
              <form
                autoComplete="off"
                onSubmit={handleSubmit(this.getData.bind(this))}
              >
                {errors.msg && (
                  <div className="alert alert-danger"> {errors.msg} </div>
                )}
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <Field
                    component="input"
                    type="text"
                    name="username"
                    className={classnames("form-control", {
                      "is-invalid": errors.email
                    })}
                    id="username"
                    placeholder="Username"
                    autoComplete="off"
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback"> {errors.email} </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <Field
                    component="input"
                    type="password"
                    name="password"
                    className={classnames("form-control", {
                      "is-invalid": errors.password
                    })}
                    id="password"
                    placeholder="Enter Password"
                    autoComplete="off"
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback"> {errors.password} </div>
                  )}
                </div>
                <button type="submit" className="btn btn-dark">
                  Login
                </button>
                <div className="mt-2">
                  <NavLink to="forgot" className="text-dark">
                    forgot password?
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.object,
  loginUser: PropTypes.func,
  handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return {
    errors: state.errors.errors
  };
}

export default reduxForm({
  form: "login"
})(
  connect(
    mapStateToProps,
    { loginUser }
  )(withRouter(Login))
);
