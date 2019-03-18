import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { reduxForm, Field } from "redux-form";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Preview from "./Preview";
import defaultPic from "./../../../assets/img/default.jpg";
import validateFeelingsinput from "./../../../helpers/feelings_validator";
import classnames from "classnames";
import $ from "jquery";
import "./text.js";
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

class Form extends Component {
  constructor(props) {
    super();
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.previewImage = this.previewImage.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.handleFontSize = this.handleFontSize.bind(this);
  }

  toggle() {
    this.setState({
      previewed: true
    }, () => {
      document.querySelector(".open-preview-modal").click()
    });
  }

  state = {
    errors: {},
    loading: false,
    shared_type: "",
    image: "",
    modal: 1,
    previewUrl: "",
    color: "#333333",
    imageVisibility: true,
    previewed: false
  };

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
    if(e.target.files[0]) {
      this.setState(
        {
          image: e.target.files[0],
          filename: e.target.files[0].name
        },
        () => {
          this.getPreviewURL();
        }
      );
    }
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
    ctx.font = fontsize + "px Arial";
    imagedraw(ctx, $("img#preview").get(0), 0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1;
    ctx.fillStyle = this.state.color;

    if (document.getElementById("text-body").value.trim() != "")
      ctx.mlFillText(
        document.getElementById("text-body").value.trim(),
        8,
        8,
        canvas.width - 10,
        canvas.height - 10,
        "center",
        "center",
        fontsize
      );
  }

  getData(formData) {
    this.previewImage();
    let { isValid, errors } = validateFeelingsinput(formData);

    if (!isValid) {
      this.setState({ errors: errors });
      return;
    }

    let canvas = document.getElementById("canvas");
    canvas.toBlob(blob => {
      let bodyFormData = new FormData();
      bodyFormData.append("text", formData.text);
      bodyFormData.append("post_type", formData.post_type);
      bodyFormData.append("image_or_text", this.state.imageVisibility);
      bodyFormData.append("shared_type", this.state.shared_type);
      bodyFormData.append("post_title", formData.post_title);
      bodyFormData.append(
        "pic",
        new File([blob], "default.jpg", {
          type: "image/jpg",
          lastModified: Date.now()
        })
      );

      this.props.submitArt(bodyFormData);
    });
  }

  componentDidMount() {
    this.props.initialize({
      post_type: "art"
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

  handleShowImage(e) {
    e.persist();
    this.setState(() => {
      return {
        imageVisibility: e.target.checked
      }
    })
  }

  render() {
    const { handleSubmit } = this.props;
    let { previewUrl } = this.state;
    let showButtons = true;

    if(this.state.imageVisibility && this.state.previewed || !this.state.imageVisibility){
      showButtons = false;
    }

    let img_tag = (img_tag = (
      <img
        src={previewUrl}
        className="img-fluid mx-auto d-none"
        style={{ height: "800px", width: "800px" }}
        id="preview"
      />
    ));

    return (
      <div>
        <form>
        <button type="button" class="btn btn-primary d-none open-preview-modal" data-toggle="modal" data-target="#exampleModal">
        </button>
          <div className="data-holder">
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Share Your Feelings/ Experience</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  {img_tag}
                  <div className="preview">
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
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
            <div className="form-group">
              <label>Title:</label>
              <Field
                component="input"
                type="text"
                name="post_title"
                className={classnames("form-control rounded", {
                  "is-invalid": this.state.errors.post_title
                })}
                id="post_title"
                placeholder="Title to your art"
              />
              {this.state.errors.post_title && (
                <div className="invalid-feedback">
                  {" "}
                  {this.state.errors.post_title}{" "}
                </div>
              )}
            </div>
            <Field component="input" type="hidden" name="post_type" />
            <img src={defaultPic} class="d-none" id="default-pic" />
            <Field
              component="textarea"
              name="text"
              id="text-body"
              cols="30"
              rows="7"
              // onChange={this.previewImage}
              className={classnames("form-control rounded", {
                "is-invalid": this.state.errors.text
              })}
              placeholder="Share Your Feelings/ Experience"
            />
            {this.state.errors.text && (
              <div className="invalid-feedback"> {this.state.errors.text} </div>
            )}
            <div className="show-img-holder mt-5"> 
              <label>Show default background image:</label>
              <div className="custom-input-checkbox d-inline">
                <input
                  type="checkbox"
                  id="switch-show-bg"
                  checked={this.state.imageVisibility}
                  onChange={e => this.handleShowImage(e)}
                />
                <label for="switch-show-bg" />
              </div>
              <label>{this.state.imageVisibility ? "On": "Off"}</label>
            </div>
            {this.state.imageVisibility && <div> <div className="select-image-holder my-3">
              <label>Select background image:</label>
              <input
                type="file"
                style={{display: "none"}}
                accept="image/*"
                id="file-selector"
                onChange={e => this.handleChange(e)}
              />
              <label id="label-file" htmlFor="file-selector">Choose</label>
              <label style={{maxWidth: "30%", overflow: "hidden"}}>{this.state.filename ? this.state.filename: "No image chosen"}</label>
            </div>
            <Button
                onClick={e => {
                e.preventDefault();
                this.previewImage();
                this.handleFontSize("plus");
                this.toggle();
              }}
              style={{background: "#0085f3", color: "white"}}
            >
              Show Preview
            </Button> </div> }
            <div className="controls mr-auto mt-3">
              {!this.props.part_id && (
                <div>
                  <Button
                    disabled={showButtons}
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
                    disabled={showButtons}
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
                    disabled={showButtons}
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
                  <Button
                    disabled={showButtons}
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
                </div>
              )}
              {this.props.part_id && (
                <Button
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
              )}
            </div>
          </div>
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
