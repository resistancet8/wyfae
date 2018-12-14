import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Competition.css";

class Competition extends Component {
  componentDidMount() {
    // axios.post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/get_contest", {
    //   "skip_count":0,
    //   "compete_status": "all"
    // })
    // .then(response => {
    //   let { finshed, ongoing, upcoming } = response.data.all_content;
    //   this.setState({
    //     finished: finshed,
    //     ongoing,
    //     upcoming
    //   })
    // })
    // .catch(err => {
    //   console.log(err)
    // });
  }

  render() {
    return (
      <div {...this.props}>
        <h3 className="font-weight-bold">Competitions</h3>
        <div
          style={{
            padding: "10px"
          }}
        >
          <div>
            <Link to="/trending/ongoing">Ongoing</Link>
          </div>
          <div>
            <Link to="/trending/upcoming">Upcoming</Link>
          </div>
          <div>
            <Link to="/trending/completed">Completed</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Competition;
