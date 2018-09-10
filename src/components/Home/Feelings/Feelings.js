import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Form from "./Form";

class Feelings extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="" id="nav-tab" role="tablist">
            <h5 className="text-muted font-weight-bold mb-4">
              Give Soul To Your Feelings And Experiences With Creative Art
              Styles.
            </h5>
            <div className="nav nav-tabs navtabs" id="nav-tab" role="tablist">
              <a
                className="nav-item nav-link active"
                id="nav-poem-tab"
                data-toggle="tab"
                href="#nav-poem"
                role="tab"
              >
                Poem
              </a>
              <a
                className="nav-item nav-link"
                id="nav-story-tab"
                data-toggle="tab"
                href="#nav-story"
                role="tab"
              >
                Story
              </a>
              <a
                className="nav-item nav-link"
                id="nav-quotes-tab"
                data-toggle="tab"
                href="#nav-quotes"
                role="tab"
              >
                Quotes
              </a>
              <a
                className="nav-item nav-link"
                id="nav-gazal-tab"
                data-toggle="tab"
                href="#nav-gazal"
                role="tab"
              >
                Gazal
              </a>
              <a
                className="nav-item nav-link"
                id="nav-rap-tab"
                data-toggle="tab"
                href="#nav-rap"
                role="tab"
              >
                Rap
              </a>
              <a
                className="nav-item nav-link"
                id="nav-singing-tab"
                data-toggle="tab"
                href="#nav-singing"
                role="tab"
              >
                Signing
              </a>
              <a
                className="nav-item nav-link"
                id="nav-comedy-tab"
                data-toggle="tab"
                href="#nav-comedy"
                role="tab"
              >
                Comedy
              </a>
              <a
                className="nav-item nav-link"
                id="nav-dance-tab"
                data-toggle="tab"
                href="#nav-dance"
                role="tab"
              >
                Dance
              </a>
            </div>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-poem"
            role="tabpanel"
          >
            <Form />
          </div>
          <div className="tab-pane fade" id="nav-story" role="tabpanel">
            <Form />
          </div>
          <div className="tab-pane fade" id="nav-quotes" role="tabpanel">
            <Form />
          </div>
          <div className="tab-pane fade" id="nav-gazal" role="tabpanel">
            <Form />
          </div>
          <div className="tab-pane fade" id="nav-rap" role="tabpanel">
            <Form />
          </div>
          <div className="tab-pane fade" id="nav-singing" role="tabpanel">
            <Form />
          </div>
          <div className="tab-pane fade" id="nav-comedy" role="tabpanel">
            <Form />
          </div>
          <div className="tab-pane fade" id="nav-dance" role="tabpanel">
            <Form />
          </div>
        </div>
      </div>
    );
  }
}

export default Feelings;
