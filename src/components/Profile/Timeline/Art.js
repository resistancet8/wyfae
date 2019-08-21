import React, { Component } from "react";
import truncate from "truncate";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import moment from "moment";
import like from "./../../../assets/img/liked feel icon.svg";
import unlike from "./../../../assets/img/unliked feel icon.svg";
import axios from "axios";
import Comments from "../../Public/Main/Comments";
import { withStyles } from "@material-ui/core";
import { Link } from 'react-router-dom';

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

class Art extends Component {
  state = {
    anchorEl: null,
    comment: "",
    newComment: [],
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
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
    const { auth } = this.props;
    const { isAuthenticated } = auth;

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
      let likes = art.likes ? art.likes : art.participants && art.participants.length ? art.participants[0].likes : 0;

      return (
        <div key={index} className="bg-white py-3 border art-holder mb-2 rounded-1">
          <span class="float-right badge badge-primary rounded font-weight-bold mr-3 p-1 px-3">
            {type}
          </span>
          {type == 'compete' && <span class="float-right badge badge-primary rounded font-weight-bold mr-3 p-1 px-3" style={{ background: "green" }}>
            <Link to={`/shared/${art._id}`} class="text-white"> Open </Link>
          </span>}
          <p
            className="text-uppercase px-3"
            style={{ width: "80%", fontSize: "1.2rem" }}
          >
            {art.post_title}
          </p>
          {art.url && (
            <div className="img-responsive">
              <img
                src={`${process.env.REACT_APP_API_ENDPOINT}/${art.url}`}
                alt="Image"
                className="img-fluid"
                style={{ minWidth: "100%" }}
              />
            </div>
          )}
          <div className="post-desc px-4 py-2">
            <p>{truncate(type == 'compete' ? art.participants[0].text || "" : art.text, 250)}</p>
            <div className="mt-2">
              <Button
                variant="outlined"
                onClick={() => {
                  this.props.modalToggle(art);
                }}
              >
                Read More
              </Button>
              {art.url &&
                <Button
                  className="ml-2"
                  variant="outlined"
                  onClick={() => {
                    this.handleDownload(`${process.env.REACT_APP_API_ENDPOINT}/${art.url}`)
                  }}
                >
                  Download
                </Button>
              }
            </div>
            <small className="font-italic font-weight-bold">
              Category: {art.art_type == "ganaz" ? "gazal/ nazm" : art.art_type}
            </small>
            <br />
            <small className="font-italic font-weight-bold">
              By: {type == 'compete' ? art.participants[0].author || "You" : art.author}
            </small>
            <br />
            <small className="font-italic font-weight-bold">
              Posted On: {moment(art.creation_time).format("DD/MM/YYYY")}
            </small>
            <div className="mt-2">
              {!this.props.userpage && type !== 'compete' && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.props.deletePost.bind(this, art._id, "art")}
                >
                  Delete
                </Button>
              )}
            </div>
            <div className="my-2" style={{ cursor: "pointer" }} onClick={() => {
              this.props.handleLikesClick(art.user_liked)
            }} ><span className={"my-2 no-of-likes-got-" + art._id} >{likes}</span> Likes </div>

            <div className="d-flex justify-content-between cart-actions-main my-2">
              {art.user_liked && isAuthenticated && (
                <img
                  src={
                    !!art.user_liked.filter(
                      o => o.username === this.props.user.username
                    ).length
                      ? like
                      : unlike
                  }
                  alt=""
                  id="like-unlike-button"
                  onClick={e => {
                    this.handleLikeClick(e, art._id);
                  }}
                />
              )}
            </div>

            {art.comments && (
              <ExpansionPanel
                expanded={expanded === art._id}
                onChange={this.handleChange(art._id)}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{ padding: "0px !important;" }}>
                  <Typography className={classes.heading}>
                    Comments (<span className={"total-no-comments-got-" + art._id}>{art.comments && (art.comments.length) || 0}</span>)
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div class="comments-hold-parent">
                    <ul id={`comment-list-${art._id}`}>
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
                              this.addComment(`comment-list-${art._id}`, art._id);
                            }}
                          >
                            Submit
                          </Button>
                        </div>
                      </li>
                      {art.comments &&
                        art.comments.map(comment => {
                          return <Comments comment={comment} post_id={art._id} deleteComment={this.deleteComment.bind(this)} handleNestedComment={this.handleNestedComment.bind(this)} />;
                        })}
                      {this.state.newComment}
                    </ul>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )}
          </div>
        </div>
      );
    });
    return <div>{Arts}</div>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    auth: state.auth
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Art));