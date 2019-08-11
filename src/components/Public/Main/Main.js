import React, { Component } from "react";
import Card from "./Card";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from './../../Loader';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inview: [],
      hasMore: true,
      showLoading: false
    };

    this.loadFunc = this.loadFunc.bind(this);
  }

  loadFunc() {
    let url = this.props.posts_tr === "/trending/" ? "get_all_trending" : "get_trending";

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/user/${url}`, { trending_type: this.props.posts_tr, skip_count: this.state.inview.length, limit_count: 10 })
      .then(response => {
        this.setState((prev) => {
          return {
            inview: [...this.state.inview, ...response.data.all_content],
            hasMore: response.data.all_content.length <= 0 ? false : true
          }
        })
      })
      .catch(err => {
      });
  }

  componentDidMount() {
    let url = this.props.posts_tr === "/trending/" ? "get_all_trending" : "get_trending";
    this.setState({
      showLoading: true
    });

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/user/${url}`, {
        trending_type: this.props.posts_tr, //rap, poem, story, quotes, gazal, singing, comedy, dance
        skip_count: 0,
        limit_count: 10
      })
      .then(response => {
        let data = response.data.all_content || [];
        this.setState({
          inview: [...data],
          showLoading: data.length == 0 ? false : true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    let items = [];
    items = this.state.inview.map(post => {
      return <Card post={post} />;
    });

    return items.length > 0 ? (
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
      </div>
  }
}

export default Main;
