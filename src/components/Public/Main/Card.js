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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Button } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

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

class PublicCard extends React.Component {
  state = {
    expanded: null,
    anchorEl: null,
    comment: "",
    newComment: []
  };

  handleClick = (event, id) => {
    event.preventDefault();
    this.setState({ anchorEl: event.currentTarget, id });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, id: null });
  };

  report(type) {
    // send to server
    // console.log(type);
    // axios.post("", {
    //   post_id: this.state.id || "",
    //   type
    // })
    // .then( resp => {})
    // .catch( e => {})
  }

  generateLikeMessage(likes) {
    let flag = false;

    if (
      !!this.props.post.user_liked.filter(
        o => o.username === this.props.user.username
      ).length
    ) {
      flag = true;
    }

    let string = flag ? "You" : "";

    if (flag && likes.length === 2) {
      return `You and ${likes[0].name} like this post.`;
    } else if (!flag && likes.length === 2) {
      return `${likes[0].name} and ${likes[1].name} like this post.`;
    } else if (likes.length >= 2) {
      return `${string}, ${likes[0].name} and ${likes.length -
        2} others like this post.`;
    } else if (likes.length === 1) {
      return `${likes[0].name} likes this post.`;
    }

    return string.length ? `${string} like this post.` : "";
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
      .post("http://159.89.171.16:9000/user/update_signal", {
        post_id: id,
        signal_type: "like"
      })
      .then(response => {})
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
      .post("http://159.89.171.16:9000/user/update_signal", {
        post_id: post_id,
        signal_type: "comment",
        comment_text: this.state.comment
      })
      .then(response => {
        this.setState({
          newComment: [
            ...this.state.newComment,
            <ListItem className="border-bottom">
              <ListItemText
                primary={response.data.comment_content.name}
                secondary={response.data.comment_content.comment_text}
              />
            </ListItem>
          ],
          comment: ""
        });
      })
      .catch(err => {
        console.log(err);
        // this.props.dispatch({
        //   type: "SHOW_TOAST",
        //   payload: err.response.data.msg
        // });
      });
  }

  render() {
    const { classes, post } = this.props;
    const { expanded, anchorEl} = this.state;

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
              image={`http://159.89.171.16:9000/${post.url}`}
            />
          </div>
        )}
        <CardContent>
          <Typography component="p" gutterBottom>
            {truncate(post.text, 150)}
          </Typography>
          <Typography component="p" gutterBottom variant="caption">
            {this.generateLikeMessage(
              post.user_liked.length ? post.user_liked : []
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <div className="d-flex justify-content-between cart-actions-main" >
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
           <span><a onClick={(e) => {
             this.handleClick(e, post._id);
           }} href="">report</a></span>
         </div>
          </div>
        </CardActions>
        <div className={classes.root}>
          <ExpansionPanel
            expanded={expanded === "panel1"}
            onChange={this.handleChange("panel1")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Comments ({post.comments.length})
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
                      return <Comments comment={comment} />;
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
              <MenuItem onClick={() => {
                this.report.bind(this, 'spam')()
                this.handleClose();
                }}>
                Spam
              </MenuItem>
              <MenuItem onClick={() => {
                this.report.bind(this, 'inappropirate')()
                this.handleClose();
              }}>
                Inappropriate
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
