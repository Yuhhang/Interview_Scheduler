import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FaceIcon from '@material-ui/icons/Face';
import React, { useContext } from 'react';
import context from '../../schedule_manage/context/context';

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
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    marginBottom: 25,
  },
}));

export default function IntervieweeList() {
  const data = useContext(context);
  const { appState } = data;
  const { info } = appState;
  const { timePerPerson } = info;
  const { status } = appState;

  const classes = useStyles();
  const [expandunPresent, setExpandunPresent] = React.useState(true);

  function ApproximatelyTimeLater({ index }) {
    const { startTime } = info;
    const currentTimeStamp = Date.now();

    const interviewedNum = appState.interviewedList.length || 1;
    const min = (currentTimeStamp - startTime) / 60000; // 已经过去的分钟数
    let minPerPerson = parseInt(min / interviewedNum, 10);
    if (minPerPerson < timePerPerson) {
      minPerPerson = timePerPerson;
    }

    return (
      <span>
        {`+${index * minPerPerson} min`}
      </span>
    );
  }

  function ViewerInfo() {
    const [inputName, setInputName] = React.useState('');
    const index = appState.waitingList.findIndex((item) => item.name === inputName);

    return (
      <Paper
        className={classes.paper}
      >
        <TextField
          id="input-personal_info"
          label="输入您的个人信息"
          value={inputName}
          onChange={(event) => setInputName(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          style={{
            paddingBottom: 5,
          }}
        />
        {index !== -1
          ? (
            <>
              <Typography variant="body2" color="textPrimary">
                还有
                {index}
                个人轮到您
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {ApproximatelyTimeLater({ index })}
              </Typography>
            </>
          ) : (
            <Typography variant="body2" color="textSecondary">
              无匹配
            </Typography>
          )}
      </Paper>
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
            </div>
          </ListSubheader>
        )}
        className={classes.root}
      >
        {appState.waitingList
          && appState.waitingList.map((item, index) => {
            const labelId = `checkbox-list-label-${item.index}`;

            return (
              <ListItem
                key={item.index}
                role={undefined}
                dense
              >
                <ListItemIcon>
                  <FaceIcon />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={item.name}
                  secondary={
                    status.start && (index !== 0 ? <ApproximatelyTimeLater index={index} /> : '下一位')
                  }
                />
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
            {appState.waitingList.length
              + appState.interviewedList.length
              + appState.unPresent.length}
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
        <ListItem button onClick={() => setExpandunPresent(!expandunPresent)}>
          <ListItemText primary="未到场" />
          {expandunPresent ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={expandunPresent} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <UnPresentList />
          </List>
        </Collapse>
      </List>
    );
  }

  function UnPresentList() {
    return (
      <List component="div" disablePadding>
        {appState.unPresent
          && appState.unPresent.map((item) => {
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
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <ViewerInfo />
        <WaitingList />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InterviewedList />
      </Grid>
    </Grid>
  );
}
