import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import truncate from "truncate";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";
import like from "./../../../assets/img/liked feel icon.svg";
import unlike from "./../../../assets/img/unliked feel icon.svg";
import { connect } from "react-redux";
import axios from "axios";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Comments from "./Comments";
import ListItem from "@material-ui/core/ListItem";
import { Button } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    minWidth: 275
  },
  card2: {
    minWidth: 275,
    minHeight: ""
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
    height: "60%",
    paddingTop: "100%",
    backgroundSize: "contain"
  }
});

class PublicCard extends React.Component {
  state = {
    expanded: null,
    anchorEl: null,
    comment: "",
    newComment: [],
    id: "",
    body: ""
  };

  handleClick = (event, id, body) => {
    event.preventDefault();
    this.setState({ anchorEl: event.currentTarget, id, body });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, id: null });
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

  report(type) {
    if (type == "checkplag") {
      window.open(
        "https://www.google.com/search?q=" +
        encodeURIComponent(this.state.body),
        "_blank"
      );
      return;
    } else {
      //send to server
      axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/report", {
          post_id: this.state.id || "",
          report_type: type
        })
        .then(resp => {
          if (resp && resp.data) {
            this.props.dispatch({
              type: "SHOW_TOAST",
              payload: resp.data.msg
            });
          }
        })
        .catch(e => {
          if (e && e.response) {
            this.props.dispatch({
              type: "SHOW_TOAST",
              payload: e.response.data.msg
            });
          }
        });
    }
  }

  handleLikeClick(event, id) {
    if (document.querySelector(".animate")) {
      document.querySelector(".animate").classList.remove("animate");
    }

    if (event.target.src.indexOf("unliked") !== -1) {
      event.target.src = like;
      event.target.classList.add("animate");
    } else {
      event.target.src = unlike;
      event.target.classList.add("animate");
    }

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/update_signal", {
        post_id: id,
        signal_type: "like"
      })
      .then(response => { })
      .catch(err => {
        this.props.dispatch({
          type: "SHOW_TOAST",
          payload: err.response.data.msg
        });
      });
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleComment = event => {
    this.setState({
      comment: event.target.value
    });
  };

  addComment(id, post_id) {
    if (this.state.comment.length < 1) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/update_signal", {
        post_id: post_id,
        signal_type: "comment",
        comment_text: this.state.comment
      })
      .then(response => {
        this.setState({
          newComment: [
            ...this.state.newComment,
            <Comments comment={response.data.comment_content} post_id={post_id} deleteComment={this.deleteComment.bind(this)} handleNestedComment={this.handleNestedComment.bind(this)} />
          ],
          comment: ""
        });
      })
      .catch(err => {
      });
  }

  handleNestedComment(post_id, comment_id, comment, callback) {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/update_nested_comment", {
        post_id: post_id,
        comment_id: comment_id,
        comment_text: comment
      })
      .then(response => {
        callback(response.data.comment_content);
      })
      .catch(err => {
      });
  }

  deleteComment(post_id, comment_id, type) {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/delete_comment", {
        post_id: post_id,
        comment_id: comment_id,
        nested: type
      })
      .then(response => {
        var elem = type == "no" ? document.getElementById(`comment-id-${comment_id}`): document.getElementById(`nested-comment-id-${comment_id}`);
        console.log("+++el", elem)
        elem.parentElement.removeChild(elem);
      })
      .catch(err => {
      });
  }

  render() {
    const { classes, post } = this.props;
    const { expanded, anchorEl } = this.state;

    return (
      <Card className={classes.card + " mb-2"}>
        <CardHeader
          title={post.post_title}
          subheader={moment(post.creation_time).format("DD/MM/YYYY")}
        />
        <Typography
          component="p"
          gutterBottom
          style={{
            marginLeft: "25px",
            marginTop: "-15px"
          }}
        >
          <span class="font-italic">
            {post.shared_type !== "anonymous" ? (
              <Link to={`/profile/${post.username}`}>By: {post.author}</Link>
            ) : (
                "Anonymous"
              )}
          </span>
        </Typography>
        {post.url && post.image_or_text == "true" && (
          <div id="image-container">
            <CardMedia
              className={classes.media}
              image={`${process.env.REACT_APP_API_ENDPOINT}/${post.url}`}
            />
          </div>
        )}
        <CardContent>
          {post.image_or_text !== "true" && (
            <Typography component="p" gutterBottom>
              {/* {truncate(post.text, 150)} */}
              <pre style={{ whiteSpace: "pre-wrap" }}>{post.text}</pre>
            </Typography>
          )}

          <Typography component="p" gutterBottom variant="caption">
            {post.user_liked && post.user_liked.length ? post.user_liked.length : 0} Likes
          </Typography>
        </CardContent>
        <CardActions>
          <div className="d-flex justify-content-between cart-actions-main">
            {post.user_liked && (
              <img
                src={
                  !!post.user_liked.filter(
                    o => o.username === this.props.user.username
                  ).length
                    ? like
                    : unlike
                }
                alt=""
                id="like-unlike-button"
                onClick={e => {
                  this.handleLikeClick(e, post._id);
                }}
              />
            )}
            <div>
              <span>
                <a
                  onClick={e => {
                    this.handleClick(e, post._id, post.text);
                  }}
                  href=""
                >
                  <i className="fas fa-flag mx-1" />
                </a>
              </span>
            </div>
          </div>
          {post.url && <Button
            className="ml-2"
            onClick={() => {
              this.handleDownload(`${process.env.REACT_APP_API_ENDPOINT}/${post.url}`)
            }}
          >
            <i className="fas fa-download mx-1" />
          </Button>}
        </CardActions>
        <div className={classes.root}>
          <ExpansionPanel
            expanded={expanded === "panel1"}
            onChange={this.handleChange("panel1")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Comments ({post.comments && post.comments.length || 0})
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div class="comments-hold-parent">
                <ul id={`comment-list-${post._id}`}>
                  <li className="comment-holder">
                    <textarea
                      placeholder="Enter comment"
                      value={this.state.comment}
                      onChange={this.handleComment}
                      className="comment-box"
                    />
                    <div>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          this.addComment(`comment-list-${post._id}`, post._id);
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  </li>
                  {post.comments &&
                    post.comments.map(comment => {
                      return <Comments comment={comment} post_id={post._id} deleteComment={this.deleteComment.bind(this)} handleNestedComment={this.handleNestedComment.bind(this)} />;
                    })}
                  {this.state.newComment}
                </ul>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem
              onClick={() => {
                this.report.bind(this, "spam")();
                this.handleClose();
              }}
            >
              Spam/Inappropriate
            </MenuItem>
            <MenuItem
              onClick={() => {
                this.report.bind(this, "checkplag")();
                this.handleClose();
              }}
            >
              Check Plagiarism
            </MenuItem>
            <MenuItem
              onClick={() => {
                this.report.bind(this, "plagarised")();
                this.handleClose();
              }}
            >
              Report Plagiarism
            </MenuItem>
          </Menu>
        </div>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

PublicCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(PublicCard));
