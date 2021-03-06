import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { reduxForm, Field, reset } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import validateMemoryinput from "./../../../helpers/memory_validator";
import Preview from "./Preview";
import defaultPic from "./../../../assets/img/default.jpg";
import $ from "jquery";
import "./../Feelings/text.js";
import Switch from "react-switch";
import classnames from "classnames";
import axios from "axios";
let fontsize = 20;

function imagedraw(ctx, img, x, y, w, h, offsetX, offsetY) {
  if (arguments.length === 2) {
    x = y = 0;
    w = ctx.canvas.width;
    h = ctx.canvas.height;
  }

  // default offset is center
  offsetX = typeof offsetX === "number" ? offsetX : 0.5;
  offsetY = typeof offsetY === "number" ? offsetY : 0.5;

  // keep bounds [0.0, 1.0]
  if (offsetX < 0) offsetX = 0;
  if (offsetY < 0) offsetY = 0;
  if (offsetX > 1) offsetX = 1;
  if (offsetY > 1) offsetY = 1;

  var iw = img.width,
    ih = img.height,
    r = Math.min(w / iw, h / ih),
    nw = iw * r, // new prop. width
    nh = ih * r, // new prop. height
    cx,
    cy,
    cw,
    ch,
    ar = 1;

  // decide which gap to fill
  if (nw < w) ar = w / nw;
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh; // updated
  nw *= ar;
  nh *= ar;

  // calc source rectangle
  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  // make sure source rectangle is valid
  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  // fill image in dest. rectangle
  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
}
class Memory extends Component {
  constructor(props) {
    super();
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.previewImage = this.previewImage.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.handleFontSize = this.handleFontSize.bind(this);
  }

  state = {
    errors: {},
    loading: false,
    shared_type: "",
    image: "",
    modal: 0,
    previewUrl: "",
    imageVisibility: true,
    color: "#333333",
    previewed: false
  };

  componentDidMount() {
    this.props.initialize({
      post_type: "memory"
    });

    fetch(defaultPic)
      .then(d => d.blob())
      .then(d => {
        this.setState(
          {
            image: new File([d], "default.jpg", {
              type: "image/jpg",
              lastModified: Date.now()
            })
          },
          () => {
            this.getPreviewURL();
          }
        );
      });
  }

  colorChange(color) {
    this.setState(
      {
        color: color
      },
      () => {
        this.previewImage();
      }
    );
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      previewed: true
    });
  }

  getData(formData) {
    this.previewImage();
    let { isValid, errors } = validateMemoryinput(formData);

    if (!isValid) {
      this.setState({ errors: errors });
      return;
    }

    let newFormData = new FormData();
    let canvas = document.getElementById("canvas1");

    canvas.toBlob(blob => {
      newFormData.append(
        "pic",
        new File([blob], "default.jpg", {
          type: "image/jpg",
          lastModified: Date.now()
        })
      );
      newFormData.append("post_title", formData.title);
      newFormData.append("text", formData.text);
      newFormData.append("author", this.props.user.first_name);
      newFormData.append("shared_type", this.state.shared_type);
      newFormData.append("image_or_text", this.state.imageVisibility);
      newFormData.append("post_type", "memory_book");

      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_ENDPOINT}` + "/user/insert_post",
        data: newFormData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      })
        .then(response => {
          this.props.dispatch({ type: "SHOW_TOAST", payload: "Success" });
          this.props.dispatch({
            type: "PUBLISH_MEMORY",
            payload: response.data.post_content
          });
          this.props.dispatch(reset("memory-form"));
        })
        .catch(err => {
          this.props.dispatch({ type: "SHOW_TOAST", payload: "Errored!" });
        });
    });
  }

  handleShowImage(e) {
    this.setState(() => {
      return {
        imageVisibility: e
      }
    })
  }

  getPreviewURL() {
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState(
        {
          previewUrl: reader.result
        },
        () => {
          this.previewImage();
        }
      );
    };
    reader.readAsDataURL(this.state.image);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState(
      {
        image: document.querySelector("#memory-file").files[0],
        filename: document.querySelector("#memory-file").files[0].name
      },
      () => {
        this.getPreviewURL();
      }
    );
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
    var canvas = document.getElementById("canvas1"),
      ctx = canvas.getContext("2d");
    canvas.width = $("img#preview1").width();
    canvas.crossOrigin = "Anonymous";
    canvas.height = $("img#preview1").height();
    ctx.font = fontsize + "px Arial";
    imagedraw(ctx, $("img#preview1").get(0), 0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1;
    ctx.fillStyle = this.state.color;

    if (document.getElementById("text1").value != "")
      ctx.mlFillText(
        document.getElementById("text1").value,
        8,
        8,
        canvas.width - 10,
        canvas.height - 10,
        "center",
        "center",
        fontsize
      );
  }

  render() {
    const { handleSubmit } = this.props;

    let { previewUrl } = this.state;

    let img_tag = (img_tag = (
      <img
        src={previewUrl}
        className="img-fluid mx-auto d-none"
        width="400"
        height="400"
        style={{ height: "400px", width: "400px" }}
        id="preview1"
      />
    ));

    return (
      <div>
        <h5 className="text-muted font-weight-bold mb-3">Memory Book</h5>
        <div>
          {img_tag}
          <div className="preview1">
            <Preview
              modal={this.state.modal}
              toggle={this.toggle}
              handleFontSize={this.handleFontSize}
              img_tag={img_tag}
              colorChange={this.colorChange}
              color={this.state.color}
              show={this.state.modal}
            />
          </div>
          <div className="data-holder form-group">
            <div className="form-group">
              <label>Title:</label>
              <Field
                component="input"
                type="text"
                name="title"
                className={classnames("form-control rounded", {
                  "is-invalid": this.state.errors.title
                })}
                id="title"
                required
                min="10"
                placeholder="Title"
              />
              {this.state.errors.title && (
                <div className="invalid-feedback">
                  {" "}
                  {this.state.errors.title}{" "}
                </div>
              )}
            </div>
            <Field
              component="textarea"
              name="text"
              id="text1"
              cols="30"
              rows="10"
              className={classnames("form-control rounded", {
                "is-invalid": this.state.errors.text
              })}
              // onChange={this.previewImage}
              required
              min="100"
              placeholder="Because pictures alone are not enough to describe your experiences and memories. Write about the picture that you would rather upload on social media"
            />
            {this.state.errors.text && (
              <div className="invalid-feedback"> {this.state.errors.text} </div>
            )}


            <div className="show-img-holder mt-5">
              <label>Show default background image:</label>
              <div className="custom-input-checkbox d-inline">
                <Switch height={25} width={50}
                  checked={this.state.imageVisibility}
                  onChange={c => this.handleShowImage(c)}
                />
              </div>
              <label>{this.state.imageVisibility ? "On" : "Off"}</label>
            </div>
            <div className="select-image-holder my-3">
              <label>Select background image:</label>
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                id="memory-file"
                onChange={e => this.handleChange(e)}
              />
              <label id="label-file" htmlFor="memory-file">Choose</label>
              <label style={{ width: "30%", overflow: "hidden" }}>{this.state.filename ? this.state.filename : "No image chosen"}</label>
            </div>

            <Button
              variant="outlined"
              onClick={e => {
                e.preventDefault();
                this.previewImage();
                this.handleFontSize("plus");
                this.toggle();
              }}
              style={{ background: "#0085f3", color: "white" }}
            >
              {this.state.modal ? "Hide Preview" : "Show Preview"}
            </Button>

            <div className="controls mr-auto mt-2">
              <Button
                disabled={!this.state.previewed}
                variant="outlined"
                className="mr-2 mb-2 font-weight-normal"
                onClick={() => {
                  this.setState(
                    {
                      shared_type: "public"
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
                disabled={!this.state.previewed}
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
                disabled={!this.state.previewed}
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
        </div>
      </div>
    );
  }
}

function mapStoP(state) {
  return {
    user: state.user.user
  };
}

export default reduxForm({
  form: "memory-form"
})(
  withRouter(connect(
    mapStoP,
    {}
  )(Memory))
);
