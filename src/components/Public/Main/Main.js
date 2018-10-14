import React, { Component } from "react";
import Card from "./Card";

class Main extends Component {
  render() {
    let Posts = this.props.posts.map(obj => {
      return <Card post={obj} />;
    });

    return (
      <div {...this.props}>
        <h3 className="font-weight-bold">Main</h3>
        {Posts}
      </div>
    );
  }
}

export default Main;
