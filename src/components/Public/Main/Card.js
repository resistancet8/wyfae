import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import truncate from 'truncate';
import moment from 'moment';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card + " mb-2"}>
      <CardContent>
        <Typography variant="h5" component="h2" className="font-weight-bold text-uppercase" color="textSecondary" gutterBottom>
         {props.post.post_title}
        </Typography>
        <Typography className={classes.pos + " font-italic"} color="textSecondary">
          {moment(props.post.creation_time).format("DD/MM/YYYY")}
        </Typography>
        <Typography component="p">
          {truncate(props.post.text, 150)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">Learn More</Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);