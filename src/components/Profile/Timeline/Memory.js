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
import Comments from '../../Public/Main/Comments';
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

class Memory extends Component {
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
    const { classes, memories } = this.props;
    const { expanded } = this.state;

    let type = "";

    let Memories = memories.map((memory, index) => {
      if (memory.shared_type == "share") {
        type = "Shared";
      } else if (memory.shared_type == "anonymous") {
        type = "Shared Anonymously";
      } else if (memory.shared_type == "save") {
        type = "Saved";
      } else {
        type = memory.shared_type;
      }

      return (
        <div key={index} className="bg-white p-3 mb-2 memory-holder">
          <span class="float-right badge badge-primary rounded font-weight-bold">
            {type}
          </span>
          <h2 className="font-weight-bold font-italic text-uppercase">
            {memory.post_title}
          </h2>
          {memory.url && (
            <div className="img-responsive">
              <img
                src={`http://159.89.171.16:9000/${memory.url}`}
                alt="Image"
              />
            </div>
          )}
          <p>{truncate(memory.text, 250)}</p>
          <div className="mt-2">
            <Button
              variant="outlined"
              onClick={() => {
                this.props.modalToggle(memory);
              }}
            >
              Read More
            </Button>
          </div>
          <small className="font-italic font-weight-bold">
            By: {memory.author}
          </small>
          <br />
          <small className="font-italic font-weight-bold">
            Posted On: {moment(memory.creation_time).format("DD/MM/YYYY")}
          </small>
          <div className="mt-2">
            {!this.props.userpage && (
              <Button
                variant="contained"
                color="secondary"
                onClick={this.props.deletePost.bind(this, memory._id, "memory")}
              >
                Delete
              </Button>
            )}
          </div>
          <p className="my-2">{memory.likes} Likes</p>
          <ExpansionPanel
            expanded={expanded === memory._id}
            onChange={this.handleChange(memory._id)}
            style={{marginTop: "10px"}}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Comments ({memory.comments.length})
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div classes={classes.root}>
                <List id={`comment-list-${memory._id}`}>
                  {memory.comments &&
                    memory.comments.map(comment => {
                      return <Comments comment={comment} />;
                    })}
                  {this.state.newComment}
                </List>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      );
    });
    return <div>{Memories}</div>;
  }
}

export default withStyles(styles)(Memory)