import React, { Component } from 'react'
import { Form, FormGroup, Input, Row, Col, Button} from 'reactstrap';

import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from './../../Loader';

class AdminCompetition extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notification_message: "",
      saving: false,
      showLoader: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit(e) {
    this.setState({ saving: true })
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization": this.props.admin.admin_token || "",
      }
    };

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/push_message`, { text: this.state.notification_message }, axiosConfig)
      .then(response => {
        alert("Saved!")
        this.setState({ saving: false })
      })
      .catch(err => {
        alert("Error Saving Message!")
        this.setState({ saving: false })
      });
  }

  componentDidMount() {
    this.setState({ showLoader: true })
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization": this.props.admin.admin_token || "",
      }
    };

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/get_message`, { compete_status: "all", skip_count: 0, limit_count: 10 }, axiosConfig)
      .then(response => {
        let data = response.data.admin_message.text;
        this.setState({
          notification_message: data,
          showLoader: false
        });
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    return (
      <div className="pr-2">
        <Row>
          <Col md="4">
            <h2 className="my-1">Notification Message</h2>
            <Form>
              <FormGroup>
                {this.state.showLoader ?  <Loader/> : this.state.notification_message.length >= 0 && <Input style={{ height: '300px' }} type="textarea" name="text" onChange={this.handleChange} id="notification_message" placeholder="Enter Message" value={this.state.notification_message} />}
              </FormGroup>
            </Form>
            {this.state.saving ? <Loader/> : <Button type="submit" onClick={this.handleSubmit}>Submit</Button>}
          </Col>
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

export default withRouter(connect(mapStateToProps)(AdminCompetition));