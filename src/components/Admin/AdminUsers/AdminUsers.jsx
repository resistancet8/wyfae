import React, { Component } from 'react'
import { Table, Popover, PopoverHeader, PopoverBody, Button} from 'reactstrap';
import Loader from './../../Loader';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';

class AdminUsers extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
  };
  }

  componentDidMount() {
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Authorization": this.props.admin.admin_token || "",
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

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
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
            {this.state.users && this.state.users.length > 0 ?
            this.state.users.map((user, index) => {
              return <tr>
                <th scope="row">{index+1}</th>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.memory_book_privacy}</td>
                <td>{user.total_followers}</td>
                <td><Link to={`/profile/${user._id}`}>@{user._id}</Link></td>
                <td>
                  <Link to={`/admin/dashboard/users/view/${user._id}`}><button title="view" class="btn"><i class="fa fa-eye"></i></button></Link>
                  <Link to={`/admin/dashboard/users/edit/${user._id}`}><button title="edit" class="btn"><i class="fa fa-edit"></i></button></Link>
                  <button title="delete"  type="button" class="btn" id="Popover-1"><i class="fa fa-trash"></i></button>
                  <Button id="Popover1" type="button">
          Launch Popover
        </Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
          <PopoverHeader>Popover Title</PopoverHeader>
          <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
        </Popover>
                </td>
              </tr>
            }) :
              <tr>
                <th></th>
                <td></td>
                <td></td>
                <td><Loader /></td>
                <td></td>
                <td></td>
                <td>
                </td>
              </tr>}
          </tbody>
        </Table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin
  }
};

export default connect(mapStateToProps)(AdminUsers);