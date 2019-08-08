import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
      <div>
        <ListGroup className="admin-sidebar-ul">
          <Link className="text-decoration-none font-weight-bold" to="/admin/dashboard/users"><ListGroupItem>Users</ListGroupItem></Link>
          <Link className="text-decoration-none font-weight-bold" to="/admin/dashboard/posts"><ListGroupItem>Posts</ListGroupItem></Link>
          <Link className="text-decoration-none font-weight-bold" to="/admin/dashboard/competitions"><ListGroupItem>Competitions</ListGroupItem></Link>
          <Link className="text-decoration-none font-weight-bold" to="/admin/dashboard/reports"><ListGroupItem>Reports</ListGroupItem></Link>
          <Link className="text-decoration-none font-weight-bold" to="/admin/dashboard/settings"><ListGroupItem>Settings</ListGroupItem></Link>
        </ListGroup>
      </div>
    )
  }
}

export default Sidebar;