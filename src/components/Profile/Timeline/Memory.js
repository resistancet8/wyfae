import React, { Component } from "react";
import truncate from "truncate";
import Button from "@material-ui/core/Button";

export default class Memory extends Component {
  render() {
    let { memories } = this.props;
    let Memories = memories.map((memory, index) => {
      return (
        <div key={index} className="bg-white p-3 mb-2">
          <h2 className="font-weight-bold font-italic text-uppercase">
            {memory.title}
          </h2>
          {truncate(memory.content, 350)}
          <div className="mt-2">
            <Button
              variant="outlined"
              onClick={() => {
                this.props.modalToggle(memory);
              }}
            >
              Read More
            </Button>
          </div>
          <small className="font-italic font-weight-bold">
            By: {memory.author}
          </small>
          <br />
          <small className="font-italic font-weight-bold">
            Posted On: {memory.created_at}
          </small>
        </div>
      );
    });
    return <div>{Memories}</div>;
  }
}
