/* eslint-disable no-undef */
import { Typography, Button } from '@material-ui/core';
import React, { useContext } from 'react';
import context from '../context/context';


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
      <Typography variant="body2" color="textSecondary" align="left" style={{ wordBreak: 'break-all' }}>
        查看链接:
        {info.view}
        <Button onClick={() => navigator.clipboard.writeText(info.view)}>
          复制
        </Button>
      </Typography>
      <Typography variant="body2" color="textSecondary" align="left" style={{ wordBreak: 'break-all' }}>
        管理链接:
        {info.manage}
        <Button onClick={() => navigator.clipboard.writeText(info.manage)}>
          复制
        </Button>
      </Typography>
    </div>
  );
}
