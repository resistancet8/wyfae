import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './../../Loader';

class AdminOverview extends Component {

  state = {
    overview: {}
  };

  componentDidMount() {

    if(!this.props.admin.admin_token)
      window.location.reload();

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization": this.props.admin.admin_token || "",
      }
    };

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/get_overview`, { skip_count: 0 }, axiosConfig)
      .then(response => {
        this.setState({
          overview: response.data
        });
      })
      .catch(err => {
      });
  }

  render() {
    return (
      <div>
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats">
              <div class="card-header card-header-warning card-header-icon">
                <p class="card-category">Total No. Of Registered Users</p>
                <h3 class="card-title">{( this.state.overview.user_count || this.state.overview.user_count == 0) ? this.state.overview.user_count: <Loader />}
                </h3>
              </div>
              <div class="card-footer">
                <div class="stats-view">
                  <Link to="/admin/dashboard/users">View</Link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats">
              <div class="card-header card-header-warning card-header-icon">
                <p class="card-category">Total No. Of Posts</p>
                <h3 class="card-title">{(this.state.overview.post_count == 0 || this.state.overview.post_count) ? this.state.overview.post_count: <Loader />}
                </h3>
              </div>
              <div class="card-footer">
                <div class="stats-view">
                  <Link to="/admin/dashboard/posts">View</Link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats">
              <div class="card-header card-header-warning card-header-icon">
                <p class="card-category">Posts Reported Spam</p>
                <h3 class="card-title">{(this.state.overview.flag_count || this.state.overview.flag_count == 0) ? this.state.overview.flag_count: <Loader/>}
                </h3>
              </div>
              <div class="card-footer">
                <div class="stats-view">
                  <Link to="/admin/dashboard/reports">View</Link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats">
              <div class="card-header card-header-warning card-header-icon">
                <p class="card-category">Competition Count</p>
                <h3 class="card-title">{( this.state.overview.compete_count || this.state.overview.compete_count == 0) ? this.state.overview.compete_count: <Loader/>}
                </h3>
              </div>
              <div class="card-footer">
                <div class="stats-view">
                  <Link to="/admin/dashboard/competitions">View</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin
  }
};

export default connect(mapStateToProps)(AdminOverview);