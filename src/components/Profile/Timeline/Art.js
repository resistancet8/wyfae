import React, { Component } from "react";
import truncate from "truncate";
import Button from "@material-ui/core/Button";

export default class Art extends Component {
  render() {
    let { arts } = this.props;
    let Arts = arts.map((art, index) => {
      return (
        <div key={index} className="bg-white p-3 mb-2">
          <h2 className="font-weight-bold font-italic text-uppercase">
            {art.title}
          </h2>
          {truncate(art.content, 350)}
          <div className="mt-2">
            <Button
              variant="outlined"
              onClick={() => {
                this.props.modalToggle(art);
              }}
            >
              Read More
            </Button>
          </div>
          <small className="font-italic font-weight-bold">
            Category: {art.type}
          </small>
          <br />
          <small className="font-italic font-weight-bold">
            By: {art.author}
          </small>
          <br />
          <small className="font-italic font-weight-bold">
            Posted On: {art.created_at}
          </small>
        </div>
      );
    });
    return <div>{Arts}</div>;
  }
}
