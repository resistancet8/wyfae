import React, { Component } from "react";

class User extends Component {
  render() {
    return (
      <div>
        <div className="avatar row">
          <img
            src={`http://159.89.171.16:9000/${this.props.user.url}`}
            alt=""
            className="img-fluid rounded-circle mx-auto"
          />
        </div>
        <div className="details text-center mt-3">
          <h2 className="font-weight-bold">{this.props.user.first_name}</h2>
          <p>{`${this.props.user.city}, ${this.props.user.state}, ${
            this.props.user.country
          }, Earth`}</p>
        </div>
      </div>
    );
  }
}

export default User;
