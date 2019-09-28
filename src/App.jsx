import { Button, Paper, Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import {
  HashRouter, Link, Route, Switch,
} from 'react-router-dom';
import GlobalState from './schedule_manage/context/GlobalState';
import Create from './schedule_create/Index';
import Manage from './schedule_manage/Index';
import View from './schedule_view/Index';


function IndexPage() {
  return (
    <Paper
      style={{
        maxWidth: 500,
        height: '100vh',
        margin: 'auto',
        borderRadius: 0,
      }}
    >
      <Typography
        variant="h5"
        component="h3"
        align="center"
      >
        MSC面试时间表
      </Typography>
      <Typography
        align="center"
        style={{ marginTop: 300 }}
      >
        <Button
          variant="outlined"
          color="default"
          component={Link}
          to="/create"
        >
          创建面试时间表
        </Button>
        {/* <Button
          variant="outlined"
          color="default"
          component={Link}
          to="/view"
        >
          查看
        </Button>
        <Button
          variant="outlined"
          color="default"
          component={Link}
          to="/manage"
        >
          管理
        </Button> */}
      </Typography>
    </Paper>
  );
}


function App() {
  const darkThemeSys = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const theme = createMuiTheme({
    palette: {
      type: darkThemeSys ? 'dark' : 'light',
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalState>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={IndexPage} />
            <Route path="/view/:id" component={View} />
            <Route path="/create" component={Create} />
            <Route path="/manage/:id/:key" component={Manage} />
            {/* No Match */}
            <Route component={IndexPage} />
          </Switch>
        </HashRouter>
      </GlobalState>
    </MuiThemeProvider>
  );
}

export default App;
