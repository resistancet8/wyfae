import React, { Component } from "react";
import Card from "./Card";

class Main extends Component {
  render() {
    let Posts = [];
    if (this.props.posts_tr === "/trending/") {
      Posts = this.props.posts.map(post => {
        return (
          post.shared_type !== "compete" &&
          post.shared_type !== "save" && <Card post={post} />
        );
      });
    } else {
      Posts = this.props.posts
        .map(post => {
          if (
            post.post_type !== "memory_book" &&
            post.art_type.toLowerCase() === this.props.posts_tr &&
            post.shared_type !== "compete" &&
            post.shared_type !== "save"
          ) {
            return <Card post={post} />;
          } else return false;
        })
        .filter(o => o !== false);
    }

    return Posts.length > 0 ? (
      <div {...this.props}>{Posts}</div>
    ) : (
      <div {...this.props}>No Posts</div>
    );
  }
}

export default Main;
