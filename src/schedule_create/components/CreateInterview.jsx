/* eslint-disable no-undef */
import { Button, InputAdornment, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import React, { useState } from 'react';
import instance from '../../util/axios';
import DateTimePicker from './DateTimePicker';
import SubmmitDialog from './SubmmitDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: 'lightBlue',
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
  // upload: {
  //   marginLeft: 20,
  //   marginTop: 20,
  // },
  // rightIcon: {
  //   marginLeft: theme.spacing(1),
  // },
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
      startTime: selectedDate,
    }).then((res) => {
      const { data } = res;
      localStorage.setItem(data.info.id, JSON.stringify(data));
    }).catch((err) => {
      console.log(err);
    });
  };

  // function handleFileUpload() {
  //   const file = document.getElementById('icon-button-file').files[0];
  //   if (!file) {
  //     return;
  //   }
  //   const reader = new FileReader();
  //   reader.onload = (evt) => {
  //     console.log(evt.target.result);
  //   };
  //   reader.readAsText(file, 'gb2312');
  // }

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

        {/* <input
          style={{ display: 'none' }}
          accept=".csv,.txt"
          id="icon-button-file"
          type="file"
          onChange={() => handleFileUpload()}
        />
        <Button
          variant="contained"
          color="default"
          className={classes.upload}
          onClick={() => document.getElementById('icon-button-file').click()}
        >
          上传人员名单
          <CloudUploadIcon className={classes.rightIcon} />
        </Button> */}
      </form>
      <SubmmitDialog data={nameList} submmit={submmit} />
    </Paper>
  );
}
