import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../containers/AppContext";

/* eslint-disable */
function querystring(name, url = window.location.href) {
    const modified = name.replace(/[[]]/g, "\\$&");

    const regex = new RegExp("[?&]" + modified + "(=([^&#]*)|&|#|$)", "i");
    const results = regex.exec(url);

    if (!results) {
        return null;
    }
    if (!results[2]) {
        return "";
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function UnauthenticatedRoute({ component: C, appProps, ...rest }) {
    const redirect = querystring("redirect");
    const { appState } = useContext(AppContext);
    return (
      <Route
        {...rest}
        render={props =>
          !appState.username
            ? <C {...props} {...appProps} />
            : <Redirect
                to={redirect === "" || redirect === null ? "/" : redirect}
              />}
      />
    );
  }

/* eslint-enable */
