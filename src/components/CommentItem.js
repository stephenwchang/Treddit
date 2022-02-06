import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
}));


export default function CommentItem(props) {
  // recursively generate comments until end of replies

  const renderReplies = () => {
    if (props.replies[0]) {
      return props.replies.map((comment) => (
        <CommentItem key={comment.id} depth={comment.depth} authorName={comment.author.name} replies={comment.replies} score={comment.score} created={comment.created} bodyHtml={comment.body_html} body={comment.body}/>
      ));
    }
  }

  const classes = useStyles();

  // expand only up to a depth of 5 comments by default
  const expanded = props.replies[0] ? props.depth < 6 ? true : props.depth > 6 ? true : false : false;
  // manually control and set expansion state
  const [expansionPanelOpen, setExpansionPanelOpen] = useState(!expanded);
  // render icon only if expandable/collapsible
  const iconRender = props.replies[0] ?
  <Tooltip title={expansionPanelOpen ? "Collapse comment thread" : "Expand comment thread"}>
    <ExpandMoreIcon onClick={() => {
      setExpansionPanelOpen(!expansionPanelOpen)
    }}/>
  </Tooltip>
    : null;

  return (
    <div className='grid-root'>
      <ExpansionPanel defaultExpanded={expanded} expanded={expansionPanelOpen} TransitionProps={{ unmountOnExit: true }}>
      <ExpansionPanelSummary
        className = {classes.panel}
        onClick={() => {setExpansionPanelOpen(!expansionPanelOpen)}}
        expandIcon={iconRender}
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
{/* possibly include user avatar here */}
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>

              {/* <Typography className={classes.heading}> */}
                <div className='commentAuthor'>{props.authorName}</div>
                <p dangerouslySetInnerHTML={{ __html: props.bodyHtml }}>
                </p>
              {/* </Typography> */}
              <div className={classes.commentData}>{props.author} • {props.domain} • {props.subreddit}</div>
              <div className={classes.numComments}>{props.replies.length} {(props.replies.length === 1) ?  'reply' :  'replies'}</div>
            </Grid>

            </Grid>
            <Grid item>
              {/* <Typography className={classes.score}>{props.score}
                <div>points</div>
              </Typography> */}
            </Grid>
          </Grid>
        </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Typography component={'span'} variant={'body2'}>
          {renderReplies()}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    </div>
    )
}
