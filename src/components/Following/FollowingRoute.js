import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Card from "./../Public/Main/Card";
import InfiniteScroll from 'react-infinite-scroller';
import Loader from './../Loader';
import StickyBar from './../StickyBar/StickyBar';

class FollowingRoute extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inview: [],
      hasMore: true,
      following: [],
      showLoading: false
    };

    this.loadFunc = this.loadFunc.bind(this);
  }

  loadFunc() {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/user/get_circle_content`, { skip_count: this.state.inview.length, limit_count: 10 })
      .then(response => {
        this.setState((prev) => {
          return {
            inview: [...this.state.inview, ...response.data.circle_content],
            hasMore: response.data.circle_content.length <= 0 ? false : true
          }
        })
      })
      .catch(err => {
      });
  }

  componentDidMount() {
    this.setState({
      showLoading: true
    });

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/get_circle_content", {
        skip_count: 0,
        limit_count: 10
      })
      .then(response => {
        let following = response.data.followed || [];

        this.setState((prev) => {
          return {
            inview: [...this.state.inview, ...response.data.circle_content],
            following,
            showLoading: response.data.length == 0 ? false : true
          }
        })
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }


  render() {
    let items = [];
    items = this.state.inview.map(post => {
      return <Card post={post} />;
    });

    let following = this.state.following;
    let ListOfUsers =
      following.length > 0 ? (
        following.map(user => {
          return (
            <div
              className="each-following row px-3"
              onClick={() => {
                this.props.history.push("/profile/" + user.username);
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
              <span>Following List</span>
            </div>
          </div>
        );


    return <div style={{ padding: "40px" }}>
      <div {...this.props} class="row">
        <div className="col-md-4">
          <div className="sticky-top">
            {ListOfUsers}
          </div>
        </div>
        <div className="col-md-5">
          {items.length > 0 ? (
            <div style={{ padding: '1px' }}>
              <InfiniteScroll
                pageStart={0}
                loadMore={this.loadFunc}
                hasMore={this.state.hasMore}
                useWindow={true}
                threshold={10}
                loader={<div className="text-center py-2"> <Loader /></div>}
              >
                {items}
              </InfiniteScroll>
            </div>
          ) : <div>
              {this.state.showLoading && <div className="text-center py-2"> <Loader /></div>}
              {this.state.inview.length == 0 && !this.state.showLoading && <div className="text-center py-2">
                <div className="container p-5">
                  <h1>No posts yet.</h1>
                </div>
              </div>}
            </div>}
        </div>
      </div>
      <StickyBar />
    </div>

  }
}

export default withRouter(FollowingRoute);
