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

function imagedraw (ctx, img, x, y, w, h, offsetX, offsetY) {

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
      nw = iw * r,   // new prop. width
      nh = ih * r,   // new prop. height
      cx, cy, cw, ch, ar = 1;

  // decide which gap to fill    
  if (nw < w) ar = w / nw;                             
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
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
  ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
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
      modal: !this.state.modal
    });
  }

  state = {
    errors: {},
    loading: false,
    shared_type: "",
    image: "",
    modal: 0,
    previewUrl: "",
    color: "#333333"
  };

  getPreviewURL(){
    let reader  = new FileReader();
    reader.onloadend = () => {
      this.setState({
        previewUrl: reader.result
      }, () => {
        this.previewImage();
      });
    }
    reader.readAsDataURL(this.state.image);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      image: e.target.files[0]
    }, () => {
      this.getPreviewURL();
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
    ctx.font = fontsize + "px Arial";
    imagedraw(ctx, $("img#preview").get(0), 0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1;
    ctx.fillStyle = this.state.color;

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
  }

  getData(formData) {
    let canvas = document.getElementById('canvas');
    canvas.toBlob((blob)=>{
      let bodyFormData = new FormData();
      bodyFormData.append("text", formData.text);
      bodyFormData.append("post_type", formData.post_type);
      bodyFormData.append("shared_type", this.state.shared_type);
      bodyFormData.append("post_title", formData.post_title);
      bodyFormData.append("pic", new File([blob], "default.jpg", {
        type: "image/jpg",
        lastModified: Date.now()
      }));

      this.props.submitArt(bodyFormData);
    })
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
        }, () => {
          this.getPreviewURL();
        });
      });
  }

  colorChange(color){
    this.setState({
      color: color
    }, ()=> {
    this.previewImage();
    })
  }

  render() {
    const { handleSubmit } = this.props;
    let { previewUrl } = this.state;

    let img_tag = img_tag = (
        <img
          src={previewUrl}
          className="img-fluid mx-auto d-none"
          style={{ height: "400px", width: "400px" }}
          id="preview"
        />
      );

    return (
      <div>
        <form>
          <div className="data-holder">
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
              onChange={this.previewImage}
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
