import { Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import context from '../../schedule_manage/context/context';


export default function EventInfo() {
  const data = useContext(context);
  const { appState } = data;
  const { info } = appState;

  return (
    <div>
      <Typography variant="h4" color="textPrimary">
        {info.eventName}
      </Typography>
      <Typography variant="h6" color="textPrimary" align="left">
        地点:
        {info.place}
      </Typography>
    </div>
  );
}
