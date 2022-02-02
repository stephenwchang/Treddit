import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const ranges = [
  {
    value: 'All',
    label: 'All',
  },
  {
    value: 'Funny',
    label: 'Funny',
  },
  {
    value: 'pics',
    label: 'pics',
  },
  {
    value: 'science',
    label: 'science',
  },
  {
    value: 'worldnews',
    label: 'worldnews',
  },
  {
    value: 'AskReddit',
    label: 'AskReddit',
  },
  {
    value: 'IAmA',
    label: 'IAmA',
  },
  {
    value: 'Videos',
    label: 'Videos',
  },
  {
    value: 'Movies',
    label: 'Movies',
  },
  {
    value: 'NBA',
    label: 'NBA',
  },
  {
    value: 'NFL',
    label: 'NFL',
  },
  {
    value: 'gifs',
    label: 'gifs',
  },
  {
    value: 'aww',
    label: 'aww',
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    marginBottom: '10px',
    marginRight: '10px'
  },
  textField: {
    flexBasis: 200,
  },
}));

export default function SubredditChoice(props) {



  const classes = useStyles();


  return (
    <div className={classes.root}>
      <TextField
        select
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="Current Subreddit"
        value={props.currentSub}
        onChange={props.handleChange}
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
      >
        {ranges.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-simple-start-adornment"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="Subreddit Search"
        onKeyDown={props.handleEnter}
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
      />

    </div>
  );
}
