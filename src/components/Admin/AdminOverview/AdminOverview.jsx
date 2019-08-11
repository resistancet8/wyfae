import React, { Component } from 'react'
import { connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Loader from './../../Loader';

class AdminOverview extends Component {

  state = {
    user_count: 0
  };

  componentDidMount() {
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization": this.props.admin.admin_token || "",
      }
    };

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/get-users`, { skip_count: 0 }, axiosConfig)
      .then(response => {
        let user_count = response.data.user_count || [];

        this.setState({
          user_count
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
                <div class="card-icon">
                  <i class="material-icons">content_copy</i>
                </div>
                <p class="card-category">Total No. Of Registered Users</p>
                <h3 class="card-title">{this.state.user_count ? this.state.user_count: <Loader />}
                </h3>
              </div>
              <div class="card-footer">
                <div class="stats-view">
                  <Link to="/admin/dashboard/users">View</Link>
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