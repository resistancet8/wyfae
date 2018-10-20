import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import truncate from "truncate";
import moment from "moment";
import like from "./../../../assets/img/liked feel icon.svg";
import unlike from "./../../../assets/img/unliked feel icon.svg";
import { connect } from "react-redux";
import axios from "axios";

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
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
};

class PublicCard extends React.Component {
  generateLikeMessage(likes){
    let flag = false;

    if(!!this.props.post.user_liked.filter(
      o => o.username === this.props.user.username
    ).length){
      flag = true;
    }

    let string = flag ? "You" : "";

    if(flag && likes.length === 2){
      return `You and ${likes[0].name} like this post.`;
    } else if(!flag && likes.length === 2){
      return `${likes[0].name} and ${likes[1].name} like this post.`
    } else if(likes.length >= 2) {
      return `${string}, ${likes[0].name} and ${likes.length - 2} others like this post.`
    } else if(likes.length === 1){
      return `${likes[0].name} likes this post.`
    }

    return string.length ? `${string} like this post.`: ""; 
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
      .then(response => {

      })
      .catch(err => {
        this.props.dispatch({ type: "SHOW_TOAST", payload: err.response.data.msg });
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card + " mb-2"}>
        <CardHeader
          title={this.props.post.post_title}
          subheader={moment(this.props.post.creation_time).format("DD/MM/YYYY")}
        />
        {this.props.post.url && (
          <div id="image-container">
            <CardMedia
              className={classes.media}
              image={`http://159.89.171.16:9000/${this.props.post.url}`}
            />
          </div>
        )}
        <CardContent>
          <Typography component="p" gutterBottom>
            {truncate(this.props.post.text, 150)}
          </Typography>
          <Typography component="p" gutterBottom>
            <strong class="font-italic">By: {this.props.post.author}</strong>
          </Typography>
          <Typography component="p" gutterBottom variant="caption">
            {this.generateLikeMessage(this.props.post.user_liked.length ? this.props.post.user_liked: [] )}
          </Typography>
        </CardContent>
        <CardActions>
          {this.props.post.user_liked && (
            <img
              src={
                !!this.props.post.user_liked.filter(
                  o => o.username === this.props.user.username
                ).length
                  ? like
                  : unlike
              }
              alt=""
              id="like-unlike-button"
              onClick={e => {
                this.handleLikeClick(e, this.props.post._id);
              }}
            />
          )}
        </CardActions>
        
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
