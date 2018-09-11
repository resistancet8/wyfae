import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "./../../actions/auth_actions";
import classnames from "classnames";

class Register extends Component {
  state = { errors: {} };

  getData(formData) {
    this.props.registerUser(formData, this.props.history);
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
        <div className="my-3">
          <h2 className="font-weight-bold">Register</h2>
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
                    placeholder="Enter Username"
                    autoComplete="off"
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
                      autoComplete="off"
                    />
                    {errors.first_name && (
                      <div className="invalid-feedback">
                        {" "}
                        {errors.first_name}{" "}
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="sur_name">Sur Name:</label>
                    <Field
                      component="input"
                      type="text"
                      name="sur_name"
                      className={classnames("form-control", {
                        "is-invalid": errors.sur_name
                      })}
                      id="sur_name"
                      placeholder="Enter Sur Name"
                      autoComplete="off"
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
                    autoComplete="off"
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
                      autoComplete="off"
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
                      autoComplete="off"
                    />
                    {errors.password2 && (
                      <div className="invalid-feedback">
                        {" "}
                        {errors.password2}{" "}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="password">City:</label>
                    <Field
                      component="input"
                      type="text"
                      name="city"
                      className={classnames("form-control", {
                        "is-invalid": errors.city
                      })}
                      id="city"
                      placeholder="Enter city"
                      autoComplete="off"
                    />
                    {errors.city && (
                      <div className="invalid-feedback"> {errors.city} </div>
                    )}
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="confirm-password">State:</label>
                    <Field
                      component="input"
                      type="text"
                      name="state"
                      className={classnames("form-control ", {
                        "is-invalid": errors.state
                      })}
                      id="confirm-state"
                      placeholder="Enter State"
                      autoComplete="off"
                    />
                    {errors.state && (
                      <div className="invalid-feedback"> {errors.state} </div>
                    )}
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="confirm-password">Country:</label>
                    <Field
                      component="input"
                      type="text"
                      name="country"
                      className={classnames("form-control ", {
                        "is-invalid": errors.country
                      })}
                      id="confirm-country"
                      placeholder="Enter Country"
                      autoComplete="off"
                    />
                    {errors.country && (
                      <div className="invalid-feedback"> {errors.country} </div>
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
                    autoComplete="off"
                  />
                  {errors.dob && (
                    <div className="invalid-feedback"> {errors.dob} </div>
                  )}
                </div>
                <button type="submit" className="btn btn-dark">
                  Register
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
  form: "register"
})(
  connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(Register))
);
