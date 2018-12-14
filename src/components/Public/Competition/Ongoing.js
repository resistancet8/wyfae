import React, { Component } from "react";
import Participants from './Participants';
import axios from 'axios'
import Button from "@material-ui/core/Button";

class Ongoing extends Component {
  state = {
    ongoing: [],
    length: 0,
    show: 1
  };

  loadMore() {
    axios
      .post("http://159.89.171.16:9000/user/get_contest", {
        skip_count: this.state.length,
        compete_status: "ongoing"
      })
      .then(response => {
        let { ongoing } = response.data.all_content;
        this.setState((state) => {
          return {
            ongoing: [...state.ongoing, ...ongoing],
            length: state.length + ongoing.length,
            show: ongoing.length === 0 ? 0: 1
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    axios
      .post("http://159.89.171.16:9000/user/get_contest", {
        skip_count: 0,
        compete_status: "ongoing"
      })
      .then(response => {
        let { ongoing } = response.data.all_content;
        this.setState((state) => {
          return {
            ongoing,
            length: state.length + ongoing.length,
            show: ongoing.length === 0 ? 0: 1
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let ongoing = this.state.ongoing || [];

    let ongoingData = ongoing.length ? ongoing.map((obj) => {
      return <Participants data={obj} ongoing={1}/>
    }): <div> No Competitions </div>

    return (
      <div {...this.props}>
        <h4 className="font-weight-bold text-muted">Ongoing Competitions</h4>
        {ongoingData}
        {this.state.show && ongoing.length ? (
            <Button
              onClick={() => {
                this.loadMore();
              }}
              style={{
                width: "100%"
              }}
            >
              View more
            </Button>
          ) : (
            <div
              style={{ textAlign: "center", margin: "10px 0" }}
            >
              <span class="lead">No more posts</span>
            </div>
          )}
      </div>
    );
  }
}

export default Ongoing;
