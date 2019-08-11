import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row} from 'reactstrap';

class AdminUsersEdit extends Component {

  componentDidMount() {
    let user_id = this.props.match.params.user_id || 0;

    // let axiosConfig = {
    //   headers: {
    //     'Content-Type': 'application/json;charset=UTF-8',
    //     "Authorization": this.props.admin.admin_token || "",
    //   }
    // };

    // axios
    //   .post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/get-users`, { skip_count: 0 }, axiosConfig)
    //   .then(response => {
    //     let data = response.data.all_content || [];

    //     this.setState({
    //       users: data
    //     });

    //   })
    //   .catch(err => {
    //     // if (err.response && err.response.data) {
    //     //   dispatch({ type: "GET_ERRORS", payload: err.response.data });
    //     //   dispatch({ type: "SHOW_TOAST", payload: 'Admin: ' + err.response.data.msg });
    //     // } else {
    //     //   dispatch({ type: "SHOW_TOAST", payload: "Server Error" });
    //     // }
    //   });
  }
  render() {
    return (
      <div className="container">
        <h2 className="font-weight-bold">Edit User</h2>
        <hr/>
        <Row>
          <Col md="4">
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Select</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelectMulti">Select Multiple</Label>
                <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Text Area</Label>
                <Input type="textarea" name="text" id="exampleText" />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
                  Check me out
                </Label>
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AdminUsersEdit;