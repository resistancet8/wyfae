import React, { Component } from "react";
import axios from "axios";
import Participants from "./Participants";
import CompeteLogo from './../../../assets/img/startbadge.svg'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from './../../Loader';

class Completed extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inview: [],
      hasMore: true,
      showLoading: false
    };

    this.loadFunc = this.loadFunc.bind(this);
  }

  componentDidMount() {

    this.setState({
      showLoading: true
    });

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/get_contest", {
        skip_count: 0,
        compete_status: "finished",
        limit_count: 10
      })
      .then(response => {
        let { finished } = response.data.all_content;
        this.setState({
          inview: finished,
          showLoading: finished.length == 0 ? false : true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  loadFunc() {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/get_contest", {
        compete_status: "finished",
        limit_count: 10,
        skip_count: this.state.inview.length
      })
      .then(response => {
        let { finished } = response.data.all_content;
        this.setState((prev) => {
          return {
            inview: [...this.state.inview, ...finished],
            hasMore: finished.length <= 0 ? false : true
          }
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    let items = [];
    items = this.state.inview.map(post => {
      return <Participants data={post} completed={1} comp="completed" />;
    });

    return items.length > 0 ? (
      <div style={{ padding: '1px' }}>
        <div>
          <img style={{height: "55px"}} src={CompeteLogo} alt=""/>
          <span className="font-weight-bold text-muted title-comp">Winners</span>
        </div>
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
            <h1>No completed competitions yet.</h1>
          </div>
        </div>}
      </div>
  }
}

export default Completed;
