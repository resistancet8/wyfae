import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
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
  media: {
    marginTop:'30',
    height: '50%',
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain',
  }
};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card + " mb-2"}>
      <CardHeader
          title={props.post.post_title}
          subheader= {moment(props.post.creation_time).format("DD/MM/YYYY")}
        />
        <div id="image-container">
          <CardMedia
            className={classes.media}
            image={`http://159.89.171.16:9000/${props.post.url}`}
            title="Contemplative Reptile"
          />
        </div>
      <CardContent>
        <Typography component="p">
          {truncate(props.post.text, 150)}
        </Typography>
        <Typography component="p">
          {props.post.author}
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