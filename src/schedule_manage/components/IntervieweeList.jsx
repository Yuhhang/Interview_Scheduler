import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FaceIcon from '@material-ui/icons/Face';
import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import context from '../context/context';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function IntervieweeList() {
  const data = useContext(context);
  const { appState } = data;

  const classes = useStyles();
  const [expandFinished, setExpandFinished] = React.useState(true);
  const [edit, setEdit] = React.useState(false);
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function EditButton() {
    if (edit) {
      return (
        <span>
          <Button onClick={() => setEdit(!edit)}>取消</Button>
          <Button color="secondary">删除</Button>
        </span>
      );
    }
    return (
      <Button color="primary" onClick={() => setEdit(!edit)}>
        编辑
      </Button>
    );
  }

  function WaitingList() {
    return (
      <List
        component="nav"
        subheader={(
          <ListSubheader id="nested-list-subheader">
            <div>
              等候名单
              <span style={{ float: 'right' }}>
                <EditButton />
              </span>
            </div>
          </ListSubheader>
        )}
        className={classes.root}
      >
        {appState.waitingList
          && appState.waitingList.map((item) => {
            const labelId = `checkbox-list-label-${item.index}`;

            return (
              <ListItem
                key={item.index}
                role={undefined}
                dense
                button
                onClick={handleToggle(item.index)}
              >
                <ListItemIcon>
                  {edit ? (
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(item.index) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  ) : (
                    <FaceIcon />
                  )}
                </ListItemIcon>
                <ListItemText id={labelId} primary={item.name} />
                {edit && (
                  <ListItemSecondaryAction>
                    <IconButton
                      disableRipple
                      edge="end"
                      aria-label="comments"
                    >
                      <DragHandleIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            );
          })}
      </List>
    );
  }

  function InterviewedList() {
    return (
      <List
        component="nav"
        subheader={(
          <ListSubheader id="nested-list-subheader">
            已完成：
            {appState.interviewedList.length}
            /
            {appState.waitingList.length + appState.interviewedList.length}
          </ListSubheader>
        )}
        className={classes.root}
      >
        <List component="div" disablePadding>
          {appState.interviewedList
            && appState.interviewedList.map((item) => {
              const labelId = `interviewed-list-label-${item.index}`;
              return (
                <ListItem
                  className={classes.nested}
                  key={item.index}
                  role={undefined}
                  dense
                >
                  <ListItemIcon>
                    <FaceIcon />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={item.name} />
                </ListItem>
              );
            })}
        </List>
      </List>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <WaitingList />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InterviewedList />
      </Grid>
    </Grid>
  );
}
