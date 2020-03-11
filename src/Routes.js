import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Landing from "./containers/Landing";
import SearchTabs from "./containers/SearchTabs";
import About from "./containers/About";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <Route path="/" exact component={Landing} appProps={appProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AuthenticatedRoute path="/search/lines/:elemId" component={SearchTabs} appProps={appProps} />
      <AuthenticatedRoute path="/search/lines" component={SearchTabs} appProps={appProps} />
      <AuthenticatedRoute path="/search/skeletons/:elemId" component={SearchTabs} appProps={appProps} />
      <AuthenticatedRoute path="/search/skeletons" component={SearchTabs} appProps={appProps} />
      <AuthenticatedRoute path="/search/matches" component={SearchTabs} appProps={appProps} />
      <AuthenticatedRoute path="/about" component={About} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}
