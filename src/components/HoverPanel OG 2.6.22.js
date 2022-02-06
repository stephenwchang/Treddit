import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    background: 'rgb(104, 151, 187, .5)',
    margin: '5px 50px 0px 50px',
    align: 'center',
    flexGrow: '0',
    maxWidth: '20%',
  }
};



class HoverPanel extends React.Component {
  state = {
    open: true,
    vertical: 'bottom',
    horizontal: 'center',
  };


  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        <Snackbar
          ContentProps={{
            'aria-describedby': 'message-id',
            classes: {
              root: classes.root
            }
          }}
          anchorOrigin={{ vertical, horizontal }}
          open={true}
          onClose={this.handleClose}
          // ContentProps={{
          //   'aria-describedby': 'message-id',
          // }}
          message={<div className='returnToTop' id="message-id">return to top of
                    <div className='toTopOfSub'>
                      {this.props.currentSub}
                    </div>
                  </div>}
          TransitionComponent={Fade}
        >

        </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles)(HoverPanel);
