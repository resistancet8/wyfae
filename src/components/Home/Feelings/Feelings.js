import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Form from "./Form";

class Feelings extends Component {
  render() {
    return (
      <div>
        <nav>
          <div class="" id="nav-tab" role="tablist">
            <h5 className="text-muted font-weight-bold">
              Give Soul To Your Feelings And Experiences With Creative Art
              Styles.
            </h5>
            <div className="nav nav-tabs navtabs" id="nav-tab" role="tablist">
              <a
                class="nav-item nav-link active"
                id="nav-poem-tab"
                data-toggle="tab"
                href="#nav-poem"
                role="tab"
              >
                Poem
              </a>
              <a
                class="nav-item nav-link"
                id="nav-story-tab"
                data-toggle="tab"
                href="#nav-story"
                role="tab"
              >
                Story
              </a>
              <a
                class="nav-item nav-link"
                id="nav-quotes-tab"
                data-toggle="tab"
                href="#nav-quotes"
                role="tab"
              >
                Quotes
              </a>
              <a
                class="nav-item nav-link"
                id="nav-gazal-tab"
                data-toggle="tab"
                href="#nav-gazal"
                role="tab"
              >
                Gazal
              </a>
              <a
                class="nav-item nav-link"
                id="nav-rap-tab"
                data-toggle="tab"
                href="#nav-rap"
                role="tab"
              >
                Rap
              </a>
              <a
                class="nav-item nav-link"
                id="nav-singing-tab"
                data-toggle="tab"
                href="#nav-singing"
                role="tab"
              >
                Signing
              </a>
            </div>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-poem" role="tabpanel">
            <Form />
          </div>
          <div class="tab-pane fade" id="nav-story" role="tabpanel">
            <Form />
          </div>
          <div class="tab-pane fade" id="nav-quotes" role="tabpanel">
            <Form />
          </div>
          <div class="tab-pane fade" id="nav-gazal" role="tabpanel">
            <Form />
          </div>
          <div class="tab-pane fade" id="nav-rap" role="tabpanel">
            <Form />
          </div>
          <div class="tab-pane fade" id="nav-singing" role="tabpanel">
            <Form />
          </div>
        </div>
      </div>
    );
  }
}

export default Feelings;
