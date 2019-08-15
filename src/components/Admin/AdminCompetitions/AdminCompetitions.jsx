import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import Loader from './../../Loader';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';

import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class AdminCompetition extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inview: [],
      hasMore: true,
      showLoading: false
    };

    this.deleteCompetition = this.deleteCompetition.bind(this);
    this.loadFunc = this.loadFunc.bind(this);
  }

  loadFunc() {
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization": this.props.admin.admin_token || "",
      }
    };

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/get_contest`, { compete_status: "all", skip_count: this.state.inview.length, limit_count: 10 }, axiosConfig)
      .then(response => {
        let data = response.data.all_content;
        let allPosts = data.upcoming;
        allPosts = [...allPosts, ...data.ongoing];
        allPosts = [...allPosts, ...data.finshed];

        this.setState((prev) => {
          return {
            inview: [...this.state.inview, ...allPosts],
            hasMore: allPosts.length <= 0 ? false : true
          }
        })
      })
      .catch(err => {
      });
  }

  deleteCompetition(post_id) {
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization": this.props.admin.admin_token || "",
      }
    };

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/delete_post`, { post_id }, axiosConfig)
      .then(response => {
        alert("Deleted");
        window.location.reload();
      })
      .catch(err => {
        alert("error deleting post: ")
      });
  }

  componentDidMount() {
    this.setState({
      showLoading: true
    });

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization": this.props.admin.admin_token || "",
      }
    };

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/get_contest`, { compete_status: "all", skip_count: 0,  limit_count: 10 }, axiosConfig)
      .then(response => {
        let data = response.data.all_content;
        let allPosts = data.upcoming;
        allPosts = [...allPosts, ...data.ongoing];
        allPosts = [...allPosts, ...data.finshed];

        this.setState({
          inview: [...allPosts],
          showLoading: allPosts.length == 0 ? false: true
        });
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    let items = this.state.inview.map((competition, index) => {
      return <Row className="my-4 border-bottom">
        <Col md="1">{index + 1}</Col>
        <Col md="2"><div className="text-capitalize">{competition.post_title.substr(0, 20)}</div></Col>
        <Col md="2">{moment(competition.creation_time).format("DD-MM-YYYY HH:mm")}</Col>
        <Col md="2">{moment(competition.start_time).format("DD-MM-YYYY HH:mm")}</Col>
        <Col md="2">{moment(competition.end_time).format("DD-MM-YYYY HH:mm")}</Col>
        <Col md="2">{competition.winner}</Col>
        <Col md="1">
          <Link to={`/admin/dashboard/competitions/view/${competition._id}`}><button title="view" class="btn"><i class="fa fa-eye"></i></button></Link>
          <button title="delete" onClick={() => {
            let confirm_delete = window.confirm("Sure you want to delete?");
            if (confirm_delete) {
              this.deleteCompetition(competition._id);
            }
          }} type="button" class="btn" id="Popover-1"><i class="fa fa-trash"></i></button>
        </Col>
      </Row>
    });


    return (
      <div className="pr-2">
        <h2 className="my-1">List of Competitions</h2>
        <Row className="border py-3">
          <Col md="1"> <strong>#</strong></Col>
          <Col md="2"> <strong>Title</strong></Col>
          <Col md="2"> <strong>Created</strong></Col>
          <Col md="2"> <strong>Start</strong></Col>
          <Col md="2"> <strong>End</strong></Col>
          <Col md="2"> <strong>Winner</strong></Col>
          <Col md="1"></Col>
        </Row>
        {this.state.inview && this.state.inview.length > 0 ?
          <div style={{ height: "90vh", overflowX: "hidden", overflowY: "auto" }}>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadFunc}
              hasMore={this.state.hasMore}
              useWindow={false}
              threshold={10}
              loader={<div className="text-center py-2"> <Loader /></div>}
            >
              {items}
            </InfiniteScroll>
          </div> :
          <div>
            {this.state.showLoading &&<div className="text-center py-2"> <Loader /></div>}
            {this.state.inview.length == 0 && !this.state.showLoading && <div className="text-center py-2"><strong>No competitions to show.</strong></div>}
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin
  }
};

export default withRouter(connect(mapStateToProps)(AdminCompetition));