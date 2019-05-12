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
    flexShrink: 0,
    padding: "0px !important"
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

  handleDownload(url) {
    fetch(url, {
      headers: {
        "Accept": "application/octet-stream"
      }
    })
      .then(e => e.blob())
      .then(s => {
        var tag = document.createElement('a');
        tag.href = URL.createObjectURL(s);

        tag.download = "image.jpg";
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
      })
  }

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
        <div key={index} className="bg-white py-3 border rounded-1 memory-holder mb-2">
          <span class="float-right badge badge-primary rounded font-weight-bold mr-3 p-1 px-3">
            {type}
          </span>
          <p  
            className="text-uppercase px-3"
            style={{ width: "80%", fontSize: "1.2rem"}}
          >
            {memory.post_title}
          </p>
          {memory.url && (
            <div className="img-responsive">
              <img
                src={`${process.env.REACT_APP_API_ENDPOINT}/${memory.url}`}
                alt="Image"
                class="img-fluid"
                style={{minWidth: "100%"}}
              />
            </div>
          )}
          <div className="post-desc px-4 py-2">
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
              {memory.url &&
                <Button
                  className="ml-2"
                  variant="outlined"
                  onClick={() => {
                    this.handleDownload(`${process.env.REACT_APP_API_ENDPOINT}/${memory.url}`)
                  }}
                >
                  Download
                </Button>
              }
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
            <p className="my-2" style={{cursor: "pointer"}} onClick={() => {
              this.props.handleLikesClick(memory.user_liked)
            }}>{memory.likes} Likes</p>
            <ExpansionPanel
              expanded={expanded === memory._id}
              onChange={this.handleChange(memory._id)}
              style={{marginTop: "10px"}}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{padding: "0px !important;"}}>
                <Typography className={classes.heading} style={{padding: "0px !important;"}}>
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
        </div>
      );
    });
    return <div>{Memories}</div>;
  }
}

export default withStyles(styles)(Memory)