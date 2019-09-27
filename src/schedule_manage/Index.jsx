/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IntervieweeList from './components/IntervieweeList';
import ActionPanel from './components/ActionPanel';
import EventInfo from './components/EventInfo';
import instance from '../util/axios';
import context from './context/context';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#4db6ac',
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

async function fetchData(id, key) {
  let data;
  try {
    data = await instance.get(`/manage?id=${id}&key=${key}`);
  } catch (error) {
    return null;
  }
  console.log(data);
  return data;
}

export default function Manage(props) {
  const data = useContext(context);

  const { match } = props;
  const { params } = match;
  const { id, key } = params;

  useEffect(() => {
    const dataStore = localStorage.getItem(id);
    if (dataStore) {
      data.initState(JSON.parse(dataStore));
    }
  }, []);

  // if (!data) data = fetchData(id, key);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <EventInfo />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <ActionPanel />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <Paper className={classes.paper}>xs=12 sm=6</Paper> */}
          <IntervieweeList />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
