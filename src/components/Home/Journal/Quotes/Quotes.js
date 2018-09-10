import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

class Quotes extends Component {
  render() {
    let Quotes = this.props.quotes.map(quote => {
      return (
        <p>
          {quote.quote}
          <strong className="font-italic" key={quote}>
            {" - "}
            {quote.author}
          </strong>
        </p>
      );
    });

    return (
      <React.Fragment>
        <div className="row">
          <h5 className="text-muted font-weight-bold">Quotes</h5>
        </div>
        <div className="row quotes-holder mt-3">{Quotes}</div>
      </React.Fragment>
    );
  }
}

export default Quotes;
