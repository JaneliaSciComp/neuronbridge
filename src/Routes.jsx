import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
// cant lazy load this as it breaks the AWS APIs
import SearchErrorBoundary from "./components/SearchErrorBoundary";
import Landing from "./components/Landing";
import config from "./config";

const ReleaseNotes = React.lazy(() => import("./components/ReleaseNotes"));
const About = React.lazy(() => import("./components/About"));
const Admin = React.lazy(() => import("./components/Admin"));
const Login = React.lazy(() => import("./components/Login"));
const HelpPage = React.lazy(() => import("./components/HelpPage"));
const Signup = React.lazy(() => import("./components/Signup"));
const Search = React.lazy(() => import("./components/Search"));
const Results = React.lazy(() => import("./components/Results"));
const Maintenance = React.lazy(() => import("./components/Maintenance"));
const MaskSelection = React.lazy(() => import("./components/MaskSelection"));
const CustomSearchList = React.lazy(() =>
  import("./components/CustomSearchList")
);
const NotFound = React.lazy(() => import("./components/NotFound"));
const UsageTerms = React.lazy(() => import("./components/UsageTerms"));
const ResetPassword = React.lazy(() => import("./components/ResetPassword"));

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
          component={SearchErrorBoundary}
          appProps={appProps}
        />
        <AuthenticatedRoute
          path="/search/:searchType?/:searchTerm?"
          component={Search}
          appProps={appProps}
        />
        <AuthenticatedRoute
          path="/upload"
          component={config.UNDER_MAINTENANCE ? Maintenance : CustomSearchList}
          appProps={appProps}
        />
        <AuthenticatedRoute
          path="/results/:id"
          component={config.UNDER_MAINTENANCE ? Maintenance : Results}
          appProps={appProps}
        />
        <AuthenticatedRoute
          path="/mask-selection/:id"
          component={config.UNDER_MAINTENANCE ? Maintenance : MaskSelection}
          appProps={appProps}
        />

        <Route path="/about" component={About} />
        <AuthenticatedRoute
          path="/admin"
          component={Admin}
          appProps={appProps}
        />
        <Route path="/releasenotes/:name" component={ReleaseNotes} />
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
