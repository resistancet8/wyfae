import React, { Component } from "react";
import { Link } from 'react-router-dom';
import navigationHome from "./../../../helpers/navigation";
import StickyBar from './../../StickyBar/StickyBar';

class Trending extends Component {
  render() {
    return (
      <div className={ this.props.className + " d-none d-lg-block"}>
        <h3 className="font-weight-bold mb-5">TRENDING Weekly</h3>
        <div className="trending-links">
          {navigationHome.map(route => {
            if(route.path != '/trending/')
              return <div class="trending-link"><Link to={route.path}>{route.text}</Link></div>
          })}
        </div>
        <StickyBar />
      </div>
    );
  }
}

export default Trending;
