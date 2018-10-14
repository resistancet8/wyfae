import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { reduxForm, Field } from "redux-form";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Preview from "./Preview";
import defaultPic from "./../../../assets/img/default.jpg";
import $ from "jquery";
import "./text.js";
let fontsize = 20;

class Form extends Component {
  constructor(props) {
    super();
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  state = {
    errors: {},
    loading: false,
    shared_type: "",
    image: "",
    modal: 0
  };

  handleChange(e) {
    e.preventDefault();
    this.setState({
      image: e.target.files[0]
    });
  }

  handleFontSize(tag) {
    if (tag == "plus") {
      fontsize++;
    } else {
      fontsize--;
    }

    this.previewImage();
  }

  previewImage() {
    var canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d");
    canvas.width = $("img#preview").width();
    canvas.crossOrigin = "Anonymous";
    canvas.height = $("img#preview").height();
    ctx.drawImage($("img#preview").get(0), 0, 0);
    ctx.font = fontsize + "px Arial";
    //redraw image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage($("img#preview").get(0), 0, 0);
    ctx.lineWidth = 1;
    if (document.getElementById("text").value != "")
      ctx.mlFillText(
        document.getElementById("text").value,
        8,
        8,
        canvas.width - 10,
        canvas.height - 10,
        "center",
        "center",
        fontsize
      );
    ctx.fillStyle = "red";
  }

  getData(formData) {
    let bodyFormData = new FormData();
    bodyFormData.append("text", formData.text);
    bodyFormData.append("post_type", formData.post_type);
    bodyFormData.append("shared_type", this.state.shared_type);
    bodyFormData.append("post_title", formData.post_title);
    bodyFormData.append("pic", this.state.image);

    this.props.submitArt(bodyFormData);
  }

  componentDidMount() {
    this.props.initialize({
      post_type: "art"
    });

    fetch(defaultPic)
      .then(d => d.blob())
      .then(d => {
        this.setState({
          image: new File([d], "default.jpg", {
            type: "image/jpg",
            lastModified: Date.now()
          })
        });
      });
  }

  render() {
    const { handleSubmit } = this.props;
    let { imagePreviewUrl } = this.state;

    let img_tag = null;
    if (imagePreviewUrl) {
      img_tag = (
        <img
          src={defaultPic}
          className="img-fluid mx-auto d-none"
          style={{ height: "400px", width: "400px" }}
          id="preview"
        />
      );
    } else {
      img_tag = (
        <img
          src={defaultPic}
          className="img-fluid mx-auto d-none"
          style={{ height: "400px", width: "400px" }}
          id="preview"
        />
      );
    }

    return (
      <div>
        <form>
          <div className="data-holder">
            {img_tag}
            {this.state.modal ? (
              <div className="preview">
                <Preview
                  modal={this.state.modal}
                  toggle={this.toggle}
                  handleFontSize={this.handleFontSize}
                  previewImage={this.previewImage}
                  img_tag={img_tag}
                />
              </div>
            ) : (
              ""
            )}
            <div className="form-group">
              <label>Title:</label>
              <Field
                component="input"
                type="text"
                name="post_title"
                className="form-control"
                id="post_title"
                placeholder="Title to your art"
              />
            </div>
            <Field component="input" type="hidden" name="post_type" />
            <img src={defaultPic} class="d-none" id="default-pic" />
            <Field
              component="textarea"
              name="text"
              id="text"
              cols="30"
              rows="7"
              className="form-control my-2"
              placeholder="Share Your Feelings/ Experience"
            />
            <div className="form-group">
              <label>Select an image:</label>
              <input
                type="file"
                className="form-control"
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="controls mr-auto">
              <Button
                variant="outlined"
                className="mr-2 mb-2 font-weight-normal"
                onClick={() => {
                  this.setState(
                    {
                      shared_type: "share"
                    },
                    () => {
                      handleSubmit(this.getData)();
                    }
                  );
                }}
              >
                <i className="fas fa-share mx-1" />
                Share
              </Button>
              <Button
                variant="outlined"
                className="mr-2 mb-2 font-weight-normal"
                onClick={() => {
                  this.setState(
                    {
                      shared_type: "anonymous"
                    },
                    () => {
                      handleSubmit(this.getData)();
                    }
                  );
                }}
              >
                <i className="fas fa-share mx-1" />
                Share Anonymously
              </Button>
              <Button
                variant="outlined"
                className="mr-2 mb-2 font-weight-normal"
                onClick={() => {
                  this.setState(
                    {
                      shared_type: "compete"
                    },
                    () => {
                      handleSubmit(this.getData)();
                    }
                  );
                }}
              >
                <i className="fas fa-medal mx-1" />
                Compete
              </Button>
              <Button
                variant="outlined"
                className="mr-2 mb-2 font-weight-normal"
                onClick={() => {
                  this.setState(
                    {
                      shared_type: "save"
                    },
                    () => {
                      handleSubmit(this.getData)();
                    }
                  );
                }}
              >
                <i className="fas fa-save mx-1" />
                Save
              </Button>
            </div>
          </div>
          <Button
            variant="outlined"
            onClick={e => {
              e.preventDefault();
              this.toggle();
            }}
          >
            Show Preview
          </Button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  errors: PropTypes.object,
  auth: PropTypes.object,
  handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return {};
}

export default reduxForm({
  form: "art-form"
})(
  connect(
    null,
    {}
  )(withRouter(Form))
);
