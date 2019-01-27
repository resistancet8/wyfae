import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
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
        <h3 className="font-weight-bold">COMPETITIONS</h3>
        <div
          style={{
            padding: "10px"
          }}
        >
          <div className={`comp-link ${this.props.location.pathname.indexOf('ongoing') > 0 ? "active": ""}`}>
            <Link to="/trending/ongoing">Ongoing</Link>
          </div>
          <div className={`comp-link ${this.props.location.pathname.indexOf('upcoming') > 0 ? "active": ""}`}>
            <Link to="/trending/upcoming">Upcoming</Link>
          </div>
          <div className={`comp-link ${this.props.location.pathname.indexOf('completed') > 0 ? "active": ""}`}>
            <Link to="/trending/completed">Completed</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Competition);
