import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Profile.css";
import Icon from "@material-ui/core/Icon";
import User from "./User";
import Stats from "./Statistics";
import About from "./About";
import Feelings from "./Feelings/Feelings";
import Memory from "./Memory-Quotes/Memory";
import Quotes from "./Memory-Quotes/Quotes/Quotes";
import Timeline from "./Timeline/Timeline";
import Button from "@material-ui/core/Button";
import Following from "./Following";
import axios from "axios";

class Profile extends Component {
  state = {
    memory_book_privacy: ""
  };

  componentWillReceiveProps(props) {
    this.setState({
      memory_book_privacy: props.user.memory_book_privacy
    });
  }

  changeMemoryPrivacy(memory_book_privacy) {
    axios
      .post("http://159.89.171.16:9000/user/update_about", {
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
        <div className="home-wrapper bg-secondary px-4 py-2 mb-1">
          {/* user avatar,details and statistics */}
          <div className="row first-row-holder">
            <div className="col-md-4 bg-white p-3">
              <Route
                path="/profile"
                exact
                render={() => {
                  return (
                    <div>
                      <User user={user} />
                      <div class="custom-control custom-checkbox text-center">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="memory-book-privacy"
                          checked={
                            this.state.memory_book_privacy == "private" ? 1 : 0
                          }
                          onChange={() => {
                            this.changeMemoryPrivacy(
                              this.state.memory_book_privacy
                            );
                          }}
                        />
                        <label
                          class="custom-control-label"
                          for="memory-book-privacy"
                        >
                          Memory book privacy
                        </label>
                      </div>

                      <div className="followers d-flex justify-content-center align-items-center mt-4">
                        <Button color="default">
                          <Link to="/profile/data/following">
                            {" "}
                            221 <br /> Following{" "}
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
            <div className="col-md-8 bg-white border-left-overridden border-top-overridden p-3">
              {user.stats && <Stats stats={user.stats} />}
            </div>
          </div>
          {/* user about and thoughts, feelings row */}
          <div className="row mt-2">
            <div className="col-md-4 bg-white p-3 px-5">
              {user && <About user={user} />}
            </div>
            <div className="col-md-8 bg-white border-left-overridden border-top-overridden p-3">
              <Feelings />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6 bg-white border-top-overridden p-3">
              <Memory />
            </div>
            <div className="col-md-6 bg-white border-left-overridden border-top-overridden px-5 py-3">
              <Quotes />
            </div>
          </div>
        </div>
        <div className="timeline bg-secondary p-2">
          <Timeline />
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

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(Profile)
);
