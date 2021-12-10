import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../containers/AppContext";

/* eslint-disable */
export default function AuthenticatedRoute({
  component: C,
  appProps,
  ...rest
}) {
  const { appState } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={props =>
        appState.username ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect
            to={`/login?redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
}
/* eslint-enable */
