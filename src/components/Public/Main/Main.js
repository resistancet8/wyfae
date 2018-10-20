import React, { Component } from "react";
import Card from "./Card";

class Main extends Component {
  render() {
    let Posts = this.props.posts.map(post => {
      return post.shared_type !== 'compete' && post.shared_type !== 'save' ? <Card post={post} /> : "";
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
