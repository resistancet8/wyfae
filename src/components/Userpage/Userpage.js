import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import axios from "axios";
import User from "./../Profile/User";
import Stats from "./../Profile/Statistics";
import About from "./../Profile/About";
import Feelings from "./../Profile/Feelings/Feelings";
import Memory from "./../Profile/Memory-Quotes/Memory";
import Quotes from "./../Profile/Memory-Quotes/Quotes/Quotes";
import Timeline from "./../Profile/Timeline/Timeline";

class Userpage extends Component {
  state = {
    user: {},
    memory_book: [],
    art_content: []
  };

  componentDidMount() {
    axios
      .post(`http://159.89.171.16:9000/user/get_profile`, {
        profile_username: this.props.match.params.username || "",
        skip_count: 0
      })
      .then(response => {
        this.setState({
          user: response.data ? response.data.profile_data : {},
          memory_book: response.data ? response.data.memory_book : [],
          art_content: response.data ? response.data.art_content : []
        });
      });
  }
  render() {
    let { user } = this.state;
    return (
      <div>
        <div className="home-wrapper bg-secondary px-4 py-2 mb-1">
          {/* user avatar,details and statistics */}
          <div className="row">
            <div className="col-md-4 bg-white p-3">
              {user && <User user={user} userpage={1} />}
            </div>
            <div className="col-md-8 bg-white border-left-overridden border-top-overridden p-3">
              {user.stats && <Stats stats={user.stats} userpage={1} />}
            </div>
          </div>
          {/* user about and thoughts, feelings row */}
          <div className="row mt-2">
            <div className="col-md-4 bg-white p-3 px-5">
              {user && <About user={user} userpage={1} />}
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

export default withRouter(Userpage);
