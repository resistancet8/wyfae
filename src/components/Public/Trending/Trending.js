import React, { Component } from "react";
import { Link } from 'react-router-dom';
import navigationHome from "./../../../helpers/navigation";

class Trending extends Component {
  render() {
    return (
      <div {...this.props}>
        <h3 className="font-weight-bold">Trending</h3>
        <div className="trending-links">
          {navigationHome.map(route => {
            return <p><Link to={route.path}>{route.text}</Link></p>
          })}
        </div>
      </div>
    );
  }
}

export default Trending;
