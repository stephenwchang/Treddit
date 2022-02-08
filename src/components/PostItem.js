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
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import SelfText from './SelfText'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  panel: {
    '&:hover': { background: '#F3F4F6'},
    margin: '1px',
    '&:active': {
      backgroundColor: '#EDEFF2',
      boxShadow: 'rgba(225, 228, 232, 0.2) 0 1px 0 inset',
      transition: 'none 1s',
    },
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    marginRight: '10px',
    display: 'inline',
  },
  selfTextContainer: {
    overflowX: 'auto',
    // width: 'auto',
  },
  selfText: {
    fontWeight: 300,
  }
}));

//move expandIcon to left
const IconLeftExpansionPanelSummary = withStyles({
    expandIcon: {
        order: -1,
        marginRight: 0,
    },
})(ExpansionPanelSummary);


export default function PostItem(props) {

    const classes = useStyles();
    const [expansionPanelOpen, setExpansionPanelOpen] = useState(false);

    return (
      <div className='grid-root'>
        <ExpansionPanel
          expanded={expansionPanelOpen} TransitionProps={{ unmountOnExit: true }}>
          <IconLeftExpansionPanelSummary
            onClick={() => {setExpansionPanelOpen(!expansionPanelOpen)}}
            className={classes.panel}
            style={{padding: '1px'}}
            // onClick={() => {setExpansionPanelOpen(!expansionPanelOpen)}}
            expandIcon={
              <Tooltip title={expansionPanelOpen ? "Collapse comment section" : "Expand comment section"}>
                <ExpandMoreIcon
                  style={{}}
                  onClick={() => {setExpansionPanelOpen(!expansionPanelOpen)}}
                >
                </ExpandMoreIcon>
              </Tooltip>
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid container spacing={16} direction="row" justifyContent="left"alignItems="center">
              <Grid item>
                <ButtonBase className={classes.image}>
                  <Thumbnail className={classes.thumbnail} thumbnail={props.thumbnail} url={props.url}/>
                  <div className='domainText'>({props.domain})</div>
                </ButtonBase>
              </Grid>
              {/* <Grid item xs={7} md={10} container> */}
                <Grid item xs container direction="column" spacing={1}>
                  <Grid item>
                    <span className='postTitleURL' href={props.url} target='_blank' rel='noopener noreferrer'>{props.title}</span>
                    <span className='createdText'>{props.convertTime(props.created)}</span>
                    <div className='commentData'>
                      <div className='authorText'>{props.author}</div>
                      <div
                        className='subredditText'
                        onClick={() => {
                          props.subredditClick(props.subreddit.substring(2))
                        }}
                      >{props.subreddit}</div>
                    </div>
                    <div className='numComments'>{props.num_comments} comments</div>
                  </Grid>
                </Grid>
            </Grid>
            </IconLeftExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component={'span'} variant={'body2'}>
            <div className={classes.selfTextContainer}>
              <SelfText className={classes.selfText} selftext={props.selftext}/>
            </div>
            <Comments id={props.id} convertTime={props.convertTime}/>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
