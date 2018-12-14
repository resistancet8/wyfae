import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Memory from "./Memory";
import { getMoreMemories, getMoreArts } from "../../../actions/posts_actions";
import Art from "./Art";
import "./Timeline.css";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      currentPost: {},
      mlen: null,
      alen: null,
      artHideShowMore: 0,
      memHideShowMore: 0
    };

    this.toggle = this.toggle.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentWillReceiveProps(props) {
    let { arts, memory } = props.userpage ? props.userpage_posts : props;

    let obj = {};

    if(this.state.clicked && this.state.clicked == 'memory'){
      if (this.state.mlen == memory.length) {
        obj = {
          ...obj,
          memHideShowMore: 1
        };
      } else {
        obj = {
          ...obj,
          mlen: memory.length
        };
      }
  
      this.setState({ ...obj });
    }

    if(this.state.clicked && this.state.clicked == 'art'){
      if (this.state.alen == arts.length) {
        obj = {
          ...obj,
          artHideShowMore: 1
        };
      } else {
        obj = {
          ...obj,
          alen: arts.length
        };
      }
  
      this.setState({ ...obj });
    }
  }

  toggle(post) {
    this.setState({
      modal: !this.state.modal,
      currentPost: post ? post : {}
    });
  }

  deletePost(post_id, type = "art") {
    let c = window.confirm("Are you sure?");
    if (c) {
      axios
        .post("http://159.89.171.16:9000/user/delete_post", {
          post_id: post_id
        })
        .then(data => {
          this.props.dispatch({ type: "SHOW_TOAST", payload: "Deleted." });
          if (type == "memory") {
            this.props.dispatch({ type: "DELETE_MEMORY", payload: post_id });
          } else {
            this.props.dispatch({ type: "DELETE_ART", payload: post_id });
          }
        })
        .catch(err => {
          if (err.response)
            this.props.dispatch({
              type: "SHOW_TOAST",
              payload: err.response.data.msg
            });
        });
    }
  }

  render() {
    let { arts, memory } = this.props.userpage
      ? this.props.userpage_posts
      : this.props;

    let username = this.props.userpage ? "" : this.props.auth.user.username;

    return (
      <div className="timeline-holder">
        {(arts && arts.length) || (memory && memory.length) ? (
          <div className="p-2">
            <div>
              <h2 className="font-weight-bold">Arts: </h2>
              {arts && arts.length ? (
                <div>
                  <Art
                    arts={arts}
                    modalToggle={this.toggle}
                    deletePost={this.deletePost.bind(this)}
                    userpage={this.props.userpage}
                  />
                  {!this.state.artHideShowMore ? (
                    <Button
                      onClick={() => {
                        this.setState({
                          clicked: "art"
                        })
                        this.props.getMoreArts(arts.length, username)(this.props.dispatch);
                      }}
                      style={{
                        width: "100%"
                      }}
                    >
                      View more
                    </Button>
                  ) : (
                    <div style={{ textAlign: "center", margin: "10px 0" }}>
                      <span class="lead">No more posts</span>
                    </div>
                  )}
                </div>
              ) : (
                <div> No Arts </div>
              )}
            </div>
            <hr />
            <div>
              <h2 className="font-weight-bold">Memory: </h2>
              {memory && memory.length ? (
                <div>
                  <Memory
                    memories={memory}
                    modalToggle={this.toggle}
                    deletePost={this.deletePost.bind(this)}
                    userpage={this.props.userpage}
                  />
                  {!this.state.memHideShowMore ? (
                    <Button
                      onClick={() => {
                        this.setState({
                          clicked: "memory"
                        })
                        this.props.getMoreMemories(memory.length, username)(this.props.dispatch);
                      }}
                      style={{
                        width: "100%"
                      }}
                    >
                      View more
                    </Button>
                  ) : (
                    <div style={{ textAlign: "center", margin: "10px 0" }}>
                      <span class="lead">No more posts</span>
                    </div>
                  )}
                </div>
              ) : (
                <div>No Memories</div>
              )}
            </div>
          </div>
        ) : (
          <small>Nothing to display</small>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <h2 className="font-weight-bold text-uppercase">
              {this.state.currentPost.post_title}
            </h2>
          </ModalHeader>
          <ModalBody>
            {this.state.currentPost.text}
            <br />
            <p className="text-muted font-weight-bold mt-3">
              By: {this.state.currentPost.author}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" variant="outlined" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    memory: state.memory.memory,
    arts: state.arts.arts,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return({
    getMoreArts,
    getMoreMemories,
    dispatch
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
