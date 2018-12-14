import React, { Component } from "react";
import axios from "axios";
import Participants from './Participants'
import Button from "@material-ui/core/Button";

class Completed extends Component {
  state = {
    finished: [],
    length: 0,
    show: 1
  };

  componentDidMount() {
    axios
      .post("http://159.89.171.16:9000/user/get_contest", {
        skip_count: 0,
        compete_status: "finished"
      })
      .then(response => {
        let { finished } = response.data.all_content;
        this.setState((state) => {
          return {
            finished,
            length: state.length + finished.length,
            show: finished.length === 0 ? 0: 1
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  loadMore() {
    axios
      .post("http://159.89.171.16:9000/user/get_contest", {
        skip_count: this.state.length,
        compete_status: "finished"
      })
      .then(response => {
        let { finished } = response.data.all_content;
        this.setState((state) => {
          return {
            finished: [...state.finished, ...finished],
            length: state.length + finished.length,
            show: finished.length === 0 ? 0: 1
          };
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
        return obj.post_type !== 'memory_book' && <Participants data={obj} completed={1}/> 
      })
    ) : (
      <div> No Competitions </div>
    );

    return (
      <div {...this.props}>
        <h4 className="font-weight-bold text-muted">Completed Competitions</h4>
        {CompletedData}
        {this.state.show && completed.length ? (
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

export default Completed;
