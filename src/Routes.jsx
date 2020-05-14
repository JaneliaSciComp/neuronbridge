import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Landing from "./components/Landing";
// cant lazy load this as it breaks the AWS APIs
import UnifiedSearch from "./components/UnifiedSearch";

const About = React.lazy(() => import('./components/About'));
const Login = React.lazy(() => import('./components/Login'));
const HelpPage = React.lazy(() => import('./components/HelpPage'));
const Signup = React.lazy(() => import('./components/Signup'));
const Search = React.lazy(() => import('./components/Search'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const UsageTerms = React.lazy(() => import('./components/UsageTerms'));
const ResetPassword = React.lazy(() => import('./components/ResetPassword'));

export default function Routes({ appProps }) {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route path="/" exact>
          <Landing isAuthenticated={appProps.isAuthenticated} />
        </Route>
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
        <UnauthenticatedRoute
          path="/login/reset"
          exact
          component={ResetPassword}
          appProps={appProps}
        />
        <AuthenticatedRoute
          path="/search"
          exact
          component={UnifiedSearch}
          appProps={appProps}
        />
        <AuthenticatedRoute
          path="/search/:searchType?/:searchTerm?"
          component={Search}
          appProps={appProps}
        />
        <Route path="/about" component={About} />
        <Route path="/usage" component={UsageTerms} />
        <Route path="/help" component={HelpPage} />
        {/* Finally, catch all unmatched routes */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

Routes.propTypes = {
  appProps: PropTypes.object.isRequired
};
