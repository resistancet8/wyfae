import React, { Component } from "react";
import Participants from "./Participants";
import axios from "axios";

class Ongoing extends Component {
  state = {
    ongoing: []
  };

  componentDidMount() {
    axios
      .post("http://159.89.171.16:9000/user/get_contest", {
        skip_count: 0,
        compete_status: "finished"
      })
      .then(response => {
        let { finished } = response.data.all_content;
        this.setState({
          ongoing: finished
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let ongoing = this.state.ongoing.slice(0, 1) || [];

    let ongoingData = ongoing.length ? (
      ongoing.map(obj => {
        return <Participants data={obj} ongoing={1} />;
      })
    ) : (
      <div> No Competitions </div>
    );

    return (
      <div {...this.props}>
        <h4 className="font-weight-bold text-muted">Ongoing Competitions</h4>
        {ongoingData}
      </div>
    );
  }
}

export default Ongoing;
