import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import Comments from './Comments';
import Thumbnail from './Thumbnail';
import PopoverHint from './PopoverHint'
import SelfText from './SelfText'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const IconLeftExpansionPanelSummary = withStyles({
    expandIcon: {
        order: -1,
        marginRight: 5,
    }
})(ExpansionPanelSummary);


export default function PostItem(props) {

    const classes = useStyles();
    const [expansionPanelOpen, setExpansionPanelOpen] = useState(false);

    return (
      <ExpansionPanel expanded={expansionPanelOpen} TransitionProps={{ unmountOnExit: true }}>
        <IconLeftExpansionPanelSummary
          expandIcon={
            <Tooltip title={expansionPanelOpen ? "Collapse comment section" : "Expand comment section"}>
              <ExpandMoreIcon
                onClick={() => {setExpansionPanelOpen(!expansionPanelOpen)}}
              >
                <PopoverHint/>
              </ExpandMoreIcon>
              </Tooltip>
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          >

          <Typography className={classes.heading}>
            <Thumbnail thumbnail={props.thumbnail} url={props.url}/>
            <a className='postTitleURL' href={props.url} target='_blank' rel='noopener noreferrer'>{props.title}</a>
            <div className='postSubreddit'>{props.subreddit}</div>
          </Typography>
        </IconLeftExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Typography component={'span'} variant={'body2'}>
          <SelfText selftext={props.selftext}/>
          <Comments id={props.id}/>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      // <div style={postStyle} onClick={this.props.renderComments.bind(this, this.props.id, this.state.toggled)}>
      //   {this.props.title}
      // </div>
    )
  }
