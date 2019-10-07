import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import context from '../context/context';

export default function FormDialog({ open, setOpen }) {
  const data = useContext(context);
  const { appState } = data;

  const [input, setInput] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmmit = () => {
    let lastIndex = appState.waitingList[appState.waitingList.length - 1].index;

    data.updateState({
      ...appState,
      waitingList: [...appState.waitingList, ...input.split('\n').map((item) => {
        lastIndex += 1;
        return {
          index: lastIndex,
          name: item,
          skip: false,
        };
      })],
    });
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">添加</DialogTitle>
        <DialogContent>
          <TextField
            value={input}
            onChange={(event) => setInput(event.target.value)}
            autoFocus
            multiline
            fullWidth
            rows={3}
            margin="dense"
            id="addInput"
            label="名单（一行一个）"
            type="text"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            取消
          </Button>
          <Button onClick={handleSubmmit} color="primary">
            添加
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
