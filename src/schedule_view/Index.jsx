/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useEffect } from 'react';
import context from '../schedule_manage/context/context';
import instance from '../util/axios';
import EventInfo from './components/EventInfo';
import IntervieweeList from './components/IntervieweeList';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#6adfb9',
    minHeight: '100vh',
    padding: 10,
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function View(props) {
  const data = useContext(context);
  const { appState } = data;
  // console.log(appState);

  const { info } = appState;
  const { status } = appState;

  const { match } = props;
  const { params } = match;
  const { id } = params;

  useEffect(() => {
    instance.post('/getEvent', { id }).then((res) => {
      data.initState(res.data);
    });
  }, []);

  // if (!data) data = fetchData(id, key);

  const classes = useStyles();
  const date = new Date(info.startTime);

  function StatusPanel() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            style={{
              backgroundColor: status.waiting ? '#fff59d' : status.start ? '#aed581' : '#bdbdbd',
            }}
          >
            {status.waiting ? '等待中' : status.start ? '进行中' : `计划开始时间：${date.toLocaleTimeString()}`}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            {status.waiting ? '正在等待：' : '正在面试：'}
            {status.current.name || '无'}
          </Paper>
        </Grid>
      </Grid>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <EventInfo />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StatusPanel />
        </Grid>

        <Grid item xs={12} sm={6}>
          {/* <Paper className={classes.paper}>xs=12 sm=6</Paper> */}
          <IntervieweeList />
        </Grid>
      </Grid>
    </div>
  );
}
