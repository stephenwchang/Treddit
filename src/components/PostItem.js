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
    margin: '3px',
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
  numComments: {
    '&:hover': { cursor: 'pointer', textDecoration: 'underline' },
    color: "#808080",
    fontSize: '14px',

  },
  score: {
    color: 'green',
  },
  commentData: {
    display: 'flex',
  },
  authorText: {
    color: '#A55858',
    fontSize: '14px',
    marginRight: '10px',
  },
  subredditText: {
    color: '#0000EE',
    fontSize: '14px',
   '&:hover': { cursor: 'pointer', textDecoration: 'underline' },
  },
  createdText: {
    fontSize: '14px',
    fontStyle: 'italic',
    marginLeft: '5px',
  }
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
      <div className='grid-root'>
        <ExpansionPanel
          expanded={expansionPanelOpen} TransitionProps={{ unmountOnExit: true }}>
          <IconLeftExpansionPanelSummary
            className={classes.panel}
            style={{padding: '1px'}}
            onClick={() => {setExpansionPanelOpen(!expansionPanelOpen)}}
            expandIcon={
              <Tooltip title={expansionPanelOpen ? "Collapse comment section" : "Expand comment section"}>
                <ExpandMoreIcon
                  style={{padding: '0px'}}
                  onClick={() => {setExpansionPanelOpen(!expansionPanelOpen)}}
                >
                </ExpandMoreIcon>
              </Tooltip>
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid
            container spacing={16}
            direction="row"
            justifyContent="center"
            alignItems="center"
            >
              <Grid item>
                <ButtonBase className={classes.image}>
                  <Thumbnail className={classes.thumbnail} thumbnail={props.thumbnail} url={props.url}/>
                  <div style={{fontSize: '12px'}}>({props.domain})</div>
                </ButtonBase>
            </Grid>
              <Grid item xs={9} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                      <a className='postTitleURL' href={props.url} target='_blank' rel='noopener noreferrer'>{props.title}</a>
                      <span className={classes.createdText}>{props.convertTime(props.created)}</span>
                    <div className={classes.commentData}>
                      <div className={classes.authorText}>{props.author}</div>
                      {/* <div style={{ marginRight: '10px'}}>{props.domain}</div> */}
                      <div
                        className={classes.subredditText}
                        onClick={() => {
                          props.subredditClick(props.subreddit.substring(2))
                        }}
                      >{props.subreddit}</div>
                    {/* <div className={classes.createdText}>{props.convertTime(props.created)}</div> */}
                    </div>

                    <div className={classes.numComments}>{props.num_comments} comments</div>
                  </Grid>
                    {/* <Grid item>
                      <div
                        className='expandComments'
                        onClick={() => {setExpansionPanelOpen(!expansionPanelOpen)}}
                      >
                        click to expand
                      </div>
                    </Grid> */}
                  </Grid>
                  <Grid item>
                    {/* <Typography className={classes.score}>{props.score}
                      <div>points</div>
                    </Typography> */}
                  </Grid>
                </Grid>
              </Grid>
            </IconLeftExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component={'span'} variant={'body2'}>
            <SelfText selftext={props.selftext}/>
            <Comments id={props.id} convertTime={props.convertTime}/>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>

    )
  }
