import React, { Component } from "react";
import axios from 'axios';
import Participants from "./Participants";

class Upcoming extends Component {
  state = {
    upcoming: []
  };

  componentDidMount() {
    axios
      .post("http://159.89.171.16:9000/user/get_contest", {
        skip_count: 0,
        compete_status: "upcoming"
      })
      .then(response => {
        let { upcoming } = response.data.all_content;
        this.setState({
          upcoming
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let upcoming = this.state.upcoming || [];

    let upcomingData = upcoming.length ? upcoming.map((obj) => {
      return <Participants data={obj}/> 
    }): <div> No Competitions </div>

    return (
      <div {...this.props}>
        <h4 className="font-weight-bold text-muted">Upcoming Competitions</h4>
        {upcomingData}
      </div>
    );
  }
}

export default Upcoming;
