import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));



export default function CommentItem(props) {
  // recursively generate comments until no more replies exist

  const renderReplies = () => {
    if (props.replies[0]) {
      return props.replies.map((comment) => (
        <CommentItem key={comment.id} depth={comment.depth} authorName={comment.author.name} replies={comment.replies} score={comment.score} created={comment.created} bodyHtml={comment.body_html} body={comment.body}/>
      ));
    }
  }
  const classes = useStyles();

  // expand only up to a depth of 5 comments by default
  const expanded = props.replies[0] ? true : false;
  const iconRender = props.replies[0] ? <ExpandMoreIcon/> : null;


  return (
    <ExpansionPanel defaultExpanded={expanded}>
      <ExpansionPanelSummary
        expandIcon={iconRender}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>
          <p dangerouslySetInnerHTML={{ __html: props.bodyHtml }}>
          </p>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography component={'span'} variant={'body2'}>
          {renderReplies()}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
        // deprecated original comment generating code - inefficient and unable to collapse - used manual css indenting
        // <div>
        //   <div className='commentItem' style={{marginLeft: `${((this.props.depth) * 20).toString()}px` }}>
        //     <div style={authorStyle}>{this.props.authorName}</div>
        //     <p dangerouslySetInnerHTML={{ __html: this.props.bodyHtml }}>
        //     </p>
        //   </div>
        //   {this.renderReplies()}
        // </div>

      )
}

const authorStyle = {
  color: "blue"
}
