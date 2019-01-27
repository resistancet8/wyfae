import React, { Component } from "react";

class Stats extends Component {
  render() {
    return (
      <div className="mt-3">
        <h5 className="font-weight-bold text-muted">Statistics:</h5>
        <div className="stats-holder-self text-center">
          <div className="top">
            <div className="content-shared">
              <div className=" stats" style={{ background: "#ff5555" }}>
                <label className=" ">{this.props.stats.content_shared}</label>
              </div>
              <p className="">Shared</p>
            </div>
            <div className="no-of-likes">
              <div className=" stats" style={{ background: "#ffdd55" }}>
                <label className=" ">{this.props.stats.no_of_likes}</label>
              </div>
              <p className="">Likes</p>
            </div>
            <div className="no-of-comments">
              <div className="stats" style={{ background: "#55ff99" }}>
                <label className=" ">{this.props.stats.no_of_comments}</label>
              </div>
              <p className="">Comments</p>
            </div>
            
          </div>
          <div className="bottom">
          <div className="no-of-wins">
              <div className=" stats" style={{ background: "#8080ff" }}>
                <div className="content-shared">
                  <label className=" ">{this.props.stats.no_of_wins}</label>
                </div>
              </div>
              <p className="">Wins</p>
            </div>
            <div className="content-share-anonymous">
              <div
                className="stats"
                style={{ background: "#ffaaee" }}
              >
                <label className=" ">{this.props.stats.anonymous_shared}</label>
              </div>
              <p className="">Anonymous</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Stats;
