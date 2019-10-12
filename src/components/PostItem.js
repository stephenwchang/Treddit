import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Comments from './Comments';
import Thumbnail from './Thumbnail';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleExpansionPanel(props) {

    const classes = useStyles();
    const [expansionPanelOpen, setExpansionPanelOpen] = useState(false);


    return (

      <ExpansionPanel expanded={expansionPanelOpen} TransitionProps={{ unmountOnExit: true }} >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon onClick={() => {
            setExpansionPanelOpen(!expansionPanelOpen)
          }}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            <Thumbnail thumbnail={props.thumbnail} url={props.url}/>
            {props.title}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography component={'span'} variant={'body2'}>

          <Comments id={props.id} />

          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      // <div style={postStyle} onClick={this.props.renderComments.bind(this, this.props.id, this.state.toggled)}>
      //   {this.props.title}
      // </div>
    )
  }
