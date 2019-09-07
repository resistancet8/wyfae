import React, { Component } from "react";
import Form from "./Form";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import axios from "axios";
import { connect } from "react-redux";
import { reset } from "redux-form";
import Canvas from './Canvas'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: "20px 15px" }}>
      {props.children}
    </Typography>
  );
}

let art_styles = [
  ["poem", "Poem"],
  ["story", "Story"],
  ["quotes", "Quote"],
  ["ganaz", "Gazal/Nazm"],
  ["letter", "Letter"]
  // ["opinion", "Opinion/Advice"],
  // ["personal", "Personal Feelings"]
];

const styles = theme => ({
  root: {
    backgroundColor: "theme.palette.background.red"
  }
});

class Feelings extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  submitArt(formData) {
    formData.append("art_type", art_styles[this.state.value][0]);
    formData.append("author", this.props.user.first_name);
    this.props.dispatch({ type: "SHOW_TOAST", payload: "Working..." });
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_ENDPOINT}` + "/user/insert_post",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        this.props.dispatch({ type: "SHOW_TOAST", payload: "Success" });
        this.props.dispatch({
          type: "PUBLISH_ART",
          payload: response.data.post_content
        });
        this.props.dispatch(reset("art-form"));
        window.location.reload();
      })
      .catch(err => {
        this.props.dispatch({ type: "SHOW_TOAST", payload: "Errored!" });
      });
  }

  render() {
    const { value } = this.state;

    return (
      <div class="border mb-2 text-left">
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            {art_styles.map((el, index) => {
              return <Tab label={el[1]} />;
            })}
          </Tabs>
        </AppBar>
        {art_styles.map((el, index) => {
          return (
            value === index && (
              <TabContainer >
                <Form submitArt={this.submitArt.bind(this)} />
              </TabContainer>
            )
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

export default connect(mapStateToProps)(Feelings);
