import React, { Component } from "react";
import Participants from "./Participants";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CompeteLogo from './../../../assets/img/startbadge.svg'

class Ongoing extends Component {
  state = {
    ongoing: [],
    length: 0,
    show: 1
  };

  loadMore() {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/get_contest", {
        skip_count: this.state.length,
        compete_status: "ongoing"
      })
      .then(response => {
        let { ongoing } = response.data.all_content;
        this.setState(state => {
          return {
            ongoing: [...state.ongoing, ...ongoing],
            length: state.length + ongoing.length,
            show: ongoing.length === 0 ? 0 : 1
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/get_contest", {
        skip_count: 0,
        compete_status: "ongoing"
      })
      .then(response => {
        let { ongoing } = response.data.all_content;
        this.setState(state => {
          return {
            ongoing,
            length: state.length + ongoing.length,
            show: ongoing.length === 0 ? 0 : 1
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let ongoing = this.state.ongoing || [];

    let ongoingData = ongoing.length ? (
      ongoing.map(obj => {
        return <Participants data={obj} ongoing={1} comp="ongoing"/>;
      })
    ) : (
      <div> No Competitions </div>
    );

    return (
      <div {...this.props}>
        <div>
          <img style={{height: "55px"}} src={CompeteLogo} alt=""/>
          <span className="font-weight-bold text-muted title-comp">Vote your favorite author</span>
        </div>
        {ongoingData}
        {ongoing.length != 0 && (
          <div>
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

export default Ongoing;
