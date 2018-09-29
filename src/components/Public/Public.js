import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Main from "./Main/Main";
import Competition from "./Competition/Competition";
import Trending from "./Trending/Trending";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  public: {
    height: 140,
    width: "100%",
    background: "#f9f9f9",
    padding: 10
  }
});

class Public extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className="public-page p-2">
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12} md={2}>
            <Competition className={classes.public} />
          </Grid>
          <Grid item xs={12} md={7}>
            <Main className={classes.public} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Trending className={classes.public} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Public);
