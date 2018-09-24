import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import { fetchUserDetails } from "../../../actions/user_actions";

class UpdateProfile extends Component {
  state = {
    errors: {},
    fname: "",
    lname: "",
    email: "",
    dob: ""
  };

  componentDidMount() {
    this.props.fetchUserDetails();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    this.setDefaultState(nextProps);
  }

  // Prefill input fields with the available data by setting default state.
  setDefaultState(value) {
    // Set state using data.
    this.setState({
      fname: value.user.name,
      lname: value.user.sur_name,
      email: value.user.email,
      dob: value.user.dob
    });
  }

  render() {
    let { handleSubmit } = this.props;
    const { errors, fname, lname, email, dob } = this.state;
    console.log(fname, lname, email, dob);
    return (
      <div>
        <div className="my-3">
          <h2 className="font-weight-bold">Update Profile</h2>
          <div className="row">
            <div className="col-md-5">
              <form autoComplete="on">
                {errors.msg && (
                  <div className="alert alert-danger"> {errors.msg} </div>
                )}
                <div className="form-row">
                asdjasd
                  <div className="form-group col-md-6">
                    <label htmlFor="fname">First Name:</label>
                    <Field
                      component="input"
                      type="text"
                      name="fname"
                      className={classnames("form-control", {
                        "is-invalid": errors.name
                      })}
                      id="fname"
                      placeholder="Enter First Name"
                      autoComplete="on"
                    />
                    {/* {errors.name && (
                      <div className="invalid-feedback"> {errors.name} </div>
                    )} */}
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
                      autoComplete="on"
                      value={lname}
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
                    value={email}
                  />
                  {errors.email && (
                    <div className="invalid-feedback"> {errors.email} </div>
                  )}
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
                    value={dob}
                  />
                  {errors.dob && (
                    <div className="invalid-feedback"> {errors.dob} </div>
                  )}
                </div>
                <button type="submit" className="btn btn-dark">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProfile.propTypes = {
  errors: PropTypes.object,
  user: PropTypes.object,
  fetchUserDetails: PropTypes.func
};

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

export default reduxForm({
  form: "update"
})(
  connect(
    mapStateToProps,
    { fetchUserDetails }
  )(UpdateProfile)
);
