import React, { Component } from "react";
import axios from "axios";
import Participants from "./Participants";
import Button from "@material-ui/core/Button";
import CompeteLogo from './../../../assets/img/startbadge.svg'

class Completed extends Component {
  state = {
    finished: [],
    length: 0,
    show: 1
  };

  componentDidMount() {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/get_contest", {
        skip_count: 0,
        compete_status: "finished"
      })
      .then(response => {
        let { finished } = response.data.all_content;
        this.setState(state => {
          return {
            finished,
            length: state.length + finished.length,
            show: finished.length === 0 ? 0 : 1
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  loadMore() {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/get_contest", {
        skip_count: this.state.length,
        compete_status: "finished"
      })
      .then(response => {
        let { finished } = response.data.all_content;
        this.setState(state => {
          return {
            finished: [...state.finished, ...finished],
            length: state.length + finished.length,
            show: finished.length === 0 ? 0 : 1
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
        return (
          obj.post_type !== "memory_book" && (
            <Participants data={obj} completed={1} />
          )
        );
      })
    ) : (
      <div> No Competitions </div>
    );

    return (
      <div {...this.props}>
        <div>
          <img style={{height: "55px"}} src={CompeteLogo} alt=""/>
          <span className="font-weight-bold text-muted title-comp">Completed Competitions</span>
        </div>
        {CompletedData}
        {completed.length != 0 && (
          <div>
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
              <div style={{ textAlign: "center", margin: "10px 0" }}>
                <span class="lead">No more competitions</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Completed;
