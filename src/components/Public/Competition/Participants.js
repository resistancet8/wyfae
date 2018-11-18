import React, { Component } from "react";
import Icon from '@material-ui/core/Icon';
import truncate from "truncate";
import Grid from "@material-ui/core/Grid";

class Participants extends Component {
  render() {
    let data = this.props.data.participants || [];
    let flag = 0;
    if (data.length < 3) {
      flag = 1;
    }

    if (!data.length) return;
    let AllParts =
      data.length &&
      data.map((obj, index) => {
        return (
          <Grid
            container
            alignItems="center"
            justify="center"
            xs={2}
            class="each-participant"
          >
            <p style={{padding: 0, margin: 0}}>
              {truncate(obj.post_title || "No title", 30)}
            </p>
            <p style={{padding: 0, margin: 0, fontWeight: "bold"}}>{obj.author.split(" ")[0]}</p>
          </Grid>
        );
      });

    return (
      <div
        style={{
          background: "#fafafa",
          padding: "10px",
          margin: "10px 0"
        }}
      >
        <h3 className="font-weight-bold" style={{
          textTransform: "capitalize"
        }}>{this.props.data.art_type}</h3>
        <Grid
          container
          spacing={0}
          style={{
            width: "100%",
            padding: "6px"
          }}
        >
          {AllParts}
          {flag && (
            <Grid
              container
              alignItems="center"
              justify="center"
              xs={2}
              className="participate-new"
            >
              <Icon fontSize="large" className="add-icon">add</Icon>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default Participants;
