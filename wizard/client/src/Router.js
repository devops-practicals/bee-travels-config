import React from "react";
import AppPage from "./views/AppPage"
import Config from "./views/Config"
import { Router, Switch, Route } from "react-router-dom";
import history from "./globalHistory";

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/config" exact component={Config} />
        <Route path="/" component={AppPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
