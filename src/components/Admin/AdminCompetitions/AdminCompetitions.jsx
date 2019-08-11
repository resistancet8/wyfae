import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import Loader from './../../Loader';
import InfiniteScroll from 'react-infinite-scroller';

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

    this.deleteUser = this.deleteUser.bind(this);
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
        let allPosts = [...data.upcoming];
        allPosts = [...data, ...data.ongoing];
        allPosts = [...data, ...data.finished];

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

  deleteUser(username) {
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization": this.props.admin.admin_token || "",
      }
    };

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/delete_user`, { username }, axiosConfig)
      .then(response => {
        alert("Deleted " + username);
        window.location.reload();
      })
      .catch(err => {
        alert("error deleting user: " + username)
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
    let items = this.state.inview.map((user, index) => {
      return <Row className="my-4 border-bottom">
        <Col md="1">{index + 1}</Col>
        <Col md="2">{user.fullname}</Col>
        <Col md="2">{user.email}</Col>
        <Col md="2">{user.memory_book_privacy}</Col>
        <Col md="2">{user.total_followers}</Col>
        <Col md="2"><Link to={`/profile/${user._id}`}>@{user._id}</Link></Col>
        <Col md="1">
          <Link to={`/admin/dashboard/users/view/${user._id}`}><button title="view" class="btn"><i class="fa fa-eye"></i></button></Link>
          <button title="delete" onClick={() => {
            let confirm_delete = window.confirm("Sure you want to delete?");
            if (confirm_delete) {
              this.deleteUser(user._id);
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
          <Col md="2"> <strong>Name</strong></Col>
          <Col md="2"> <strong>Email</strong></Col>
          <Col md="2"> <strong>M/B Privacy</strong></Col>
          <Col md="2"> <strong>Followers</strong></Col>
          <Col md="2"> <strong>Username</strong></Col>
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