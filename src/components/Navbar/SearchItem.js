import React from "react";

export default props => {
  if (props.empty) {
    return <li className="col-12">No results</li>;
  }
  return (
    <li
      className="col-12 row"
      onClick={() => {
        props.handleUrlChange(props.user._id);
      }}
    >
      <div className="col-3">
        <img
          src={"http://159.89.171.16:9000/" + props.user.url}
          className="img-fluid"
        />
      </div>
      <div className="col-9">
        {props.user.fullname ? props.user.fullname : props.user._id}
      </div>
    </li>
  );
};
