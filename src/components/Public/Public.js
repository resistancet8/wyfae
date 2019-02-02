import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Main from "./Main/Main";
import Competition from "./Competition/Competition";
import Trending from "./Trending/Trending";
import { connect } from "react-redux";
import { getPosts, getMore } from "./../../actions/homepage_actions";
import PropTypes from "prop-types";
import { Route, withRouter, Link } from "react-router-dom";
import navigationHome from "./../../helpers/navigation";
import Ongoing from "./Competition/Ongoing";
import Completed from "./Competition/Completed";
import Upcoming from "./Competition/Upcoming";
import Button from "@material-ui/core/Button";
import "./Public.css";
import BackgroundDots from './../../assets/img/sidecircle.svg';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  public: {
    width: "100%",
  },
  trend: {
    width: "100%",
  },
  comp: {
    width: "100%",
  },
  fix: {
    position: "absolute"
  }
});

class Public extends Component {
  state = {
    len: 0,
    clicked: 0
  };

  componentDidMount() {
    this.props.getPosts();
  }

  componentWillReceiveProps(props) {
    if (this.state.len == props.posts.length && this.state.clicked) {
      this.setState({
        hideShowMore: 1
      });
    } else {
      this.setState({
        len: props.posts.length,
        clicked: 0
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="public-page" style={{backgroundImage:`url(${BackgroundDots})`}}>
        <Grid container className={classes.root} spacing={8}>
          <Grid item xs={12} md={3}>
            <div className="comp-holder">
              <Competition className={classes.comp + " border p-3 rounded"} />
              <div style={{margin: "10px 0"}}></div>
              <div className="border rounded" style={{
                width: "100%",
                border: "#fff",
                padding: 10
              }}>
                <div className="legal-link"><Link to="/usage">Terms of Use</Link></div>
                <div className="legal-link"><Link to="/privacy">Privacy Policy</Link></div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            {this.props.posts.length ? (
              navigationHome.map(route => {
                return (
                  <Route
                    path={route.path}
                    exact
                    render={() => {
                      return (
                        <div style={{padding: "0 100px"}}>
                          <Main
                            posts={this.props.posts}
                            className={classes.public}
                            posts_tr={route.key}
                          /> 
                          {!this.state.hideShowMore ? (
                            <Button
                              onClick={() => {
                                this.setState({
                                  clicked: 1
                                })
                                this.props.getMore(this.props.posts.length);
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
                    }}
                    key={route.key}
                  />
                );
              })
            ) : (
              <div className={classes.public}>No Posts</div>
            )}
            {/* competetion routes */}
            <Route exact path="/trending/upcoming" component={Upcoming} />
            <Route exact path="/trending/completed" component={Completed} />
            <Route exact path="/trending/ongoing" component={Ongoing} />
          </Grid>
          <Grid item xs={12} md={3}>
            <div className="trend-links">
              <Trending className={classes.trend + " p-3 border rounded"} />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Public.propTypes = {
  posts: PropTypes.array
};

function mapStateToProps(state) {
  return {
    posts: state.home.posts
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getPosts, getMore }
  )(withStyles(styles)(Public))
);
