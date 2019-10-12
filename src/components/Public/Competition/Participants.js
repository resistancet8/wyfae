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
import Timer from './../../../assets/img/timer.svg'

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

  componentDidMount() {
    if (this.props.upcoming || this.props.ongoing) {
      var time = this.props.upcoming
        ? this.props.data.start_time
        : this.props.data.end_time;

      var countDownDate = new Date(time + "Z").getTime();

      var x = setInterval(() => {
        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        var msg1 = this.props.ongoing ? "Ends in " : "Starts in ";
        // Display the result in the element with id="demo"
        if (document.getElementById(`comp-id-${this.props.data._id}`)) {
          document.getElementById(`comp-id-${this.props.data._id}`).innerText =
            msg1 + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        }

        // If the count down is finished, write some text
        if (distance < 0) {
          let msg = "";
          if (this.props.ongoing) {
            msg =
              "Competition Ended On <em>" +
              moment(time + "Z").format("MMMM Do YYYY") +
              " At " +
              moment(time + "Z").format("h:mm a") +
              "</em>";
          } else {
            msg =
              "Competition Started On <em>" +
              moment(time + "Z").format("MMMM Do YYYY") +
              " At " +
              moment(time + "Z").format("h:mm a") +
              "</em>";
          }

          clearInterval(x);
          if (document.querySelector(`#comp-id-${this.props.data._id}`))
            document.querySelector(
              `#comp-id-${this.props.data._id}`
            ).innerHTML = msg;
        }
      }, 1000);
    }
  }

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
            class={"each-participant " + this.props.comp}
            style={{
              marginBottom: "5px",
              position: "relative",
              background: "#ffcc0055"
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
          </Grid>
        );
      });

    let winner = "No winners";
    if (
      this.props.data.winner.users &&
      this.props.data.winner.users.length > 0
    ) {
      winner = this.props.data.winner.users.reduce(
        (acu, user) => user.author + ", " + acu,
        ""
      );
      winner = "The Winner Is " + winner.substr(0, winner.length - 2);
    } else {
      if (this.props.data.participants.length == 1) {
        winner =
          "No one decided to compete with " +
          this.props.data.participants[0]["author"];
      } else if (
        this.props.data.winner.users &&
        this.props.data.winner.users.length == 0
      ) {
        winner = this.props.data.winner.msg;
      } else {
        winner = "The Winner Is " + this.props.data.winner;
      }
    }

    let sharable_url = window.location.origin + `/shared/` + this.props.data._id;

    return (
      <div
        style={{
          background: "#fafafa",
          padding: "10px",
          margin: "10px 0",
          position: "relative"
        }} 
      >
        {true && (
          <div>
            <div
              class="fb-share-button float-right"
              data-href={sharable_url}
              data-layout="button"
              data-size="large"
              data-mobile-iframe="true"
            >
              <a
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  sharable_url
                )}&amp;src=sdkpreparse`}
                class="fb-xfbml-parse-ignore"
              >
                <i class="fab fa-facebook" />
              </a>
            </div>
            <a
              target="_blank"
              data-action="share/whatsapp/share"
              class="wa-share-button  float-right"
              href={`whatsapp://send?text=${encodeURIComponent(sharable_url)}`}
            >
              <i class="fab fa-whatsapp" aria-hidden="true" />
            </a>
            <a
              target="_blank"
              class="twitter-share-button  float-right"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                sharable_url
              )}`}
            >
              <i class="fab fa-twitter" />
            </a>
          </div>
        )}
        <span
          className="badge font-weight-normal text-capitalize"
          style={{background: "#0085f3", color: "white", fontSize: "1.06em"}}
        >
          {this.props.data.art_type}
        </span>
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
            <Card
              post={this.state.post}
              part_id={this.props.data._id}
              ongoing={this.props.ongoing}
              upcoming={this.props.upcoming}
              completed={this.props.completed}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {this.props.ongoing && (
          <div>
            <span class="ended" id={`comp-id-${this.props.data._id}`} />
            <img src={Timer} style={{height: "20px", marginLeft: "10px"}} alt=""/>
          </div>
        )}
        {this.props.upcoming && (
          <div>
            <span class="ended" id={`comp-id-${this.props.data._id}`} />
            <img src={Timer} style={{height: "20px", marginLeft: "10px"}} alt=""/>
          </div>
        )}
        {this.props.completed && (
          <div>
            Competition Ended On{" "}
            <em>
              {moment(this.props.data.start_time + "Z").format("MMMM Do YYYY")}
            </em>{" "}
            at{" "}
            <em>{moment(this.props.data.start_time + "Z").format("h:mm a")}</em>{" "}
            <br />
            <em>{winner}</em> 
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
