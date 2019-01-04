import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import axios from "axios";
import Card from "./../Public/Main/Card";

class FollowingRoute extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/get_circle_content", {
        skip_count: 0
      })
      .then(data => {
        this.setState({
          posts: data.data.circle_content || []
        });
      })
      .catch(err => {
        console.err(err.response.data);
      });
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