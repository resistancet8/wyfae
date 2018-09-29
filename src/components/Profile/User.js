import React, { Component } from "react";

class User extends Component {
  render() {
    return (
      <div>
        <div className="avatar row">
          <img
            src={this.props.user.avatar}
            alt=""
            className="img-fluid rounded-circle mx-auto"
          />
        </div>
        <div className="details text-center mt-3">
          <h2 className="font-weight-bold">{this.props.user.fname}</h2>
          <p>{`${this.props.user.from.city}, ${this.props.user.from.state}, ${
            this.props.user.from.country
          }, Earth`}</p>
        </div>
      </div>
    );
  }
}

export default User;
