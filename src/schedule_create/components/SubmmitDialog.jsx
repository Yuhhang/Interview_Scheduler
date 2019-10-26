import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import React from 'react';

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function SubmmitDialog({ data, submmit }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography align="center">
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          提交
        </Button>
      </Typography>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-slide-title">
          确认录入的名单（共
          {data.length}
          人）
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <List>
              {data.length !== 0
                ? data.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <ListItem key={index}>
                    <ListItemText primary={`${index + 1}. ${item}`} />
                  </ListItem>
                ))
                : <ListItemText primary="无" />}
            </List>
            <Typography variant="body2" color="textPrimary" align="left">
              提醒：新生成的活动将在服务器保留七天后移除
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            取消
          </Button>
          <Button onClick={submmit} color="primary">
            生成活动
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
