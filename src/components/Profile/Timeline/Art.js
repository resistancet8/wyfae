import React, { Component } from "react";
import truncate from "truncate";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";

export default class Art extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    let { arts } = this.props;
    const { anchorEl } = this.state;
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

      return (
        <div key={index} className="bg-white p-3 mb-2 art-holder">
          {art._id}
          <Button
            variant="contained"
            color="secondary"
            className="deleteButton"
            onClick={this.props.deletePost.bind(this, art._id, "art")}
          >
            Delete
          </Button>
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
              <img src={`http://159.89.171.16:9000/${art.url}`} alt="Image" />
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
        </div>
      );
    });
    return <div>{Arts}</div>;
  }
}
