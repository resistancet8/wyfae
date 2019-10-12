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
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Button } from "@material-ui/core";
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
    body: "",
    dropdownOpen: false
  };

  handleClick = (event, id, body) => {
    event.preventDefault();
    this.setState({ anchorEl: event.currentTarget, id, body });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, id: null });
  };

  handleDownload(url) {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/download_image", {
      image_path: url.match(/(\/)(static)(.*)/g)[0]
    })
    .then(e => {
        var tag = document.createElement('a');
        tag.href = "data:application/octet-stream;base64," + e.data.image;
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
      document.getElementsByClassName("no-of-likes-got-"+id)[0].innerHTML = parseInt(document.getElementsByClassName("no-of-likes-got-"+id)[0].innerHTML) + 1;
    } else {
      event.target.src = unlike;
      event.target.classList.add("animate");
      document.getElementsByClassName("no-of-likes-got-"+id)[0].innerHTML = parseInt(document.getElementsByClassName("no-of-likes-got-"+id)[0].innerHTML) - 1;
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

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
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
        }, () => {
          document.getElementsByClassName("total-no-comments-got-"+post_id)[0].innerHTML = parseInt(document.getElementsByClassName("total-no-comments-got-"+post_id)[0].innerHTML) + 1;
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
        document.getElementsByClassName("total-no-comments-got-"+post_id)[0].innerHTML = parseInt(document.getElementsByClassName("total-no-comments-got-"+post_id)[0].innerHTML) - 1;
        elem.parentElement.removeChild(elem);
      })
      .catch(err => {
      });
  }

  render() {
    const { classes, post, auth } = this.props;
    const { expanded, anchorEl } = this.state;
    const { isAuthenticated } = auth;

    let sharable_url = window.location.origin + `/view/` + post._id;
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
            <span className={"no-of-likes-got-"+post._id}>{post.user_liked && post.user_liked.length ? post.user_liked.length : 0}</span> Likes
          </Typography>
        </CardContent>
        <CardActions>
          <div className="d-flex justify-content-between cart-actions-main">
            {post.user_liked && isAuthenticated && (
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
          </div>
          <Dropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)}>
            <DropdownToggle tag="span">
              <i class="fas fa-share-alt share-icons"></i>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem className="py-0 px-1 d-flex justify-content-around"><a
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  sharable_url
                )}&amp;src=sdkpreparse`}
                class="fb-xfbml-parse-ignore share-icons"
                style={{fontSize: '18px'}}
              >
                <i class="fab fa-facebook" />
              </a><a
              target="_blank"
              class="wa-share-button share-icons"
              style={{fontSize: '18px'}}
              href={`https://wa.me/?text=${encodeURIComponent(sharable_url)}`}
            >
              <i class="fab fa-whatsapp" aria-hidden="true" />
            </a> <a
              target="_blank"
              class="twitter-share-button share-icons"
              style={{fontSize: '18px'}}
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                sharable_url
              )}`}
            >
              <i class="fab fa-twitter" />
            </a></DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div className="ml-2">
            <span>
              <a
                onClick={e => {
                  this.handleClick(e, post._id, post.text);
                }}
                href=""
              >
                <i style={{color: 'red'}} className="fas fa-flag mx-1" />
              </a>
            </span>
          </div>
          {post.url && <span
            className="ml-2"
            onClick={() => {
              this.handleDownload(`${process.env.REACT_APP_API_ENDPOINT}/${post.url}`)
            }}
          >
            <i className="fas fa-download mx-1 share-icons" />
          </span>}

        </CardActions>
        <div className={classes.root}>
          {isAuthenticated && <ExpansionPanel
            expanded={expanded === "panel1"}
            onChange={this.handleChange("panel1")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Comments (<span className={"total-no-comments-got-"+post._id}>{post.comments && (post.comments.length) || 0}</span>)
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
          </ExpansionPanel>}
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
    user: state.auth.user,
    auth: state.auth
  };
}

PublicCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(PublicCard));
