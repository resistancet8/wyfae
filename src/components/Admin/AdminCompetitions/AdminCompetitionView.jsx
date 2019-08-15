import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import axios from 'axios';
import Loader from './../../Loader';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

class AdminUsersView extends Component {

  state = {
    competition: null
  };

  componentDidMount() {
    let comp_id = this.props.match.params.comp_id || 0;

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization": this.props.admin.admin_token || "",
      }
    };

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/get_single_post`, { post_id: comp_id }, axiosConfig)
      .then(response => {
        let data = response.data.post_data || {};
        this.setState({
          competition: data
        });
      })
      .catch(err => {
      });
  }
  render() {
    return (
      <div className="">
        {this.state.competition ? <div>
          <h2 className="font-weight-bold text-capitalize">{this.state.competition.compete_status}</h2>
          <hr />
          <Row className="mt-2">
            <Col md="4">
              <h1 className="text-capitalize">{this.state.competition.post_title}</h1>
              <div>
                <Link to={`/shared/${this.state.competition._id}`} className="font-italic">View Competition</Link>
              </div>
            </Col>
          </Row>
          <hr />
          <div className="mt-2"></div>
          <Row>
            <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Created On</p>
                  <h3 class="card-title">{moment(this.state.competition.creation_time).format("DD-MM-YYYY HH:mm")}</h3>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Started On</p>
                  <h3 class="card-title">{moment(this.state.competition.start_time).format("DD-MM-YYYY HH:mm")}</h3>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Ends</p>
                  <h3 class="card-title">{moment(this.state.competition.end_time).format("DD-MM-YYYY HH:mm")}</h3>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Total No. Of Participants</p>
                  <h3 class="card-title">{this.state.competition.participants.length}</h3>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Competition Type</p>
                  <h3 class="card-title text-capitalize">{this.state.competition.art_type}</h3>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <p class="card-category">Winner</p>
                  <h3 class="card-title">{this.state.competition.winner}</h3>
                </div>
              </div>
            </div>
          </Row>
          <hr />
          <div>
            <h2>Participants</h2>
          </div>
          <Row className="pl-3">
            {this.state.competition.participants.map((p, index) => {
              return <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
                <div class="card card-stats">
                  <div class="card-header card-header-warning card-header-icon">
                    <p class="card-category">Participant #{index+1}</p>
                    <h3 class="card-title">{this.state.competition.post_title.substr(0, 50)}</h3>
                  </div>
                  <div class="card-body">
                    <p class="card-text">{p.text.substr(0, 100)}</p>
                  </div>
                  <div class="card-footer">
                    <div class="stats-view">
                      <Link to={"/profile/" + p.username}>{p.author}</Link>
                    </div>
                    <div class="mt-2">
                      <p><i class="fas fa-comments"></i> {p.total_comments} | <i class="fas fa-thumbs-up"></i> {p.likes}</p>
                    </div>
                  </div>
                </div>
              </div>
            })}
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