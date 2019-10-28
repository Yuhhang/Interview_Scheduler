import {
  InputAdornment, Paper, TextField, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import instance from '../../util/axios';
import DateTimePicker from './DateTimePicker';
import SubmmitDialog from './SubmmitDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    maxWidth: 500,
    minHeight: '100vh',
    paddingTop: 20,
    paddingBottom: 50,
    margin: 'auto',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

export default function CreateInterview() {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [values, setValues] = useState({
    eventName: '',
    place: '',
    timePerPerson: 10,
    nameListInput: '',
  });

  const nameList = values.nameListInput ? values.nameListInput.split('\n') : [];

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submmit = () => {
    instance.post('createEvent/', {
      ...values,
      startTime: Date.parse(selectedDate),
    }).then((res) => {
      const { data } = res;
      localStorage.setItem(data.info.id, JSON.stringify(data));
      window.location.replace(data.info.manage);
    }).catch(() => {
      // console.log(err);
    });
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" align="center">
        创建
      </Typography>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          fullWidth
          id="eventName"
          label="活动名称"
          className={classes.textField}
          value={values.eventName}
          onChange={handleChange('eventName')}
          margin="normal"
          variant="filled"
        />
        <TextField
          fullWidth
          id="place"
          label="活动地点"
          className={classes.textField}
          value={values.place}
          onChange={handleChange('place')}
          margin="normal"
          variant="filled"
        />
        <DateTimePicker
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
        />
        <TextField
          fullWidth
          id="time-per-person"
          label="预计面试人均时间"
          className={classes.textField}
          value={values.timePerPerson}
          onChange={handleChange('timePerPerson')}
          margin="normal"
          variant="filled"
          helperText="面试开始后会根据实际面试时间实时计算，此时间为显示的最小间隔"
          InputProps={{
            endAdornment: <InputAdornment position="end">min</InputAdornment>,
          }}
        />
        <TextField
          fullWidth
          id="filled-multiline-static"
          label="人员名单（一行一个）"
          multiline
          rows="10"
          value={values.nameListInput}
          onChange={handleChange('nameListInput')}
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
      </form>
      <SubmmitDialog data={nameList} submmit={submmit} />
    </Paper>
  );
}
