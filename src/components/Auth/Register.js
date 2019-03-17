import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "./../../actions/auth_actions";
import classnames from "classnames";
import PropTypes from "prop-types";
import Spinner from "./../Loader/Spinner";
import Button from "@material-ui/core/Button";
import Login_BG from './../../assets/img/login_bg.png'
import BrandLogo from './../../assets/img/login/logo_new.png'
import LoginButton from './../../assets/img/login/6.png'
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

  _onFocus(e) {
      document.querySelector("#label-dob").style.display = "none";
  }

  _onBlur (e) {
      if(e.currentTarget.value.length <= 0) {
        document.querySelector("#label-dob").style.display = "inline-block";
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
      <div id="register_holder_self" style={{backgroundImage: `url(${Login_BG})`}}>
        <div class="auth-holder-register">
          <div>
            <div>
              <img src={BrandLogo} alt="" class="brand-logo img-fluid"/>
              <h1 id="sub-title">Write your feelings and experiences</h1>
              <h1 id="login-text" className="mb-4">Sign up for free</h1>
              <form onSubmit={handleSubmit(this.getData.bind(this))}>
                {errors.msg && (
                  <div className="alert alert-danger"> {errors.msg} </div>
                )}
                <div className="form-group">
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

                <div className="form-group dob-holder">
                  <Field
                    component="input"
                    type="date"
                    name="dob"
                    onFocus = {this._onFocus}
                    onBlur = {this._onBlur}
                    placeholder="Date of Birth"
                    className={classnames("form-control ", {
                      "is-invalid": errors.dob
                    })}
                    id="dob"
                    required
                  />
                  <label htmlFor="dob" id="label-dob">Date of Birth</label>
                  {errors.dob && (
                    <div className="invalid-feedback"> {errors.dob} </div>
                  )}
                </div>
                <p className="my-2 d-block">
                  By continuing, you agree to Wyfae's <b><Link to="/usage">Terms of Service </Link></b> and <b><Link to="/privacy"> Privacy Policy</Link></b>.
                </p>
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
              <p className="copy-right mt-5" style={{color: "#81f2b4"}}>&copy; All rights reserved 2019 | Powered by <a href="https://www.codingzap.com" target="_blank" style={{color: "#81f2b4"}} >Codingzap</a> </p>
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
