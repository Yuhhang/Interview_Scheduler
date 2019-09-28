// 开始、结束、下一位等操作
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import context from '../context/context';
import StartEndButton from './StartEndButton';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  nextButton: {
    width: '100%',
  },
}));


export default function ActionPanel() {
  const data = useContext(context);
  const { appState } = data;
  const { status } = appState;

  const classes = useStyles();

  function NextButton() {
    if (status.waiting) {
      return (
        <span>
          <Button
            color="primary"
            variant="contained"
            onClick={() => data.setStatusPresent()}
          >
            已到场
          </Button>
          <Button
            style={{ marginLeft: 20 }}
            color="secondary"
            variant="contained"
            onClick={() => data.setStatusunPresent()}
          >
            未到场
          </Button>
        </span>
      );
    }
    return (
      <Button
        disabled={!status.start}
        color="primary"
        variant="contained"
        onClick={() => data.setStatusNext()}
      >
        下一位
      </Button>
    );
  }

  return (
    <>
      <div className={classes.root}>
        <StartEndButton />
        <span className={classes.nextButton}>
          <NextButton />
        </span>
      </div>
    </>
  );
}
