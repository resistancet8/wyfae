import React, { Component } from "react";
import axios from "axios";
import { reset } from "redux-form";
import Slider from "./Slider";
import Participants from "./Participants";
import { connect } from "react-redux";

class Upcoming extends Component {
  state = {
    upcoming: [],
    slider: 0,
    part_id: null
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

  submitArt(formData) {
    formData.append("post_id", this.state.part_id);
    this.props.dispatch({ type: "SHOW_TOAST", payload: "Working..." });
    axios({
      method: "post",
      url: "http://159.89.171.16:9000/user/join_contest",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        this.props.dispatch({ type: "SHOW_TOAST", payload: "Success" });
        this.props.dispatch(reset("art-form"));
      })
      .catch(err => {
        this.props.dispatch({ type: "SHOW_TOAST", payload: err.response.data ?  err.response.data.msg: "Errored!" });
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
          />
        );
      })
    ) : (
      <div> No Competitions </div>
    );

    return (
      <div {...this.props}>
        <h4 className="font-weight-bold text-muted">Upcoming Competitions</h4>
        {upcomingData}
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
