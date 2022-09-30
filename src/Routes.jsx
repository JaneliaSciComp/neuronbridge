import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
// cant lazy load this as it breaks the AWS APIs
import SearchErrorBoundary from "./components/SearchErrorBoundary";
import Landing from "./components/Landing";
import config from "./config";

const ReleaseNotes = React.lazy(() =>
  import(/* webpackChunkName: 'rel-notes' */ "./components/ReleaseNotes")
);
const About = React.lazy(() =>
  import(/* webpackChunkName: 'about' */ "./components/About")
);
const Admin = React.lazy(() =>
  import(/* webpackChunkName: 'admin' */ "./components/Admin")
);
const Login = React.lazy(() =>
  import(/* webpackChunkName: 'login' */ "./components/Login")
);
const HelpPage = React.lazy(() =>
  import(/* webpackChunkName: 'help' */ "./components/HelpPage")
);
const Signup = React.lazy(() =>
  import(/* webpackChunkName: 'signup' */ "./components/Signup")
);
const Search = React.lazy(() =>
  import(/* webpackChunkName: 'search' */ "./components/Search")
);
const SearchMatches = React.lazy(() =>
  import(/* webpackChunkName: 'search-matches' */ "./components/SearchMatches")
);
const SearchRedirect = React.lazy(() =>
  import(/* webpackChunkName: 'search-redirect' */ "./components/SearchRedirect")
);
const Results = React.lazy(() =>
  import(/* webpackChunkName: 'results' */ "./components/Results")
);
const Maintenance = React.lazy(() =>
  import(/* webpackChunkName: 'maint' */ "./components/Maintenance")
);
const MaskSelection = React.lazy(() =>
  import(/* webpackChunkName: 'mask' */ "./components/MaskSelection")
);
const AnnouncementsArchive = React.lazy(() =>
  import(
    /* webpackChunkName: 'announcements' */ "./components/AnnouncementsArchive"
  )
);
const Account = React.lazy(() =>
  import(/* webpackChunkName: 'account' */ "./components/Account")
);
const CustomSearchList = React.lazy(() =>
  /* webpackChunkName: 'custom-search-list' */
  import("./components/CustomSearchList")
);
const NotFound = React.lazy(() =>
  import(/* webpackChunkName: 'notfound' */ "./components/NotFound")
);
const UsageTerms = React.lazy(() =>
  import(/* webpackChunkName: 'usage' */ "./components/UsageTerms")
);
const ResetPassword = React.lazy(() =>
  import(/* webpackChunkName: 'reset-pass' */ "./components/ResetPassword")
);
const UploadPolicy = React.lazy(() =>
  import(/* webpackChunkName: 'upload-policy' */ "./components/UploadPolicy")
);

export default function Routes({ appProps }) {
  const showMaintenancePage = Boolean(
    config.UNDER_MAINTENANCE && !appProps.isAdmin
  );
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route path="/" exact>
          <Landing isAuthenticated={appProps.isAuthenticated} />
        </Route>
        <UnauthenticatedRoute
          path="/login"
          exact
          component={showMaintenancePage ? Maintenance : Login}
          appProps={appProps}
        />
        <UnauthenticatedRoute
          path="/signup"
          exact
          component={showMaintenancePage ? Maintenance : Signup}
          appProps={appProps}
        />
        <UnauthenticatedRoute
          path="/login/reset"
          exact
          component={showMaintenancePage ? Maintenance : ResetPassword}
          appProps={appProps}
        />
        <AuthenticatedRoute
          path="/account"
          exact
          component={showMaintenancePage ? Maintenance : Account}
          appProps={appProps}
        />
        <AuthenticatedRoute
          path="/search"
          exact
          component={showMaintenancePage ? Maintenance : SearchErrorBoundary}
          appProps={appProps}
        />
        <AuthenticatedRoute
        path="/matches/:algorithm?/:matchId?/:page?"
          component={showMaintenancePage ? Maintenance : SearchMatches}
          appProps={appProps}
        />
        <AuthenticatedRoute
          path="/search/:searchType?/:searchTerm?/matches/:matchId/:page?"
          component={showMaintenancePage ? Maintenance : SearchRedirect}
          appProps={appProps}
        />
        <AuthenticatedRoute
          path="/search/:searchType?/:searchTerm?"
          component={showMaintenancePage ? Maintenance : Search}
          appProps={appProps}
        />
        <AuthenticatedRoute
          path="/upload"
          component={showMaintenancePage ? Maintenance : CustomSearchList}
          appProps={appProps}
        />
        <AuthenticatedRoute
        path="/results/:id/:page?"
          component={showMaintenancePage ? Maintenance : Results}
          appProps={appProps}
        />
        <AuthenticatedRoute
          path="/mask-selection/:id"
          component={showMaintenancePage ? Maintenance : MaskSelection}
          appProps={appProps}
        />

        <Route path="/about" component={About} />
        <AuthenticatedRoute
          path="/admin"
          component={Admin}
          appProps={appProps}
        />
        <AuthenticatedRoute
          path="/releasenotes/:name"
          component={ReleaseNotes}
          appProps={appProps}
        />
        <Route path="/usage" component={UsageTerms} />
        <Route path="/upload-policy" component={UploadPolicy} />
        <Route path="/help" component={HelpPage} />
        <Route path="/announcements" component={AnnouncementsArchive} />
        {/* Finally, catch all unmatched routes */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

Routes.propTypes = {
  appProps: PropTypes.object.isRequired
};
