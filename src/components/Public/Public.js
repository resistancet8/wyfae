import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Main from "./Main/Main";
import Competition from "./Competition/Competition";
import Trending from "./Trending/Trending";
import { connect } from "react-redux";
import { getPosts } from './../../actions/homepage_actions';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import navigationHome from "./../../helpers/navigation";
import './Public.css'

let rap = function () {
  return <div> Rap </div>
}

let rap1 = function () {
  return <div> Rap1 </div>
}




const styles = theme => ({
  root: {
    flexGrow: 1
  },
  public: {
    width: "100%",
    background: "#f9f9f9",
    padding: 10
  },
  fix: {
    position: 'absolute'
  }
});

class Public extends Component {

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="public-page p-2">
        <Grid container className={classes.root} spacing={8}>
          <Grid item xs={12} md={3} >
            <Competition className={classes.public} />
          </Grid>
          <Grid item xs={12} md={6}>
            {this.props.posts.length && navigationHome.map(route => {
              return <Route path={route.path} exact render={() => {
                return <Main posts={this.props.posts} className={classes.public} posts_tr={route.key} />
              }} key={route.key} />
            })}
          </Grid>
          <Grid item xs={12} md={3}>
            <Trending className={classes.public + " p-6"} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Public.propTypes = {
  posts: PropTypes.array
}

function mapStateToProps(state) {
  return {
    posts: state.home.posts
  }
}

export default withRouter(connect(mapStateToProps, { getPosts })(withStyles(styles)(Public)));
