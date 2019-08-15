import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import axios from 'axios';
import Loader from './../../Loader';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class AdminUsersView extends Component {

  state = {
    user: null
  };

  componentDidMount() {
    let user_id = this.props.match.params.user_id || 0;

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization": this.props.admin.admin_token || "",
      }
    };

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/get_single_user`, { username: user_id }, axiosConfig)
      .then(response => {
        let data = response.data.all_content[0] || {};
        this.setState({
          user: data
        });
      })
      .catch(err => {
      });
  }
  render() {
    console.log(this.state)
    return (
      <div className="">
        {this.state.user ? <div>
          <h2 className="font-weight-bold">{this.state.user.fullname}</h2>
          <hr />
          <Row className="mt-2">
            <Col md="2">
              <div>
                <img
                  src={`${process.env.REACT_APP_API_ENDPOINT}` + "/static/default-avatar.jpg"}
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col md="4">
              <div>
                <strong>{this.state.user.fullname}</strong>
              </div>
              <div>
                <i>{this.state.user.email}</i>
              </div>
              <div>
                <Link to={`/profile/${this.state.user._id}`}>View Profile</Link>
              </div>
            </Col>
          </Row>
          <div className="mt-2"></div>
          <Row>
            <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Total No. Of Followers</p>
                  <h3 class="card-title">{this.state.user.total_followers}</h3>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Total No. Of Content Shared</p>
                  <h3 class="card-title">{this.state.user.stats.content_shared}</h3>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Anonymously Shared Content</p>
                  <h3 class="card-title">{this.state.user.stats.anonymous_shared}</h3>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Total No. Of Wins</p>
                  <h3 class="card-title">{this.state.user.stats.no_of_wins}</h3>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Total No. Of Comments</p>
                  <h3 class="card-title">{this.state.user.stats.no_of_comments}</h3>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Total No. Of Likes</p>
                  <h3 class="card-title">{this.state.user.stats.no_of_likes}</h3>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Memory Book Privacy</p>
                  <h3 class="card-title text-capitalize">{this.state.user.memory_book_privacy}</h3>
                </div>
              </div>
            </div>
          </Row>
        </div> : <Loader />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin
  }
};

export default withRouter(connect(mapStateToProps)(AdminUsersView));