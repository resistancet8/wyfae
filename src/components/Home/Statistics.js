import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

class Stats extends Component {
  render() {
    return (
      <div>
        <h5 className="font-weight-bold text-muted">STATISTICS:</h5>
        <div className="content-shared stats">
          <label className="text-muted">Total Number of Content Shared:</label>
          <label className="float-right text-muted">2000</label>
          <div class="progress">
            <div
              class="progress-bar text-white progress-bar-animated bg-success progress-bar-striped"
              role="progressbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "80%" }}
            >
              80%
            </div>
          </div>
        </div>
        <div className="no-of-likes stats">
          <div className="content-shared">
            <label className="text-muted">Total Number of Likes:</label>
            <label className="float-right text-muted">100</label>
            <div class="progress">
              <div
                class="progress-bar text-white progress-bar-animated bg-dark progress-bar-striped"
                role="progressbar"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "10%" }}
              >
                10%
              </div>
            </div>
          </div>
        </div>
        <div className="no-of-wins stats">
          <div className="content-shared">
            <label className="text-muted">Total Number of Wins:</label>
            <label className="float-right text-muted">600</label>
            <div class="progress">
              <div
                class="progress-bar text-white progress-bar-animated bg-danger progress-bar-striped"
                role="progressbar"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "60%" }}
              >
                60%
              </div>
            </div>
          </div>
        </div>
        <div className="no-of-comments stats">
          <div className="content-shared">
            <label className="text-muted">Total Number of Comments:</label>
            <label className="float-right text-muted">233</label>
            <div class="progress">
              <div
                class="progress-bar text-white progress-bar-animated bg-primary progress-bar-striped"
                role="progressbar"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "50%" }}
              >
                50%
              </div>
            </div>
          </div>
        </div>
        <div className="content-share-anonymous stats">
          <div className="content-shared">
            <label className="text-muted">
              No. Of Times Content Shared Anonymously:
            </label>
            <label className="float-right text-muted">225</label>
            <div class="progress">
              <div
                class="progress-bar text-white progress-bar-animated bg-warning progress-bar-striped"
                role="progressbar"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "30%" }}
              >
                30%
              </div>
            </div>
          </div>
        </div>
        {/* <div className="best-shared">
          <div className="content-shared">
            <label className="text-muted">Best content shared till now:</label>
            <div class="progress">
              <div
                class="progress-bar text-white progress-bar-animated bg-info progress-bar-striped"
                role="progressbar"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "60%" }}
              >
                60%
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Stats;
