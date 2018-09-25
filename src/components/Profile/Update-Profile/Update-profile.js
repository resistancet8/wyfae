import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import Spinner from "../../Loader/Spinner";
import Button from "@material-ui/core/Button";
import "./Update-profile.css";
import { updateProfile } from "../../../actions/auth_actions";

class UpdateProfile extends Component {
  state = {
    errors: {},
    isLoading: false
  };

  componentDidMount() {
    this.props.initialize({
      fname: this.props.user.fname,
      sur_name: this.props.user.sname,
      email: this.props.user.email,
      dob: this.props.user.dob
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        loading: false
      });
    }
  }

  updateUserInfo(userInfo) {
    this.setState(
      {
        loading: true
      },
      () => {
        setTimeout(() => {
          this.props.updateProfile(userInfo, this.props.history);
        }, 300);
      }
    );
  }

  render() {
    let { handleSubmit } = this.props;
    const { errors } = this.state;

    return (
      <div>
        <div className="my-3">
          <h2 className="font-weight-bold">Update Profile</h2>
          <div className="row">
            <div className="col-md-5">
              <form
                autoComplete="on"
                onSubmit={handleSubmit(this.updateUserInfo.bind(this))}
              >
                {errors.msg && (
                  <div className="alert alert-danger"> {errors.msg} </div>
                )}
                <div className="form-row">
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
                      autoComplete="off"
                      value=""
                    />
                    {errors.name && (
                      <div className="invalid-feedback"> {errors.name} </div>
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
                <Button type="submit" className="btn btn-dark update-btn">
                  {this.state.loading ? <Spinner /> : "Save Changes"}
                </Button>
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
  handleSubmit: PropTypes.func
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
    {}
  )(UpdateProfile)
);
