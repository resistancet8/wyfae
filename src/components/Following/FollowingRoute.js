import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import Card from "./../Public/Main/Card";

class FollowingRoute extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    // axios
    //   .post("http://159.89.171.16:9000/user/get_circle_content")
    //   .then(data => {
    let dummydata = {
      circle_content: [
        {
          art_type: "poem",
          url:
            "static/unique_user1/art/cdd44a41-cdd5-461e-83be-f2d41129593e.jpg",
          shared_type: "public",
          author: "Mantu",
          text: "first poem",
          post_title: "first poem",
          total_comments: 0,
          username: "unique_user1",
          likes: 0,
          post_type: "art",
          _id: "5c0572963412652656ecffd8",
          comments: [],
          user_liked: [],
          creation_time: "2018-12-03T18:14:46.149"
        }
      ],
      status: "success",
      msg: "Fetched Data Successfully",
      followed: [
        {
          name: "Mantu Kumar",
          url: "static/default-avatar.jpg",
          username: "unique_user1"
        }
      ],
      just_user: ["unique_user1"]
    };

    this.setState({
      posts: dummydata.circle_content
    });
    // })
    // .catch(err => {
    //   console.log(err.response.data);
    // });
  }

  render() {
    let Posts = [];

    Posts = this.state.posts.map(post => {
      return <Card post={post} />;
    });

    return Posts.length > 0 ? (
      <div {...this.props}>{Posts}</div>
    ) : (
      <div {...this.props}>No Posts</div>
    );
  }
}

export default withRouter(FollowingRoute);
