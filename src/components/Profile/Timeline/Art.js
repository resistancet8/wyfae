import React, { Component } from "react";
import truncate from "truncate";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import moment from "moment";
import Comments from "../../Public/Main/Comments";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  heading1: {
    width: "100%"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  media: {
    marginTop: "30",
    height: "50%",
    paddingTop: "56.25%",
    backgroundSize: "contain"
  }
});

class Art extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes, arts } = this.props;
    const { expanded } = this.state;

    let type = "";

    let Arts = arts.map((art, index) => {
      if (art.shared_type == "share") {
        type = "Shared";
      } else if (art.shared_type == "anonymous") {
        type = "Shared Anonymously";
      } else if (art.shared_type == "save") {
        type = "Saved";
      } else {
        type = art.shared_type;
      }
      let likes = art.likes ? art.likes:  art.participants && art.participants.length ? art.participants[0].likes: 0;

      return (
        <div key={index} className="bg-white p-3 mb-2 art-holder">
          <span class="float-right badge badge-primary rounded font-weight-bold">
            {type}
          </span>
          <h2
            className="font-weight-bold font-italic text-uppercase "
            style={{ width: "80%" }}
          >
            {art.post_title}
          </h2>
          {art.url && (
            <div className="img-responsive">
              <img
                src={`${process.env.REACT_APP_API_ENDPOINT}/${art.url}`}
                alt="Image"
                className="img-fluid"
              />
            </div>
          )}
          <p>{truncate(art.text, 250)}</p>
          <div className="mt-2">
            <Button
              variant="outlined"
              onClick={() => {
                this.props.modalToggle(art);
              }}
            >
              Read More
            </Button>
          </div>
          <small className="font-italic font-weight-bold">
            Category: {art.art_type}
          </small>
          <br />
          <small className="font-italic font-weight-bold">
            By: {art.author}
          </small>
          <br />
          <small className="font-italic font-weight-bold">
            Posted On: {moment(art.creation_time).format("DD/MM/YYYY")}
          </small>
          <div className="mt-2">
            {!this.props.userpage && (
              <Button
                variant="contained"
                color="secondary"
                onClick={this.props.deletePost.bind(this, art._id, "art")}
              >
                Delete
              </Button>
            )}
          </div>
          <p className="my-2">{likes} Likes</p>
          {art.comments && (
            <ExpansionPanel
              expanded={expanded === art._id}
              onChange={this.handleChange(art._id)}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Comments ({art.comments.length})
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div classes={classes.root}>
                  <List id={`comment-list-${art._id}`}>
                    {art.comments &&
                      art.comments.map(comment => {
                        return <Comments comment={comment} />;
                      })}
                    {this.state.newComment}
                  </List>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}
        </div>
      );
    });
    return <div>{Arts}</div>;
  }
}

export default withStyles(styles)(Art);
