import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link, withRouter } from "react-router-dom";

class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.handleSignoutAdmin = this.handleSignoutAdmin.bind(this);
  }

  handleSignoutAdmin(e) {
    e.preventDefault();
    localStorage.removeItem('admin_token');
    this.props.history.push('/admin');
  }

  render() {
    return (
      <div>
        <ListGroup className="admin-sidebar-ul">
          <Link className="text-decoration-none font-weight-bold" to="/admin/dashboard/overview"><ListGroupItem>Overview</ListGroupItem></Link>
          <Link className="text-decoration-none font-weight-bold" to="/admin/dashboard/users"><ListGroupItem>Users</ListGroupItem></Link>
          <Link className="text-decoration-none font-weight-bold" to="/admin/dashboard/posts"><ListGroupItem>Posts</ListGroupItem></Link>
          <Link className="text-decoration-none font-weight-bold" to="/admin/dashboard/competitions"><ListGroupItem>Competitions</ListGroupItem></Link>
          <Link className="text-decoration-none font-weight-bold" to="/admin/dashboard/reports"><ListGroupItem>Reports</ListGroupItem></Link>
          <Link className="text-decoration-none font-weight-bold" to="/admin/dashboard/settings"><ListGroupItem>Settings</ListGroupItem></Link>
          <a href="#" className="text-decoration-none font-weight-bold" onClick={this.handleSignoutAdmin}><ListGroupItem>Signout</ListGroupItem></a>
        </ListGroup>
      </div>
    )
  }
}

export default withRouter(Sidebar);