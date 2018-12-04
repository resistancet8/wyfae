import React, { Component } from "react";
import truncate from "truncate";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";

export default class Memory extends Component {
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
    let { memories } = this.props;
    const { anchorEl } = this.state;
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
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            elevation={0}
          >
            <MenuItem
              onClick={() => {
                this.props.deletePost(memory._id, "memory");
                this.handleClose();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
          <span class="float-right badge badge-primary rounded font-weight-bold">
            {type}
          </span>
          {!this.props.userpage && (
            <IconButton className="deleteButton" onClick={this.handleClick}>
              <MoreVertIcon />
            </IconButton>
          )}
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
        </div>
      );
    });
    return <div>{Memories}</div>;
  }
}
