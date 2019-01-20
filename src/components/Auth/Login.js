import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { withRouter, NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "./../../actions/auth_actions";
import classnames from "classnames";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Spinner from "./../Loader/Spinner";
import Login_BG from './../../assets/img/login_bg.png'
import BrandLogo from './../../assets/img/login/logo_new.png'
import LoginButton from './../../assets/img/login/6.png'

class Login extends Component {
  constructor(props) {
    super();
    this.getData = this.getData.bind(this);
  }

  state = { errors: {}, loading: false };

  getData(formData) {
    this.setState(
      {
        loading: true
      },
      () => {
        setTimeout(() => {
          this.props.loginUser(formData, this.props.history);
        }, 500);
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors && nextProps.errors.msg) {
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
      <div id="login_holder_self" style={{backgroundImage: `url(${Login_BG})`}}>
        <div class="auth-holder-login">
            <div>
              <img src={BrandLogo} alt="" class="brand-logo img-fluid"/>
              <h1 id="sub-title">Write your feelings and experiences</h1>
              <h1 id="login-text" className="mb-4">Login</h1>
              <form onSubmit={handleSubmit(this.getData)}>
                {errors.msg && (
                  <div className="alert alert-danger"> {errors.msg} </div>
                )}
                <div className="form-group mt-3">
                  <Field
                    component="input"
                    type="text"
                    name="username"
                    className={classnames("form-control", {
                      "is-invalid": errors.email
                    })}
                    id="username"
                    placeholder="Username"
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback"> {errors.email} </div>
                  )}
                </div>
                <div className="form-group">
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
                    <div className="invalid-feedback"> {errors.password} </div>
                  )}
                </div>
                <div className="loader-holder">
                  <Button
                      variant="outlined"
                      type="submit"
                      disabled={this.state.loading}
                    >
                      {this.state.loading ? <Spinner /> : "Login"}
                  </Button>
                </div>
                <div className="mt-2">
                  <NavLink to="forgot" className="text-dark">
                    forgot password?
                  </NavLink>
                </div>
              </form>
              <p className="copy-right mt-5" style={{color: "#81f2b4"}}>&copy; All rights reserved 2019 | Powered by <a href="https://www.codingzap.com" target="_blank" style={{color: "#81f2b4"}} >Codingzap</a> </p>
            </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.object,
  auth: PropTypes.object,
  loginUser: PropTypes.func,
  handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return {
    errors: state.errors.errors,
    auth: state.auth
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
