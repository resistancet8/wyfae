import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { FormGroup, Input, Button } from 'reactstrap';
import {Button as MuiBUTTON} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNested: false,
      nested_comment: "",
      nestedComments: props.comment.nested_comments || []
    };

    this.hadleViewReplies = this.hadleViewReplies.bind(this);
    this.handleNewNestedComment = this.handleNewNestedComment.bind(this);
    this.handleSubmitNestedComment = this.handleSubmitNestedComment.bind(this);
  }

  hadleViewReplies(e) {
    e.preventDefault();
    this.setState({
      showNested: !this.state.showNested
    })
  }

  handleNewNestedComment(e) {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmitNestedComment(comment_id) {
    this.props.handleNestedComment(this.props.post_id, comment_id, this.state.nested_comment, response => {
      this.setState({
        nestedComments: [...this.state.nestedComments, response],
        nested_comment: ""
      })
    });
  }

  render() {
    return (
      <li className="border-bottom my-2 py-2" id={"comment-id-" + this.props.comment.comment_id}>
        <div className="link-to-profile">
          <Link className="font-weight-bold" to={`/profile/${this.props.comment.username}`}>{this.props.comment.name}</Link>
        </div>
        <div className="pl-2 mb-2">{this.props.comment.comment_text}</div>
        {this.state.nestedComments.length > 0 && <a onClick={this.hadleViewReplies} className="font-weight-bold mb-2 d-block" href="#">{!this.state.showNested ? <div>View {this.state.nestedComments.length} replies</div> : <div>Hide replies</div>}</a>}
        <div className="pl-3">
          {this.state.nestedComments.length > 0 && this.state.showNested && <div>
            {this.state.nestedComments.map(nc => {
              return <div className="link-to-profile border-top" id={"nested-comment-id-" + nc.nested_comment_id}>
                <Link className="font-weight-bold" to={`/profile/${nc.username}`}>{nc.name}</Link>
                <div className="pl-2 mb-1">{nc.comment_text}</div>
                <div>
                  {this.props.auth.user.username === this.props.comment.username && <a href="#" style={{color: 'red'}} onClick={e => {e.preventDefault();this.props.deleteComment(this.props.post_id, nc.nested_comment_id, "yes")}}>Delete</a> }
                </div>
              </div>
            })}
          </div>}
        </div>
        {this.state.showNested && <div className="pl-3">
          <div className="link-to-profile border-top mb-2">
            <FormGroup className="mb-1">
              <Input type="text" id="nested_comment" placeholder="Add a reply..." className="d-block mt-2" onChange={this.handleNewNestedComment} value={this.state.nested_comment} />
            </FormGroup>
            <MuiBUTTON variant="outlined" type="submit" onClick={e => {
              this.handleSubmitNestedComment(this.props.comment.comment_id)
            }}>Submit</MuiBUTTON>
          </div>
        </div>}
        <MuiBUTTON variant="outlined" type="submit" onClick={this.hadleViewReplies}>Reply</MuiBUTTON >
        {this.props.auth.user.username === this.props.comment.username && <MuiBUTTON variant="outlined" color="secondary" type="submit" className="ml-2" onClick={e => {e.preventDefault();this.props.deleteComment(this.props.post_id, this.props.comment.comment_id, "no")}}>Delete </MuiBUTTON >}
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(
  mapStateToProps,
  null
)(Comments));