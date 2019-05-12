import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

function Comments(props) {

  return (
      <li className="border-bottom my-2 py-2">
        
        <ListItemText primary={<Link to={`/profile/${props.comment.username}`}>{props.comment.name}</Link>} secondary={props.comment.comment_text} />
      </li>
  );
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comments);