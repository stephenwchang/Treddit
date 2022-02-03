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
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
// import PopoverHint from './PopoverHint'
import SelfText from './SelfText'
import Posts from './Posts';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
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
  gridRoot: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  score: {
    color: 'green',
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
      <div className={classes.gridRoot}>
        <ExpansionPanel
          expanded={expansionPanelOpen} TransitionProps={{ unmountOnExit: true }}>
          <IconLeftExpansionPanelSummary
            className={classes.panel}
            onClick={() => {setExpansionPanelOpen(!expansionPanelOpen)}}
            expandIcon={
              <Tooltip title={expansionPanelOpen ? "Collapse comment section" : "Expand comment section"}>
                <ExpandMoreIcon
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
                </ButtonBase>
            </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    {/* <Typography> */}
                      <a className='postTitleURL' href={props.url} target='_blank' rel='noopener noreferrer'>{props.title}</a>
                    {/* </Typography> */}
                    <Typography>{props.author} • {props.domain} • {props.num_comments} comments</Typography>
                    <Typography color="textSecondary">{props.subreddit}</Typography>
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
                    <Typography className={classes.score}>{props.score}
                      <div>upvotes</div>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </IconLeftExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component={'span'} variant={'body2'}>
            <SelfText selftext={props.selftext}/>
            <Comments id={props.id}/>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      // <ExpansionPanel
      // expanded={expansionPanelOpen} TransitionProps={{ unmountOnExit: true }}>
      //   <IconLeftExpansionPanelSummary
      //     className={classes.panel}
      //     onClick={() => {setExpansionPanelOpen(!expansionPanelOpen)}}
      //     expandIcon={
      //       <Tooltip title={expansionPanelOpen ? "Collapse comment section" : "Expand comment section"}>
      //         <ExpandMoreIcon
      //           onClick={() => {setExpansionPanelOpen(!expansionPanelOpen)}}
      //         >
      //         </ExpandMoreIcon>
      //         </Tooltip>
      //     }
      //     aria-controls="panel1a-content"
      //     id="panel1a-header"
      //     >
      //       <Typography className={classes.heading}>
      //         <Thumbnail className={classes.thumbnail} thumbnail={props.thumbnail} url={props.url}/>
      //         <a className='postTitleURL' href={props.url} target='_blank' rel='noopener noreferrer'>{props.title}</a>
      //         <div className='postSubreddit'>{props.subreddit}</div>
      //       </Typography>
      //   </IconLeftExpansionPanelSummary>

      //   <ExpansionPanelDetails>
      //     <Typography component={'span'} variant={'body2'}>
      //     <SelfText selftext={props.selftext}/>
      //     <Comments id={props.id}/>
      //     </Typography>
      //   </ExpansionPanelDetails>
      // </ExpansionPanel>

      // <div style={postStyle} onClick={this.props.renderComments.bind(this, this.props.id, this.state.toggled)}>
      //   {this.props.title}
      // </div>
    )
  }
