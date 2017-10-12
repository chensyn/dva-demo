import React from 'react';
import { Router, Route } from 'dva/router';

//import Users from "./routes/Main.js";
import MainLayout from './components/MainLayout/Layout';
import Users from './components/Users/Users';
import Login from './components/Login';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Login}/>
      <Route path="/login" component={Login}/>
      <Route path="/index" component={MainLayout}>
        <Route path="/users" component={Users}></Route>
      </Route>
    </Router>
  );
}
export default RouterConfig;
