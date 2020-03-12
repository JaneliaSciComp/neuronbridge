import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import SearchTabs from "./components/SearchTabs";
import About from "./components/About";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <Route path="/" exact component={Landing} appProps={appProps} />
      <UnauthenticatedRoute
        path="/login"
        exact
        component={Login}
        appProps={appProps}
      />
      <UnauthenticatedRoute
        path="/signup"
        exact
        component={Signup}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/search/:searchType/:searchTerm"
        component={SearchTabs}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/search"
        component={SearchTabs}
        appProps={appProps}
      />
      <AuthenticatedRoute path="/about" component={About} appProps={appProps} />
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
}

Routes.propTypes = {
  appProps: PropTypes.object.isRequired
};
