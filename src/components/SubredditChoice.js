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
    margin: theme.spacing(1),
  },
  textField: {
    flexBasis: 200,
  },
}));

export default function SubredditChoice(props) {



  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  // const handleChange = prop => event => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-simple-start-adornment"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="Enter a Subreddit!"
        onKeyDown={props.handleEnter}
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
      />
      <TextField
        select
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="Choose a subreddit!"
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
    </div>
  );
}
