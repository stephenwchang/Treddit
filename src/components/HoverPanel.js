import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

const styles = theme => ({
  content: {
    minWidth: 80,
    minHeight: 20,
    backgroundColor: 'rgb(104, 151, 187, .8)',
    opacity: '.7',
    padding: 0,
    margin: 0,
    '&:hover': { cursor: 'pointer'},
  }
});

class HoverPanel extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
        /* you can also use 'auto' behaviour
           in place of 'smooth' */
      })


  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          open={true}
          onClick={this.handleClick}
          ContentProps={{
            "aria-describedby": "message-id",
            className: classes.content
          }}
          message={<span id="message-id">r/{this.props.currentSub}</span>}
        />
      </div>
    );
  }
}

HoverPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HoverPanel);
