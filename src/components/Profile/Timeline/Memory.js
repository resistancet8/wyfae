import React, { Component } from "react";
import truncate from "truncate";
import Button from "@material-ui/core/Button";
import moment from "moment";

export default class Memory extends Component {
  render() {
    let { memories } = this.props;
    let Memories = memories.map((memory, index) => {
      console.log(memory)
      return (
        <div key={index} className="bg-white p-3 mb-2">
        <span class="float-right badge badge-primary rounded">{memory.shared_type}</span>
          <h2 className="font-weight-bold font-italic text-uppercase">
            {memory.post_title}
          </h2>
          {memory.url && (
            <div className="img-responsive">
              <img
                src={`http://159.89.171.16:9000/${memory.url}`}
                alt="Image"
              />
            </div>
          )}
          <p>{truncate(memory.text, 250)}</p>
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
            Posted On: {moment(memory.creation_time).format("DD/MM/YYYY")}
          </small>
        </div>
      );
    });
    return <div>{Memories}</div>;
  }
}
