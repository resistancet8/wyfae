import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Main from "./Main/Main";
import Competition from "./Competition/Competition";
import Trending from "./Trending/Trending";
import { connect } from "react-redux";
import { getPosts } from './../../actions/homepage_actions';
import PropTypes from 'prop-types';
import './Public.css'

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

  componentDidMount(){
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
            {this.props.posts && <Main className={classes.public} posts={this.props.posts}/>}
          </Grid>
          <Grid item xs={12} md={3}>
            <Trending className={classes.public} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Public.propTypes = {
  posts: PropTypes.array
}

function mapStateToProps(state){
  return {
    posts: state.home.posts
  }
}

export default connect(mapStateToProps, { getPosts })(withStyles(styles)(Public));
