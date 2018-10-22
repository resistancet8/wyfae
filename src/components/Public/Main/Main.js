import React, { Component } from "react";
import Card from "./Card";

class Main extends Component {
  render() {
    let Posts = [];
    if (this.props.posts_tr === '/trending/') {
      Posts = this.props.posts.map(post => {
        return post.shared_type !== 'compete' && post.shared_type !== 'save' ? <Card post={post} /> : "";
      });
    } else{
      Posts = this.props.posts.filter(post => {
        return post.post_type !== "memory_book" && post.art_type.toLowerCase() === this.props.posts_tr
      }).map(post => {
        return post.shared_type !== 'compete' && post.shared_type !== 'save' ? <Card post={post} /> : "";
      });
    }

    return (
      <div {...this.props}>
        <h3 className="font-weight-bold">Main</h3>
        {Posts}
      </div>
    );
  }
}

export default Main;
