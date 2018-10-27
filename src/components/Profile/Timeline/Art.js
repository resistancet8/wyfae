import React, { Component } from "react";
import truncate from "truncate";
import Button from "@material-ui/core/Button";
import moment from "moment";

export default class Art extends Component {
  render() {
    let { arts } = this.props;
    let Arts = arts.map((art, index) => {
      return (
        <div key={index} className="bg-white p-3 mb-2">
        <span class="float-right badge badge-primary rounded">{art.shared_type}</span>
          <h2 className="font-weight-bold font-italic text-uppercase" style={{width: "80%"}}>
            {art.post_title}
          </h2>
          {art.url && (
            <div className="img-responsive">
              <img src={`http://159.89.171.16:9000/${art.url}`} alt="Image" />
            </div>
          )}
          <p>{truncate(art.text, 250)}</p>
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
            Category: {art.art_type}
          </small>
          <br />
          <small className="font-italic font-weight-bold">
            By: {art.author}
          </small>
          <br />
          <small className="font-italic font-weight-bold">
            Posted On: {moment(art.creation_time).format("DD/MM/YYYY")}
          </small>
        </div>
      );
    });
    return <div>{Arts}</div>;
  }
}
