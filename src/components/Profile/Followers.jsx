import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";

class Following extends Component {
  state = {
    following: []
  };

  componentDidMount() {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/get_circle", {
        skip_count: 0
      })
      .then(data => {
        let following =
          data.data.content && data.data.content.followed.length > 0
            ? data.data.content.followed
            : [];
        this.setState({
          following: following
        });
      })
      .catch(err => {
        if (err.response)
          this.props.dispatch({
            type: "SHOW_TOAST",
            payload: err.response.data.msg || "Error"
          });
      });
  }

  changeURL(username) {
    this.props.history.push("/profile/" + username);
  }

  render() {
    let following = this.state.following;

    let ListOfUsers =
      following.length > 0 ? (
        following.map(user => {
          return (
            <div
              className="each-following row px-3"
              onClick={() => {
                this.changeURL.call(this, user.username);
              }}
            >
              <div className="col-2">
                <img
                  className="img-fluid"
                  src={`${process.env.REACT_APP_API_ENDPOINT}` + "/" + user.url}
                />
              </div>
              <div className="col-10">
                <span>{user.name}</span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="each-following row px-3">
          <div className="col-12">
            <span>No Following</span>
          </div>
        </div>
      );
    return (
      <div className="following-holder-parent">
        <Typography variant="h6" gutterBottom>
          <Link to="/profile">
            <i className="fas fa-arrow-left" /> Followers
          </Link>
        </Typography>
        <div className="following-holder">
          <Scrollbars autoHeight autoHide autoHeightMax={400}>
            {ListOfUsers}
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(Following));
