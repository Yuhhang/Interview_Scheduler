import io from 'socket.io-client';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useEffect, useState } from 'react';
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
  gridRoot: {
    width: '100vw',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function transformTime(timestamp) {
  if (timestamp) {
    const time = new Date(timestamp);
    // const y = time.getFullYear();
    // const M = time.getMonth() + 1;
    // const d = time.getDate();
    const h = time.getHours().toString().padStart(2, '0');
    const m = time.getMinutes().toString().padStart(2, '0');
    const s = time.getSeconds().toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }
  return '';
}

export default function View(props) {
  const data = useContext(context);
  const { appState } = data;
  // console.log(appState);

  const { info } = appState;
  const { status } = appState;

  const { match } = props;
  const { params } = match;
  const { id } = params;

  const classes = useStyles();
  const date = new Date(info.startTime);

  const [connected, setConnected] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  useEffect(() => {
    instance.post('/getEvent', { id }).then((res) => {
      data.updateState(res.data);
    });
    const socket = io.connect(`https://interview.microsoftstudent.club/?id=${id}`);
    socket.on('connect', () => {
      setConnected(true);
    });
    socket.on('reconnect', () => {
      instance.post('/getEvent', { id }).then((res) => {
        data.updateState(res.data);
      });
    });
    socket.on('disconnect', () => {
      setConnected(false);
    });
    socket.on('update', (data1) => {
      data.updateState(data1);
      setLastUpdateTime(Date.now());
    });
    // console.log(socket);

    return () => {
      socket.close();
    };
  }, []);

  // if (!data) data = fetchData(id, key);

  function RenewStatus() {
    return (
      <Grid item xs={12}>
        <Paper
          className={classes.paper}
        >
          {connected ? '已连接推送服务器，上次刷新时间: ' : '正在与推送服务器建立连接...'}
          {connected ? transformTime(lastUpdateTime) : ''}
        </Paper>
      </Grid>
    );
  }

  function StatusPanel() {
    return (
      <Grid container spacing={3}>
        <RenewStatus />
        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            style={{
              backgroundColor: status.waiting ? '#fff59d' : status.start ? '#aed581' : '#bdbdbd',
              color: '#000000',
            }}
          >
            {status.waiting ? '等待中' : status.start ? '进行中' : `计划开始时间：${date.getMonth() + 1}月${date.getDate()}日 ${date.toLocaleTimeString()}`}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            {status.waiting ? '请 ' : '正在面试：'}
            {status.current.name || '无'}
            {status.waiting && ' 同学前往面试'}
          </Paper>
        </Grid>
      </Grid>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.gridRoot}>
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
