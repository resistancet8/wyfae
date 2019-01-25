import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Icon from "@material-ui/core/Icon";
import Memory from './Memory-Quotes/Memory';
import { connect } from 'react-redux';

const styles = {
  list: {
    width: "500px",
  },
  fullList: {
    width: 'auto',
  },
};

class SliderMemory extends React.Component {
  render() {
    return (
      <div >
        <Drawer
          anchor="right"
          open={this.props.slider}
          onClose={() => {
            this.props.toggleDrawer(false)
          }}
          onOpen={() => {
            this.props.toggleDrawer(true)
          }}
        >
          <div style={{
            padding: "80px"
          }}>
              <Icon fontSize="large" className="remove-icon" onClick={() => {
                this.props.toggleDrawer(false)
              }}>
                clear
              </Icon>
            <Memory part_id={this.props.part_id} submitArt={this.props.submitArt}/>
          </div>
        </Drawer>
      </div>
    );
  }
}

SliderMemory.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

export default withStyles(styles)(connect(mapStateToProps)(SliderMemory));