import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Profile.css";
import Icon from "@material-ui/core/Icon";
import User from "./User";
import Stats from "./Statistics";
import Feelings from "./Feelings/Feelings";
import Memory from "./Memory-Quotes/Memory";
import Quotes from "./Memory-Quotes/Quotes/Quotes";
import Timeline from "./Timeline/Timeline";
import Button from "@material-ui/core/Button";
import Following from "./Following";
import axios from "axios";
import SliderMemory from "./SliderMemory";

class Profile extends Component {
  state = {
    memory_book_privacy: "",
    slider: 0
  };

  componentDidMount() {
    this.setState({
      memory_book_privacy: this.props.user.memory_book_privacy
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      memory_book_privacy: props.user.memory_book_privacy
    });
  }

  changeMemoryPrivacy(memory_book_privacy) {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/update_about", {
        memory_book_privacy:
          memory_book_privacy == "private" ? "public" : "private"
      })
      .then(e => {
        this.setState({
          memory_book_privacy:
            memory_book_privacy == "private" ? "public" : "private"
        });
      });
  }

  toggleDrawer = state => {
    this.setState(prestate => {
      return {
        slider: state
      };
    });
  };

  render() {
    let { user } = this.props;

    return (
      <div>
        <div className="home-wrapper">
          {/* user avatar,details and statistics */}
          <div className="row">
            <div className="col-md-3 bg-white">
              <div style={{padding: "0 45px 0 10px"}} className="sticky-top remove-padding">
                <div className="user-about-holder">
                  <Route
                    path="/profile"
                    exact
                    render={() => {
                      return (
                        <div style={{ height: "100%" }}>
                          <User user={user}>
                          {user && (
                              <div className="edit-profile">
                                <Link to={`/update/user`}>
                                  <Icon>edit</Icon>
                                </Link>
                              </div>
                            )}
                            <div className="book-privacy">
                              <label className="m-0">Memory book privacy</label>
                              <div className="custom-input-checkbox">
                                <input
                                  type="checkbox"
                                  id="switch"
                                  checked={
                                    this.state.memory_book_privacy == "private"
                                      ? 1
                                      : 0
                                  }
                                  onChange={() => {
                                    this.changeMemoryPrivacy(
                                      this.state.memory_book_privacy
                                    );
                                  }}
                                />
                                <label for="switch" className="m-0"/>
                              </div>
                            </div>
                            <div className="followers d-flex justify-content-center align-items-center">
                              <Button color="default">
                                <Link to="/profile/data/following">
                                  {" "}
                                  {user.following
                                    ? user.following.length
                                    : 0}{" "}
                                  <br /> Following{" "}
                                </Link>
                              </Button>
                            </div>
                          </User>
                        </div>
                      );
                    }}
                  />

                  <Route
                    path="/profile/data/following"
                    render={() => {
                      return <Following />;
                    }}
                  />

                  {user.stats && <Stats stats={user.stats} />}
                </div>
              </div>
            </div>
            <div className="col-md-5 timeline h-100">
              <div style={{ padding: "0 1rem" }} className="remove-padding">
                <Feelings />
                <Timeline />
              </div>
            </div>
            <div
              className="col-md-4 h-100 sticky-top remove-padding"
              style={{ padding: "0 50px" }}
            >
              <div
                className="border"
                style={{ padding: "10px 25px", borderRadius: "6px" }}
              >
                <Quotes />
              </div>
            </div>
          </div>
          <SliderMemory
            slider={this.state.slider}
            toggleDrawer={this.toggleDrawer}
          />
          <div className="create-memory">
            <button
              onClick={() => {
                this.toggleDrawer(true);
              }}
            >
              <i class="fas fa-plus" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

export default withRouter(connect(mapStateToProps)(Profile));
