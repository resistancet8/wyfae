import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

class User extends Component {
  render() {
    return (
      <div>
        <div className="avatar row">
          <img
            src="https://pbs.twimg.com/profile_images/496824857368072193/flaqCCcX_400x400.png"
            alt=""
            className="img-fluid rounded-circle mx-auto"
          />
        </div>
        <div className="details text-center mt-3">
          <h2 className="font-weight-bold">Naveen N</h2>
          <h3>From: Earth</h3>
        </div>
      </div>
    );
  }
}

export default User;
