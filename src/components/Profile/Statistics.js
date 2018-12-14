import React, { Component } from "react";

class Stats extends Component {
  render() {
    return (
      <div>
        <h5 className="font-weight-bold text-muted">
          <i className="fas fa-chart-pie mr-1" /> STATISTICS:
        </h5>
        <div className="content-shared stats">
          <label className="text-muted">Total Number of Content Shared:</label>
          <label className="float-right text-muted">
            {this.props.stats.content_shared}
          </label>
          <div className="progress">
            <div
              className="progress-bar text-white progress-bar-animated bg-success progress-bar-striped"
              role="progressbar"
              style={{ width: this.props.stats.content_shared + "%" }}
            >
              {this.props.stats.content_shared}
            </div>
          </div>
        </div>
        <div className="no-of-likes stats">
          <div className="content-shared">
            <label className="text-muted">Total Number of Likes:</label>
            <label className="float-right text-muted">
              {this.props.stats.no_of_likes}
            </label>
            <div className="progress">
              <div
                className="progress-bar text-white progress-bar-animated bg-dark progress-bar-striped"
                role="progressbar"
                style={{ width: this.props.stats.no_of_likes + "%" }}
              >
                {this.props.stats.no_of_likes}
              </div>
            </div>
          </div>
        </div>
        <div className="no-of-wins stats">
          <div className="content-shared">
            <label className="text-muted">Total Number of Wins:</label>
            <label className="float-right text-muted">
              {this.props.stats.no_of_wins}
            </label>
            <div className="progress">
              <div
                className="progress-bar text-white progress-bar-animated bg-danger progress-bar-striped"
                role="progressbar"
                style={{ width: this.props.stats.no_of_wins + "%" }}
              >
                {this.props.stats.no_of_wins}
              </div>
            </div>
          </div>
        </div>
        <div className="no-of-comments stats">
          <div className="content-shared">
            <label className="text-muted">Total Number of Comments:</label>
            <label className="float-right text-muted">
              {this.props.stats.no_of_comments}
            </label>
            <div className="progress">
              <div
                className="progress-bar text-white progress-bar-animated bg-primary progress-bar-striped"
                role="progressbar"
                style={{ width: this.props.stats.no_of_comments + "%" }}
              >
                {this.props.stats.no_of_comments}
              </div>
            </div>
          </div>
        </div>
        <div className="content-share-anonymous stats">
          <div className="content-shared">
            <label className="text-muted">
              No. Of Times Content Shared Anonymously:
            </label>
            <label className="float-right text-muted">
              {this.props.stats.anonymous_shared}
            </label>
            <div className="progress">
              <div
                className="progress-bar text-white progress-bar-animated bg-warning progress-bar-striped"
                role="progressbar"
                style={{ width: this.props.stats.anonymous_shared + "%" }}
              >
                {this.props.stats.anonymous_shared}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Stats;
