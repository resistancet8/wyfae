import React, { Component } from "react";

class Stats extends Component {
  render() {
    return (
      <div>
        <h5 className="font-weight-bold ">STATISTICS:</h5>
        <div className="stats-holder-self">
          <div className="top">
            <div className="content-shared stats" style={{background: "#ff5555"}}>
              <label className=" ">{this.props.stats.content_shared}</label>
              <p className="">Shared</p>
            </div>
            <div className="no-of-likes stats" style={{background: "#ffdd55"}}>
              <label className=" ">{this.props.stats.no_of_likes}</label>
              <p className="">Likes</p>
            </div>
            <div className="no-of-wins stats" style={{background: "#8080ff"}}>
              <div className="content-shared">
                <label className=" ">{this.props.stats.no_of_wins}</label>
                <p className="">Wins</p>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="no-of-comments stats" style={{background: "#55ff99"}}>
              <label className=" ">{this.props.stats.no_of_comments}</label>
              <p className="">Comments</p>
            </div>
            <div className="content-share-anonymous stats" style={{background: "#ffaaee"}}>
              <label className=" ">{this.props.stats.anonymous_shared}</label>
              <p className="">Anonymous</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Stats;
