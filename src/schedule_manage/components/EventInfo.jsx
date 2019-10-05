/* eslint-disable no-undef */
import { Typography, Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import context from '../context/context';


export default function EventInfo() {
  const data = useContext(context);
  const { appState } = data;
  const { info } = appState;

  const [copySuccess, setCopySuccess] = useState(undefined);

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess(true);
      })
      .catch(() => {
        setCopySuccess(false);
      })
      .finally(() => {
        setTimeout(() => {
          setCopySuccess(undefined);
        }, 1000);
      });
  }

  return (
    <div style={{ wordBreak: 'break-all' }}>
      <Typography variant="h4" color="textPrimary">
        {info.eventName}
      </Typography>
      <Typography variant="h6" color="textPrimary" align="left">
        地点:
        {info.place}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="left">
        查看链接:
        {info.view}
        <Button
          size="small"
          style={{ marginLeft: 10 }}
          variant="contained"
          onClick={() => copyToClipboard(info.view)}
        >
          {copySuccess === undefined ? '复制' : copySuccess ? '复制成功' : '写入剪切板失败,请手动复制'}
        </Button>
      </Typography>
      <Typography variant="body2" color="textSecondary" align="left">
        管理链接:
        {info.manage}
        <Button
          size="small"
          style={{ marginLeft: 10 }}
          variant="contained"
          onClick={() => copyToClipboard(info.manage)}
        >
          {copySuccess === undefined ? '复制' : copySuccess ? '复制成功' : '写入剪切板失败,请手动复制'}
        </Button>
      </Typography>
    </div>
  );
}
