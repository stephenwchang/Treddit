import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

const styles = theme => ({
  content: {
    minWidth: 80,
    minHeight: 30,
    backgroundColor: 'rgb(104, 151, 187, .7)',
    padding: 0,
    paddingLeft: '5px',
    paddingRight: '5px',
    margin: 5,
    '&:hover': { cursor: 'pointer'},
    fontSize: '11px',
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
          message={
                      // <div><img style={{maxHeight: 20, opacity: .5}} src='https://nejcslovnik.com/wp-content/uploads/2015/06/scroll-top.png' alt=''/>
                        <span id="message-id">return to top</span>
                      // </div>
                  }

        />
      </div>
    );
  }
}

HoverPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HoverPanel);
