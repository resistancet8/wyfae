import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
import truncate from "truncate";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import moment from "moment";
import Card from "./Card";

class Participants extends Component {
  state = {
    open: false,
    post: {}
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;

    let data = this.props.data.participants || [];
    if (!data.length) return;

    data[0].post_title = this.props.data.post_title;

    let flag = 0;
    if (data.length < 3) {
      flag = 1;
    }

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
            style={{
              marginBottom: "5px",
              position: "relative"
            }}
            onClick={() => {
              this.setState(
                {
                  post: obj
                },
                () => {
                  this.handleClickOpen();
                }
              );
            }}
          >
            <p style={{ padding: 0, margin: 0 }}>
              {truncate(obj.post_title || "No title", 15)}
            </p>
            <p style={{ padding: 0, margin: 0, fontWeight: "bold" }}>
              {obj.author.split(" ")[0]}
            </p>
            <div class="info-icons-participant">
              <div>
                <Icon>favorite</Icon>
                <span>{obj.likes}</span>
              </div>
              <div>
                <Icon>comment</Icon>
                <span>{obj.total_comments}</span>
              </div>
            </div>
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
        <h3
          className="font-weight-bold"
          style={{
            textTransform: "capitalize"
          }}
        >
          {this.props.data.art_type}
        </h3>
        <Grid
          container
          spacing={0}
          style={{
            width: "100%",
            padding: "6px"
          }}
        >
          {AllParts}
          {this.props.flag && flag ? (
            <Grid
              container
              alignItems="center"
              justify="center"
              xs={2}
              className="participate-new"
              style={{
                marginBottom: "5px",
                minWidth: "100px"
              }}
              onClick={() => {
                this.props.toggleDrawer(true, this.props.data._id);
              }}
            >
              <Icon fontSize="large" className="add-icon">
                add
              </Icon>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <Card post={this.state.post} part_id={this.props.data._id} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {this.props.ongoing && (
          <div>
            Competition Ends On{" "}
            <em>{moment(this.props.data.end_time).format("MMMM Do YYYY")}</em>{" "}
            at <em>{moment(this.props.data.end_time).format("h:mm a")}</em>
          </div>
        )}
        {this.props.upcoming && (
          <div>
            Competition Starts On{" "}
            <em>{moment(this.props.data.start_time).format("MMMM Do YYYY")}</em>{" "}
            at <em>{moment(this.props.data.start_time).format("h:mm a")}</em>
          </div>
        )}
        {this.props.completed && (
          <div>
            Competition Ended On{" "}
            <em>{moment(this.props.data.start_time).format("MMMM Do YYYY")}</em>{" "}
            at <em>{moment(this.props.data.start_time).format("h:mm a")}</em>{" "}
            <br />
            The Winner Is <em>{this.props.data.winner}</em>
          </div>
        )}
      </div>
    );
  }
}

Participants.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(Participants);
