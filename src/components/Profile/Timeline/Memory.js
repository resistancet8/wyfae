import React, { Component } from "react";
import truncate from "truncate";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import moment from "moment";
import like from "./../../../assets/img/liked feel icon.svg";
import unlike from "./../../../assets/img/unliked feel icon.svg";
import axios from "axios";
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
    anchorEl: null,
    comment: "",
    newComment: []
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
        }, () => {
          document.getElementsByClassName("total-no-comments-got-" + post_id)[0].innerHTML = parseInt(document.getElementsByClassName("total-no-comments-got-" + post_id)[0].innerHTML) + 1;
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
        var elem = type == "no" ? document.getElementById(`comment-id-${comment_id}`) : document.getElementById(`nested-comment-id-${comment_id}`);
        document.getElementsByClassName("total-no-comments-got-" + post_id)[0].innerHTML = parseInt(document.getElementsByClassName("total-no-comments-got-" + post_id)[0].innerHTML) - 1;
        elem.parentElement.removeChild(elem);
      })
      .catch(err => {
      });
  }

  handleLikeClick(event, id) {
    if (document.querySelector(".animate")) {
      document.querySelector(".animate").classList.remove("animate");
    }

    if (event.target.src.indexOf("unliked") !== -1) {
      event.target.src = like;
      event.target.classList.add("animate");
      document.getElementsByClassName("no-of-likes-got-" + id)[0].innerHTML = parseInt(document.getElementsByClassName("no-of-likes-got-" + id)[0].innerHTML) + 1;
    } else {
      event.target.src = unlike;
      event.target.classList.add("animate");
      document.getElementsByClassName("no-of-likes-got-" + id)[0].innerHTML = parseInt(document.getElementsByClassName("no-of-likes-got-" + id)[0].innerHTML) - 1;
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

  render() {
    const { classes, memories } = this.props;
    const { expanded } = this.state;
    const { auth } = this.props;
    const { isAuthenticated } = auth;

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
            style={{ width: "80%", fontSize: "1.2rem" }}
          >
            {memory.post_title}
          </p>
          {memory.url && (
            <div className="img-responsive">
              <img
                src={`${process.env.REACT_APP_API_ENDPOINT}/${memory.url}`}
                alt="Image"
                class="img-fluid"
                style={{ minWidth: "100%" }}
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

            <div className="my-2" style={{ cursor: "pointer" }} onClick={() => {
              this.props.handleLikesClick(memory.user_liked)
            }} ><span className={"my-2 no-of-likes-got-" + memory._id} >{memory.likes}</span> Likes </div>

            <div className="d-flex justify-content-between cart-actions-main my-2">
              {memory.user_liked && isAuthenticated && (
                <img
                  src={
                    !!memory.user_liked.filter(
                      o => o.username === this.props.user.username
                    ).length
                      ? like
                      : unlike
                  }
                  alt=""
                  id="like-unlike-button"
                  onClick={e => {
                    this.handleLikeClick(e, memory._id);
                  }}
                />
              )}
            </div>

            <ExpansionPanel
              expanded={expanded === memory._id}
              onChange={this.handleChange(memory._id)}
              style={{ marginTop: "10px" }}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{ padding: "0px !important;" }}>
                <Typography className={classes.heading}>
                  Comments (<span className={"total-no-comments-got-" + memory._id}>{memory.comments && (memory.comments.length) || 0}</span>)
                  </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div class="comments-hold-parent">
                  <ul id={`comment-list-${memory._id}`}>
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
                            this.addComment(`comment-list-${memory._id}`, memory._id);
                          }}
                        >
                          Submit
                          </Button>
                      </div>
                    </li>
                    {memory.comments &&
                      memory.comments.map(comment => {
                        return <Comments comment={comment} post_id={memory._id} deleteComment={this.deleteComment.bind(this)} handleNestedComment={this.handleNestedComment.bind(this)} />;
                      })}
                    {this.state.newComment}
                  </ul>
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

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    auth: state.auth
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Memory));