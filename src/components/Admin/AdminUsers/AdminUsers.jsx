import React, { Component } from 'react'
import { Table } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AdminUsers extends Component {

  state = {
    users: []
  };

  componentDidMount() {

    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6Ind5ZmFlX2FkbWluX2Fua2l0IiwiZXhwIjoxNTY1MzQ2MDE4fQ.7mCVsCunKIDl9R4pA8oLeYLq5c4Z3kQZA6DJPpZsevBdlcIhvjO_CbOT__i6kbFEA6VIHScgkRa-Wx5tDPxsbg",
      }
    };

    axios
    .post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/get-users`, {skip_count: 0}, axiosConfig)
    .then(response => {
      let data = response.data.all_content || [];
      
      this.setState({
        users: data
      });

    })
    .catch(err => {
      // if (err.response && err.response.data) {
      //   dispatch({ type: "GET_ERRORS", payload: err.response.data });
      //   dispatch({ type: "SHOW_TOAST", payload: 'Admin: ' + err.response.data.msg });
      // } else {
      //   dispatch({ type: "SHOW_TOAST", payload: "Server Error" });
      // }
    });
  }

  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>M/B Privacy</th>
              <th>Followers</th>
              <th>Username</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, index) => {
              return <tr>
                <th scope="row">{index+1}</th>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.memory_book_privacy}</td>
                <td>{user.total_followers}</td>
                <td><Link to={`/profile/${user._id}`}>@{user._id}</Link></td>
                <td>
                  <button title="view" class="btn"><i class="fa fa-eye"></i></button>
                  <button title="edit" class="btn"><i class="fa fa-edit"></i></button>
                  <button title="delete" class="btn"><i class="fa fa-trash"></i></button>
                </td>
              </tr>
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default AdminUsers;