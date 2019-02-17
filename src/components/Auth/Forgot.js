import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { forgotPassword, verifyOTP } from "../../actions/auth_actions";
import classnames from "classnames";
import PropTypes from "prop-types";
import MetaTags from 'react-meta-tags';

class Forgot extends Component {
  state = { errors: {} };

  getData(formData) {
    if (!this.props.auth.forgotPassword) this.props.forgotPassword(formData);
    else this.props.verifyOTP(formData, this.props.history);
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
    const { forgotPassword } = this.props.auth;

    return (
      <div>
        <MetaTags>
          <meta name="title" content="Wyfae - Write your feelings and Experiences." />
          <meta name="keywords" content="yourquote, your quote, share poems, share stories, share letters, write feelings and emotions."/>
          <meta name="description" content="forgot your wyfae account password?
Reset your login password of wyafe and expore the wyafe world."/>
        </MetaTags>
        <div className="mt-3">
          <h2 className="font-weight-bold">Reset Password</h2>
          {forgotPassword &&
            !errors.msg && (
              <small className="text-success font-weight-bold">
                Enter the OTP sent on your mail.
              </small>
            )}
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
                      "is-invalid": errors.username
                    })}
                    id="username"
                    required
                    placeholder="Username"
                    autoComplete="off"
                  />
                  {errors.username && (
                    <div className="invalid-feedback"> {errors.username} </div>
                  )}
                </div>
                {forgotPassword ? (
                  <div>
                    <div className="form-group">
                      <label htmlFor="password_1">New Password:</label>
                      <Field
                        component="input"
                        type="password"
                        name="password_1"
                        id="password_1"
                        className="form-control"
                        placeholder="Enter New Password"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="otp">OTP:</label>
                      <Field
                        component="input"
                        type="number"
                        name="otp"
                        className="form-control"
                        id="otp"
                        placeholder="Enter OTP"
                        autoComplete="off"
                      />
                      {errors.otp && (
                        <div className="invalid-feedback"> {errors.otp} </div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-dark">
                      Reset Password
                    </button>
                  </div>
                ) : (
                  <button type="submit" className="btn btn-dark">
                    Enter OTP
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Forgot.propTypes = {
  errors: PropTypes.object,
  forgotPassword: PropTypes.func,
  verifyOTP: PropTypes.func,
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
  form: "forgot"
})(
  connect(
    mapStateToProps,
    { forgotPassword, verifyOTP }
  )(withRouter(Forgot))
);
