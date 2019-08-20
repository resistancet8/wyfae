import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import About from "./About";

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
        console.log(e.response);
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

    if (imagePreviewUrl && this.props.user.url) {
      img_tag = <img
        src={imagePreviewUrl}
        className="img-fluid rounded-circle mx-auto profile-pic"
        style={{ objectFit: "cover" }}
      />
    } else if (!imagePreviewUrl && this.props.user.url) {
      img_tag = <img
        src={process.env.REACT_APP_API_ENDPOINT + '/' + this.props.user.url}
        className="img-fluid rounded-circle mx-auto profile-pic"
        style={{ objectFit: "cover" }}
      />
    }

    let stars = this.props.user.star || 0;
    stars = stars >= 0 && stars <= 5 ? stars : 0;
    let starsHTML = [];

    for(let i = 0; i < Number(stars); i++) {
      starsHTML.push(<i style={{color: 'orange'}} class="fas fa-star"></i>);
    }

    for(let i = 0; i < (5 - Number(stars)); i++) {
      starsHTML.push(<i style={{color: '#BBBBBB'}} class="fas fa-star"></i>);
    }

    return (
      <div>
        <div className="avatar row mx-auto" style={{ maxWidth: "200px", maxHeight: "200px" }}>
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
              <label htmlFor="avatar">Choose</label>
            </div>
          )}
        </div>
        <div className="details mt-1">
          <h2 className="font-weight-bold text-center" style={{ fontSize: "1.5rem" }}>{this.props.user.first_name}</h2>
          <div className="text-center mb-2">
            {starsHTML}
          </div>
          <p className="text-center">{`${this.props.user.city ? this.props.user.city + "," : ""} ${
            this.props.user.state ? this.props.user.state + "," : ""
            } ${
            this.props.user.country ? this.props.user.country + "," : ""
            } Earth`}</p>
        </div>
        {this.props.children}
        <About user={this.props.user} userpage={this.props.userpage} />
      </div>
    );
  }
}

export default withRouter(connect()(User));
