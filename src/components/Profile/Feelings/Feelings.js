import React, { Component } from "react";
import Form from "./Form";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

let art_styles = [
  "Poem",
  "Story",
  "Quotes",
  "Gazal",
  "Rap",
  "Singing",
  "Comedy",
  "Dance"
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

  render() {
    const { value } = this.state;

    return (
      <div>
        <nav>
          <div className="" id="nav-tab" role="tablist">
            <h5 className="text-muted font-weight-bold mb-4">
              Give Soul To Your Feelings And Experiences With Creative Art
              Styles.
            </h5>
          </div>
        </nav>
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
              return <Tab label={el} />;
            })}
          </Tabs>
        </AppBar>
        {art_styles.map((el, index) => {
          return (
            value === index && (
              <TabContainer>
                <Form />
              </TabContainer>
            )
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(Feelings);
