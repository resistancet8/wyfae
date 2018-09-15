import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Profile from "./Profile/Profile";
import Public from "./Public/Public";
import { Route, Switch } from "react-router-dom";
import Feelbar from "./Feelbar/Feelbar";

const NotFound = () => <div> Not Found </div>;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="adjustment mt-1" />
        <div className="container">
          <div className="d-flex">
            <div className="ml-auto">
              <Feelbar />
            </div>
          </div>
          <Switch>
            <Route path="/" exact component={Public} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
