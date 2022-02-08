import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import Thumbnail from './Thumbnail';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';


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
  numReplies: {
    '&:hover': { cursor: 'pointer', textDecoration: 'underline' },
    color: '#0000EE',
    opacity: '0.8',
    fontSize: '10px',
  },
  commentAuthor: {
    color: '#A55858',
    fontSize: '10px',
    bottomPadding: "0",
    // display: 'inline',
  },
  createdText: {
    fontSize: '10px',
    display: 'inline',
    float: 'right',
    color: 'black',
  },
  commentText: {
    fontSize: '12px',
    madWidth: '100%',
  },
  commentDataContainer: {
    lineHeight: 'normal',
    // overflowX: 'scroll',
    // width: 'auto',
    // whiteSpace: 'wrap',
  }
}));

  //move expandIcon to left
  const IconLeftExpansionPanelSummary = withStyles({
    expandIcon: {
        order: -1,
        marginRight: 0,
        maxWidth: '6px',
        // paddingLeft: '4px',
    },
    expandLess: {
      paddingLeft: '4px',
    }
  })(ExpansionPanelSummary);

export default function CommentItem(props) {
  // recursively generate comments until end of replies

  const renderReplies = () => {
    if (props.replies[0]) {
      return props.replies.map((comment) => (
        <CommentItem key={comment.id} depth={comment.depth} authorName={comment.author.name} replies={comment.replies} score={comment.score} created={comment.created} bodyHtml={comment.body_html} body={comment.body} convertTime={props.convertTime}/>
      ));
    }
  }

  const classes = useStyles();
  // expand only up to a depth of 5 comments by default
  // const expanded = props.replies[0] ? props.depth < 6 ? true : props.depth > 6 ? true : false : false;
  // manually control and set expansion state
  const [expansionPanelOpen, setExpansionPanelOpen] = useState(false);
  // render icon only if expandable/collapsible
  const iconRender = props.replies[0] ?
  <Tooltip title={expansionPanelOpen ? "Collapse comment thread" : "Expand comment thread"}>
    <ExpandMoreIcon style={{padding: '0px'}} onClick={() => {
      setExpansionPanelOpen(!expansionPanelOpen)
    }}/>
  </Tooltip> : <span style={{width: '4px'}}></span>
    // : <ExpandMoreIcon style={{visibility: 'hidden'}}/>; //temporary fix to align timestamp

  return (
    <div className='grid-root'>
      <ExpansionPanel defaultExpanded={false} expanded={expansionPanelOpen} TransitionProps={{ unmountOnExit: true }}>
      <IconLeftExpansionPanelSummary
        IconButtonProps={{edge: 'start'}}
        className = {classes.panel}
        onClick={() => {setExpansionPanelOpen(!expansionPanelOpen)}}
        expandIcon={iconRender}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {/* <Grid
        container spacing={16}
        direction="row"
        justifyContent="center"
        alignItems="center"
        > */}
        <Grid item>
{/* possibly include user avatar here */}
        </Grid>
        {/* <Grid item xs={6} sm container> */}
          {/* <Grid item xs container direction="column" spacing={16}> */}
            <Grid className={classes.commentDataContainer}item xs>
                <div className={classes.commentAuthor}>
                  {props.authorName}
                  <span className={classes.createdText}>{props.convertTime(props.created)}</span>
                </div>
                <div className={classes.commentText} dangerouslySetInnerHTML={{ __html: props.bodyHtml }}></div>
                <div className={classes.numReplies}>{(props.replies.length > 0 ) ? props.replies.length : 'No'} {(props.replies.length === 1) ?  'reply' :  'replies'}</div>
            </Grid>

            {/* </Grid> */}
          {/* </Grid> */}
        {/* </Grid> */}
        </IconLeftExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Typography component={'span'} variant={'body2'}>
          {renderReplies()}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    </div>
    )
}
