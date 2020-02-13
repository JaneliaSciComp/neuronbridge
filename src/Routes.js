import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Landing from "./containers/Landing";
import NewNote from "./containers/NewNote";
import EditNote from "./containers/EditNote";
import SearchTabs from "./containers/SearchTabs";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Landing} appProps={appProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AuthenticatedRoute path="/search/lines/:elemId" component={SearchTabs} appProps={appProps} />
      <AuthenticatedRoute path="/search/lines" component={SearchTabs} appProps={appProps} />
      <AuthenticatedRoute path="/search/skeletons/:elemId" component={SearchTabs} appProps={appProps} />
      <AuthenticatedRoute path="/search/skeletons" component={SearchTabs} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}