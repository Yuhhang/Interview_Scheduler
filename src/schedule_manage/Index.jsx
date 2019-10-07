/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { Snackbar, SnackbarContent } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useEffect, useState } from 'react';
import instance from '../util/axios';
import ActionPanel from './components/ActionPanel';
import EventInfo from './components/EventInfo';
import IntervieweeList from './components/IntervieweeList';
import context from './context/context';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#19a1af',
    minHeight: '100vh',
    padding: 10,
    flexGrow: 1,
  },
  gridRoot: {
    width: '100vw',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
}));

export default function Manage(props) {
  const data = useContext(context);
  const { appState } = data;
  // console.log(appState);

  const { info } = appState;
  const { status } = appState;

  const { match } = props;
  const { params } = match;
  const { id, key } = params;

  const [openMsgBar, setOpenMsgBar] = useState(false);
  const [updateErr, setUpdateErr] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    instance.post('/getEvent', {
      id,
      key,
    }).then((res) => {
      data.updateState(res.data);
    });
  }, []);

  useEffect(() => {
    if (appState.info.key === '') {
      return;
    }
    instance.post('/updateState', {
      id,
      key,
      newState: appState,
    }).then(() => {
      setOpenMsgBar(true);
      if (updateErr) {
        setUpdateErr(false);
      }
      setMessage('更新成功');
    }).catch(() => {
      setOpenMsgBar(true);
      if (!updateErr) {
        setUpdateErr(true);
      }
      setMessage('更新失败，请刷新重试');
    });
  }, [appState]);

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
            {status.waiting ? '等待中' : status.start ? '进行中' : `计划开始时间：${date.getMonth() + 1}月${date.getDate()}日 ${date.toLocaleTimeString()}`}
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

  function MsgBar() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={openMsgBar}
        autoHideDuration={3000}
        onClose={() => setOpenMsgBar(false)}
      >
        <SnackbarContent
          className={updateErr ? classes.error : classes.success}
          message={message}
        />
      </Snackbar>
    );
  }

  return (
    <div className={classes.root}>
      <MsgBar />
      <Grid container spacing={3} className={classes.gridRoot}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <EventInfo />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StatusPanel />
          <Paper className={classes.paper} style={{ marginTop: 20 }}>
            <ActionPanel />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          {/* <Paper className={classes.paper}>xs=12 sm=6</Paper> */}
          <IntervieweeList />
        </Grid>
      </Grid>
    </div>
  );
}
