import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import Spinner from "../../Loader/Spinner";
import Button from "@material-ui/core/Button";
import "./Update-profile.css";
import { updateUserProfile } from "../../../actions/user_actions";

class UpdateProfile extends Component {
  state = {
    errors: {},
    isLoading: false
  };

  componentDidMount() {
    this.props.initialize({
      first_name: this.props.user.first_name,
      sur_name: this.props.user.sur_name,
      email: this.props.user.email,
      dob: this.props.user.dob,
      city: this.props.user.city,
      state: this.props.user.state,
      country: this.props.user.country,
      about: this.props.user.about,
      contact: this.props.user.contact,
      langs: this.props.user.langs,
      favorite_art: this.props.user.favorite_art
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
          this.props.updateUserProfile(userInfo, this.props.history);
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
                      value=""
                    />
                    {errors.first_name && (
                      <div className="invalid-feedback"> {errors.first_name} </div>
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
                      <div className="invalid-feedback"> {errors.sur_name} </div>
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
                    placeholder="Date of Birth"
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
                      required
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
                      required
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
                      required
                    />
                    {errors.country && (
                      <div className="invalid-feedback"> {errors.country} </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="about">About:</label>
                  <Field
                    component="textarea"
                    name="about"
                    className={classnames("form-control", {
                      "is-invalid": errors.about
                    })}
                    id="about"
                    placeholder="Enter About"
                    autoComplete="off"
                  />
                  {errors.about && (
                    <div className="invalid-feedback"> {errors.about} </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="contact">Contact:</label>
                  <Field
                    component="input"
                    type="number"
                    name="contact"
                    className={classnames("form-control", {
                      "is-invalid": errors.contact
                    })}
                    id="contact"
                    placeholder="Enter Contact No."
                    autoComplete="off"
                  />
                  {errors.contact && (
                    <div className="invalid-feedback"> {errors.contact} </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="langs">Languages:</label>
                  <Field
                    component="input"
                    type="text"
                    name="langs"
                    className={classnames("form-control", {
                      "is-invalid": errors.langs
                    })}
                    id="langs"
                    placeholder="Languages Known"
                    autoComplete="off"
                  />
                  {errors.langs && (
                    <div className="invalid-feedback"> {errors.langs} </div>
                  )}
                  <small className="text-muted"> Separated by comma. </small>
                </div>
                <div className="form-group">
                  <label htmlFor="favorite_art">Favorite Artform:</label>
                  <Field
                    component="input"
                    type="text"
                    name="favorite_art"
                    className={classnames("form-control", {
                      "is-invalid": errors.favorite_art
                    })}
                    id="favorite_art"
                    placeholder="Favorite Artform"
                    autoComplete="off"
                  />
                  {errors.favorite_art && (
                    <div className="invalid-feedback">
                      {" "}
                      {errors.favorite_art}{" "}
                    </div>
                  )}
                  <small className="text-muted"> Separated by comma. </small>
                </div>
                <Button type="submit" variant="outlined">
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
    user: state.user.user,
    errors: state.errors.errors
  };
}

export default reduxForm({
  form: "update"
})(
  connect(
    mapStateToProps,
    { updateUserProfile }
  )(withRouter(UpdateProfile))
);
