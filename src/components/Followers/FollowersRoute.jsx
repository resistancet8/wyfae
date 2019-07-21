import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Card from "./../Public/Main/Card";

class FollowersRoute extends Component {
  state = {
    posts: [],
    followers: []
  };

  componentDidMount() {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/get_circle_content", {
        skip_count: 0
      })
      .then(data => {
        let followers =
          data.data && data.data.followed.length > 0
            ? data.data.followed
            : [];
        this.setState({
          posts: data.data.circle_content || [],
          followers: followers
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }

  changeURL(username) {
    this.props.history.push("/profile/" + username);
  }

  render() {
    let Posts = [];

    Posts = this.state.posts.map(post => {
      return <Card post={post} />;
    });

    let followers = this.state.followers;
    let ListOfUsers =
      followers.length > 0 ? (
        followers.map(user => {
          return (
            <div
              className="each-following row px-3"
              onClick={() => {
                this.changeURL.call(this, user.username);
              }}
            >
              <div className="col-2">
                <img
                  className="img-fluid"
                  src={`${process.env.REACT_APP_API_ENDPOINT}` + "/" + user.url}
                />
              </div>
              <div className="col-10">
                <span>{user.name}</span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="each-following row px-3">
          <div className="col-12">
            <span>No Followers</span>
          </div>
        </div>
      );


    return Posts.length > 0 ? (
      <div style={{padding: "40px"}}>
        <div {...this.props} class="row">
          <div className="col-md-4">
            <div className="sticky-top">
              {ListOfUsers}
            </div>
          </div>
          <div className="col-md-6">
            {Posts}
          </div>
        </div>
      </div>
    ) : (
      <div {...this.props}>No Posts</div>
    );
  }
}

export default withRouter(FollowersRoute);
