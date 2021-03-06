import React, { Component } from "react";
import Participants from "./Participants";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Ongoing extends Component {
  state = {
    ongoing: [],
    post: {}
  };

  componentDidMount() {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/get_single_post", {
        post_id: this.props.match.params.comp_id
      })
      .then(response => {
        let post = response.data.post_data || {};
        this.setState({
          post
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let competeData = Object.keys(this.state.post).length > 0 && this.state.post["_id"].length ? (
      <Participants data={this.state.post} ongoing={this.state.post.compete_status == 'ongoing' ? 1: false} completed={this.state.post.compete_status == "finished" ? 1: false} upcoming={this.state.post.compete_status == "upcoming" ? 1: false}/>
    ) : (
      <div>No such competetion</div>
    );

    return (
      <div {...this.props} className="container">
        {competeData}
      </div>
    );
  }
}

export default withRouter(Ongoing);
