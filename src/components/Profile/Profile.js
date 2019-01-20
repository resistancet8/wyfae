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
import { Scrollbars } from "react-custom-scrollbars";

class Profile extends Component {
  state = {
    memory_book_privacy: "",
  };

  componentDidMount() {
    this.setState({
      memory_book_privacy: this.props.user.memory_book_privacy,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      memory_book_privacy: props.user.memory_book_privacy,
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

  render() {
    let { user } = this.props;

    return (
      <div>
          <div className="home-wrapper">
            {/* user avatar,details and statistics */}
            <div className="row">
              <div className="col-md-3 bg-white">
                <div className="user-about-holder">
                  <Route
                    path="/profile"
                    exact
                    render={() => {
                      return (
                        <div style={{height: "100%"}}>
                          <Scrollbars autoHide autoWidth style={{height: "100%"}} id="scrollbar-c">
                              <User user={user}>
                                <div className="book-privacy">
                                  <label>Memory book privacy</label>
                                  <div className="custom-input-checkbox">
                                    <input type="checkbox" id="switch" checked={
                                          this.state.memory_book_privacy == "private" ? 1 : 0
                                        } onChange={() => {
                                          this.changeMemoryPrivacy(
                                            this.state.memory_book_privacy
                                          );
                                    }}/>
                                    <label for="switch"></label>
                                  </div>
                                </div>
                                <div className="followers d-flex justify-content-center align-items-center mt-4">
                                  <Button color="default">
                                    <Link to="/profile/data/following">
                                      {" "}
                                      {user.following
                                        ? user.following.length
                                        : 0} <br /> Following{" "}
                                    </Link>
                                  </Button>
                                </div>
                                {user && (
                                  <div className="edit-profile mt-3">
                                    <Link to={`/update/user`}>
                                      <Icon>edit</Icon>
                                    </Link>
                                  </div>
                                )}
                              </User>
                          </Scrollbars>
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

                </div>

                <div className="stats-holder mt-4">
                  {user.stats && <Stats stats={user.stats} />}
                </div>

              </div>
              <div className="col-md-6 timeline bg-secondary p-2">
                <Timeline />
              </div>
              <div className="col-md-3 bg-white p-4">
                <Quotes />
              </div>
            </div>
            {/* user about and thoughts, feelings row */}
            {/* <div className="row mt-2">
              <div className="col-md-8 bg-white border-left-overridden border-top-overridden feelings-holder">
                <Feelings />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6 bg-white border-top-overridden p-3">
                <Memory />
              </div>
            </div> */}
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
