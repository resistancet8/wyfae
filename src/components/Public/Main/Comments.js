import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

function Comments(props) {
  return (
      <ListItem className="border-bottom">
        <ListItemText primary={props.comment.name} secondary={props.comment.comment_text} />
      </ListItem>
  );
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comments);