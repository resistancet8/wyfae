import React, { Component } from "react";
import axios from "axios";
import { reset } from "redux-form";
import Slider from "./Slider";
import Participants from "./Participants";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import CompeteLogo from './../../../assets/img/startbadge.svg'
class Upcoming extends Component {
  state = {
    upcoming: [],
    slider: 0,
    part_id: null,
    length: 0,
    show: 1
  };

  loadMore() {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/get_contest", {
        skip_count: this.state.length,
        compete_status: "upcoming"
      })
      .then(response => {
        let { upcoming } = response.data.all_content;
        this.setState(state => {
          return {
            upcoming: [...state.upcoming, ...upcoming],
            length: state.length + upcoming.length,
            show: upcoming.length === 0 ? 0 : 1
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
        compete_status: "upcoming"
      })
      .then(response => {
        let { upcoming } = response.data.all_content;
        this.setState(state => {
          return {
            upcoming,
            length: state.length + upcoming.length,
            show: upcoming.length === 0 ? 0 : 1
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  submitArt(formData) {
    formData.append("post_id", this.state.part_id);
    this.props.dispatch({ type: "SHOW_TOAST", payload: "Working..." });
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_ENDPOINT}` + "/user/join_contest",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        this.props.dispatch({ type: "SHOW_TOAST", payload: "Success" });
        this.props.dispatch(reset("art-form"));
        window.location.reload();
      })
      .catch(err => {
        this.props.dispatch({
          type: "SHOW_TOAST",
          payload: err.response.data ? err.response.data.msg : "Errored!"
        });
      });
  }

  toggleDrawer = (state, part_id) => {
    this.setState(prestate => {
      return {
        slider: state,
        part_id
      };
    });
  };

  render() {
    let upcoming = this.state.upcoming || [];

    let upcomingData = upcoming.length ? (
      upcoming.map(obj => {
        return (
          <Participants
            data={obj}
            flag={true}
            toggleDrawer={this.toggleDrawer}
            upcoming={1}
            comp="upcoming"
          />
        );
      })
    ) : (
      <div> No Competitions </div>
    );

    return (
      <div {...this.props}>
        <div>
          <img style={{height: "55px"}} src={CompeteLogo} alt=""/>
          <span className="font-weight-bold text-muted title-comp">Upcoming Competitions</span>
        </div>
        {upcomingData}
        {upcoming.length != 0 && (
          <div>
            {this.state.show && upcoming.length ? (
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
        <Slider
          slider={this.state.slider}
          toggleDrawer={this.toggleDrawer}
          part_id={this.state.part_id}
          submitArt={this.submitArt.bind(this)}
        />
      </div>
    );
  }
}

export default connect()(Upcoming);
