import React, { Component } from "react";
import axios from "axios";
import Participants from './Participants'

class Completed extends Component {
  state = {
    finished: []
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
          finished
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    let completed = this.state.finished || [];

    let CompletedData = completed.length ? (
      completed.map(obj => {
        return obj.post_type !== 'memory_book' && <Participants data={obj}/> 
      })
    ) : (
      <div> No Competitions </div>
    );

    return (
      <div {...this.props}>
        <h4 className="font-weight-bold text-muted">Completed Competitions</h4>
        {CompletedData}
      </div>
    );
  }
}

export default Completed;
