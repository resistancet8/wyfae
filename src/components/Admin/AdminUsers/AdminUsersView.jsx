import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import axios from 'axios';
import Loader from './../../Loader';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class AdminUsersView extends Component {

  componentDidMount() {
    let user_id = this.props.match.params.user_id || 0;

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization": this.props.admin.admin_token || "",
      }
    };

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/get-users`, { skip_count: 0 }, axiosConfig)
      .then(response => {
        let data = response.data.all_content || [];

        this.setState({
          users: data
        });

      })
      .catch(err => {
      });
  }
  render() {
    return (
      <div className="">
        <h2 className="font-weight-bold">Naveen N</h2>
        <hr/>
        <Row>
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
              <strong>Naveen N</strong>
            </div>
          </Col>
        </Row>
        <Row>

        </Row>
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