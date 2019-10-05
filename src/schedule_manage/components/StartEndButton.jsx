import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, red } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useContext } from 'react';
import context from '../context/context';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -9,
    left: -9,
    zIndex: 1,
  },
  buttonText: {
    color: theme.palette.text,
  },
}));

export default function CircularIntegration() {
  const data = useContext(context);
  const { appState } = data;
  const { status } = appState;

  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [loadingPercent, setLoadingPercent] = React.useState(0);

  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: status.start,
  });

  // eslint-disable-next-line arrow-body-style
  React.useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  const handleLongPressStart = () => {
    if (!loading) {
      setLoading(true);
      timer.current = setInterval(() => {
        setLoadingPercent((t) => t + 10);
      }, 200);
    }
  };

  const handleLongPressEnd = () => {
    if (loading) {
      setLoading(false);
      if (timer.current) {
        clearInterval(timer.current);
      }
      setLoadingPercent(0);
    }
  };

  useEffect(() => {
    if (loadingPercent > 100) {
      if (status.start) {
        data.setStatusEnd();
      } else {
        data.setStatusStart();
      }
      setLoading(false);
      setLoadingPercent(0);
      clearInterval(timer.current);
    }
    // console.log(loadingPercent);
  });

  return (
    <div className={classes.wrapper}>
      <Fab
        style={{ zIndex: 10, width: 80, height: 80 }}
        className={buttonClassname}
        disabled={!status.start && status.end}
        onMouseDown={handleLongPressStart}
        onMouseUp={handleLongPressEnd}
        onTouchStart={handleLongPressStart}
        onTouchEnd={handleLongPressEnd}
      >
        <Typography className={classes.buttonText}>
          {status.start ? '长按终止' : (status.end ? '已结束' : '长按开始')}
        </Typography>
      </Fab>
      <CircularProgress size={98} className={classes.fabProgress} variant="static" value={loadingPercent} />
    </div>
  );
}
