import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { reduxForm, Field, reset } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Memory extends Component {
  constructor(props) {
    super();
    this.getData = this.getData.bind(this);
  }

  state = {
    errors: {},
    shared_type: ""
  };

  getData(formData) {
    let newFormData = new FormData();
    newFormData.append("post_title", formData.title);
    newFormData.append("text", formData.text);
    newFormData.append("author", this.props.user.first_name);
    newFormData.append("shared_type", this.state.shared_type);
    newFormData.append("post_type", "memory_book");

    axios({
      method: "post",
      url: "http://159.89.171.16:9000/user/insert_post",
      data: newFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        this.props.dispatch({ type: "SHOW_TOAST", payload: "Success" });
        this.props.dispatch({ type: "PUBLISH_MEMORY", payload: response.data.post_content });
        this.props.dispatch(reset("memory-form"));
      })
      .catch(err => {
        this.props.dispatch({ type: "SHOW_TOAST", payload: "Errored!" });
      });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h5 className="text-muted font-weight-bold mb-3">Memory Book</h5>
        <div>
          <div className="data-holder form-group">
            <div className="form-group">
              <label>Title:</label>
              <Field
                component="input"
                type="text"
                name="title"
                className="form-control"
                id="title"
                placeholder="Title"
              />
            </div>
            <Field
              component="textarea"
              name="text"
              id="text"
              cols="30"
              rows="10"
              className="form-control my-2"
              placeholder="Visited Some Place? Met Someone? Share What Are You Feeling?"
            />
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
        </div>
      </div>
    );
  }
}

function mapStoP(state){
  return {
    user: state.user.user
  }
}

export default reduxForm({
  form: "memory-form"
})(
  connect(
    mapStoP,
    {}
  )(withRouter(Memory))
);
