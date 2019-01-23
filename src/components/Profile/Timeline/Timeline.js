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
      modal_like: false,
      currentPost: {},
      mlen: null,
      alen: null,
      artHideShowMore: 0,
      memHideShowMore: 0
    };

    this.toggle = this.toggle.bind(this);
    this.toggle_like = this.toggle_like.bind(this);
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

  toggle_like(post) {
    this.setState({
      modal_like: !this.state.modal_like
    });
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
        .post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/delete_post", {
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

  handleLikesClick(likes) {
    console.log(likes)
    this.setState((prevState) => {
      return {
        ...prevState,
        likes
      }
    }, () => {
      this.toggle_like()
    })
  }

  render() {
    let { arts, memory } = this.props.userpage
      ? this.props.userpage_posts
      : this.props;

    let username = this.props.userpage ? "" : this.props.auth.user.username;

    let likes = this.state.likes || [];
    let LikesHTML = likes.map(like => {
      return (
        <li
          className="col-12 row mb-1"
          style={{ background: "#f1f1f1"}}
        >
          <div className="col-12">
            {like.name ? like.name : like.username}
            <p>
              <small>@{like.username}</small>
            </p>
          </div>
        </li>
      );
    });

    return (
      <div className="timeline-holder">
        {(arts && arts.length) || (memory && memory.length) ? (
          <div className="p-2">
            <div>
              {arts && arts.length ? (
                <div>
                  <Art
                    arts={arts}
                    modalToggle={this.toggle}
                    deletePost={this.deletePost.bind(this)}
                    userpage={this.props.userpage}
                    handleLikesClick={this.handleLikesClick.bind(this)}
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
              {memory && memory.length ? (
                <div>
                  <Memory
                    memories={memory}
                    modalToggle={this.toggle}
                    deletePost={this.deletePost.bind(this)}
                    userpage={this.props.userpage}
                    handleLikesClick={this.handleLikesClick.bind(this)}
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

        <Modal
          isOpen={this.state.modal_like}
          toggle={this.toggle_like}
          style={{ height: "300px" }}
        >
          <ModalHeader toggle={this.toggle_like}>
            <h2>Likes</h2>
          </ModalHeader>
          <ModalBody>
            <div className="likes-holder">
              <ul>
                {LikesHTML}
              </ul>
            </div>
          </ModalBody>
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
