import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import axios from "axios";
import User from "./../Profile/User";
import Stats from "./../Profile/Statistics";
import About from "./../Profile/About";
import Timeline from "./../Profile/Timeline/Timeline";
import Quotes from './../Profile/Memory-Quotes/Quotes/Quotes';

class Userpage extends Component {
  constructor() {
    super();
  }

  state = {
    user: {},
    memory_book: [],
    art_content: [],
    following: 0,
    username: "",
    quotes_user: []
  };

  fetchUserData() {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/user/get_profile`, {
        profile_username: this.props.match.params.username || "",
        skip_count: 0
      })
      .then(response => {
        let obj = {
          user: response.data ? response.data.profile_data : {},
          memory_book: response.data ? response.data.memory_book : [],
          art_content: response.data ? response.data.art_content : []
        };

        if (
          this.props.user.following &&
          this.props.user.following.length > 0 &&
          this.props.user.following.includes(
            this.props.match.params.username.trim()
          )
        ) {
          this.setState({
            ...obj,
            following: 1,
            username: this.props.match.params.username
          });
        }

        this.setState({
          ...obj,
          username: this.props.match.params.username
        });
      })
      .catch(err => {
        if (err.response)
          this.props.dispatch({
            type: "SHOW_TOAST",
            payload: err.response.data.msg || "Error"
          });
      });
  }

  componentDidMount() {
    axios
    .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/get_journal", {
      profile_username: this.props.match.params.username,
      limit_count: 10,
      skip_count: 0,
      journal_type: "quotes"
    })
    .then(d => {
      this.setState(state => {
        return {
          ...state,
          quotes_user: d.data.journal_content
        };
      });
    })
    .catch(err => {
      if (err.response)
        this.props.dispatch({
          type: "SHOW_TOAST",
          payload: err.response.data.msg || "Error"
        });
    });

    this.fetchUserData.call(this);
    if (
      this.props.user.following &&
      this.props.user.following.length > 0 &&
      this.props.user.following.includes(
        this.props.match.params.username.trim()
      )
    ) {
      this.setState({
        following: 1
      });
    }
  }

  followUnfollow(signal) {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/follow", {
        username: this.props.match.params.username,
        signal_type: signal
      })
      .then(d => {
        this.setState(state => {
          return {
            following: !state.following
          };
        });
      })
      .catch(err => {
        if (err.response)
          this.props.dispatch({
            type: "SHOW_TOAST",
            payload: err.response.data.msg || "Error"
          });
      });
  }

  componentWillReceiveProps(props) {
    if (
      props.user.following &&
      props.user.following.length > 0 &&
      props.user.following.includes(props.match.params.username.trim())
    ) {
      this.setState({
        following: 1
      });
    } else {
      this.setState({
        following: 0
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      this.fetchUserData.call(this);
    }
  }

  render() {
    let { user, following } = this.state;

    if (
      this.props.match.params.username &&
      this.props.match.params.username == this.props.auth.user.username
    ) {
      return <Redirect to="/profile" />;
    }

    return (
      <div>
        <div className="home-wrapper bg-secondary px-4 py-2 mb-1">
          {/* user avatar,details and statistics */}
          <div className="row">
            <div className="col-md-4 bg-white p-3">
              {user && <User user={user} userpage={1} />}
              <div className="follow d-flex justify-content-center align-items-center mt-4">
                <Button
                  onClick={this.followUnfollow.bind(
                    this,
                    following ? "un-follow" : "follow"
                  )}
                  variant="outlined"
                  className="mr-2 mb-2 font-weight-normal"
                >
                  <i
                    className={`fas ${
                      following ? "fa-user-minus" : "fa-user-plus"
                    } mx-2`}
                  />
                  {following ? "Unfollow" : "Follow"}
                </Button>
              </div>
            </div>
            <div className="col-md-8 bg-white border-left-overridden border-top-overridden p-3">
              {user.stats && <Stats stats={user.stats} userpage={1} />}
            </div>
          </div>
          {/* user about and thoughts, feelings row */}
          <div className="row mt-2">
            <div className="col-md-6 bg-white p-3 px-5">
              {user && <About user={user} userpage={1} />}
            </div>
            <div className="col-md-6 bg-white p-3 px-5 border-left-overridden border-top-overridden ">
              {user && <Quotes quotess={this.state.quotes_user} userpage={1} />}
            </div>
          </div>
        </div>
        <div className="timeline bg-secondary p-2">
          <Timeline
            userpage={1}
            userpage_posts={{
              memory: this.state.memory_book,
              arts: this.state.art_content
            }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user.user
  };
}

export default withRouter(connect(mapStateToProps)(Userpage));
