import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "./../../actions/auth_actions";
import classnames from "classnames";
import PropTypes from "prop-types";
import Spinner from "./../Loader/Spinner";
import Button from "@material-ui/core/Button";

class Register extends Component {
  state = { errors: {}, loading: false };

  getData(formData) {
    this.setState(
      {
        loading: true
      },
      () => {
        setTimeout(() => {
          this.props.registerUser(formData, this.props.history);
        }, 300);
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors || nextProps.errors.msg) {
      this.setState({
        errors: nextProps.errors,
        loading: false
      });
    }
  }

  render() {
    const { isAuthenticated: isAuth } = this.props.auth;

    if (isAuth) {
      return <Redirect to="/" />;
    }

    const { handleSubmit } = this.props;
    const { errors } = this.state;
    return (
      <div>
        <div className="my-3">
          <h2 className="font-weight-bold">Register</h2>
          <div className="row">
            <div className="col-md-5">
              <form onSubmit={handleSubmit(this.getData.bind(this))}>
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
                      "is-invalid": errors.username
                    })}
                    id="username"
                    placeholder="Enter Username"
                    required
                  />
                  {errors.username && (
                    <div className="invalid-feedback"> {errors.username} </div>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="first_name">First Name:</label>
                    <Field
                      component="input"
                      type="text"
                      name="first_name"
                      className={classnames("form-control", {
                        "is-invalid": errors.first_name
                      })}
                      id="first_name"
                      placeholder="Enter First Name"
                      required
                    />
                    {errors.first_name && (
                      <div className="invalid-feedback">
                        {" "}
                        {errors.first_name}{" "}
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="sur_name">Last Name:</label>
                    <Field
                      component="input"
                      type="text"
                      name="sur_name"
                      className={classnames("form-control", {
                        "is-invalid": errors.sur_name
                      })}
                      id="sur_name"
                      placeholder="Enter Last Name"
                      required
                    />
                    {errors.sur_name && (
                      <div className="invalid-feedback">
                        {" "}
                        {errors.sur_name}{" "}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <Field
                    component="input"
                    type="email"
                    name="email"
                    className={classnames("form-control", {
                      "is-invalid": errors.email
                    })}
                    id="email"
                    placeholder="Enter Email"
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback"> {errors.email} </div>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
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
                      required
                    />
                    {errors.password && (
                      <div className="invalid-feedback">
                        {" "}
                        {errors.password}{" "}
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <Field
                      component="input"
                      type="password"
                      name="password2"
                      className={classnames("form-control ", {
                        "is-invalid": errors.password2
                      })}
                      id="confirm-password"
                      placeholder="Confirm Password"
                      required
                    />
                    {errors.password2 && (
                      <div className="invalid-feedback">
                        {" "}
                        {errors.password2}{" "}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="dob">Date Of Birth:</label>
                  <Field
                    component="input"
                    type="date"
                    name="dob"
                    className={classnames("form-control ", {
                      "is-invalid": errors.dob
                    })}
                    id="dob"
                    required
                  />
                  {errors.dob && (
                    <div className="invalid-feedback"> {errors.dob} </div>
                  )}
                </div>
                <div className="loader-holder">
                  <Button
                    variant="outlined"
                    type="submit"
                    disabled={this.state.loading}
                  >
                    {this.state.loading ? <Spinner /> : "Register"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  errors: PropTypes.object,
  registerUser: PropTypes.func,
  handleSubmit: PropTypes.func,
  auth: PropTypes.object
};

function mapStateToProps(state) {
  return {
    errors: state.errors.errors,
    auth: state.auth
  };
}

export default reduxForm({
  form: "register"
})(
  connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(Register))
);
