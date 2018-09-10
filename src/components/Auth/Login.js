import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "./../../actions/auth_actions";
import classnames from "classnames";

class Register extends Component {
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
                {errors.message && (
                  <div className="alert alert-danger"> {errors.message} </div>
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
                  />
                  {errors.password && (
                    <div className="invalid-feedback"> {errors.password} </div>
                  )}
                </div>
                <button type="submit" className="btn btn-dark">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
  )(withRouter(Register))
);
