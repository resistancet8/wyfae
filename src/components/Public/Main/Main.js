import React, { Component } from "react";
import Card from "./Card";
import axios from 'axios';

class Main extends Component {

  componentDidMount() {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/user/get_trending`, {
        trending_type: 'poem', //rap, poem, story, quotes, gazal, singing, comedy, dance
        skip_count: 0
      })
      .then(response => {
        let posts = response.data.all_content || [];
        console.log("+++", posts)
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    let Posts = [];
    if (this.props.posts_tr === "/trending/") {
      Posts = this.props.posts.map(post => {
        return (
          post.shared_type !== "compete" &&
          post.shared_type !== "save" && <Card post={post} />
        );
      }).filter(o => o !== false);
    } else {
      Posts = this.props.posts
        .map(post => {
          if (
            post.post_type !== "memory_book" &&
            (post.art_type || "").toLowerCase() === this.props.posts_tr &&
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
