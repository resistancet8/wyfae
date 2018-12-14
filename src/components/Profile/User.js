import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Route, withRouter, Redirect } from "react-router-dom";

let formData = new FormData();

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "" };
    this.profilePicUpload = this.profilePicUpload.bind(this);
  }

  profilePicUpload() {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/update_profile_pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(d => {
        this.props.dispatch({ type: "SHOW_TOAST", payload: "Uploaded" });
      })
      .catch(e => {
        console.err(e.response);
      });
  }

  handleChange(e) {
    e.preventDefault();

    let reader = new FileReader();

    formData.append("pic", e.target.files[0]);
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      this.props.dispatch({ type: "SHOW_TOAST", payload: "Uplading..." });
      this.profilePicUpload();
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let img_tag = null;
    if (imagePreviewUrl) {
      img_tag = (
        <img
          src={imagePreviewUrl}
          className="img-fluid rounded-circle mx-auto"
        />
      );
    } else {
      img_tag = (
        <img
          src={`process.env.REACT_APP_API_ENDPOINT/${this.props.user.url}`}
          className="img-fluid rounded-circle mx-auto"
        />
      );
    }

    return (
      <div>
        <div className="avatar row">
          {img_tag}
          {!this.props.userpage && (
            <div class="avatar-choose">
              <input
                type="file"
                class="d-none"
                name="pic"
                id="avatar"
                onChange={e => this.handleChange(e)}
              />
              <label htmlFor="avatar">choose</label>
            </div>
          )}
        </div>
        <div className="details text-center mt-3">
          <h2 className="font-weight-bold">{this.props.user.first_name}</h2>
          <p>{`${this.props.user.city ? this.props.user.city + "," : ""} ${
            this.props.user.state ? this.props.user.state + "," : ""
          } ${
            this.props.user.country ? this.props.user.country + "," : ""
          } Earth`}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(User));
