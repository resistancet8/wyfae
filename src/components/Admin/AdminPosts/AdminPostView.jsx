import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import axios from 'axios';
import Loader from './../../Loader';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

class AdminUsersView extends Component {

  state = {
    post: null
  };

  componentDidMount() {
    let post_id = this.props.match.params.post_id || 0;

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization": this.props.admin.admin_token || "",
      }
    };

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/get_single_post`, { post_id: post_id }, axiosConfig)
      .then(response => {
        let data = response.data.post_data || {};
        this.setState({
          post: data
        });
      })
      .catch(err => {
      });
  }

  render() {
    return (
      <div className="">
        {this.state.post ? <div className="p-4">
          <h2 className="font-weight-bold text-capitalize">{this.state.post.post_title}</h2>
          <p className="mt-3">{this.state.post.text}</p>
          {this.state.post.image_or_text == 'true' && <img style={{ width: "200px" }} src={`${process.env.REACT_APP_API_ENDPOINT}/${this.state.post.url}`} /> }
          <hr />
          <div className="mt-2"></div>
          <Row>
            <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Likes</p>
                  <h3 class="card-title">{this.state.post.likes}</h3>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Comments</p>
                  <h3 class="card-title text-capitalize">{this.state.post.total_comments}</h3>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Shared As</p>
                  <h3 class="card-title text-capitalize">{this.state.post.shared_type}</h3>
                </div>
              </div>
            </div>
          </Row>
          <hr />
          <Link to={"/profile/" + this.state.post.username}>@{this.state.post.username}</Link>
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