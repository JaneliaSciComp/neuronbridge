import React from "react";
import PropTypes from "prop-types";
import { message } from "antd";
import { withRouter } from "react-router";

import UnifiedSearch from "./UnifiedSearch";
import Search from "./Search";

class SearchErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    message.error(
      "There was a problem with your search input, please try again",
    ).then(this.clearError);
  }

  // clear the error state so that searches can proceed again and send the
  // browser back to the blank search page, which has some help.
  clearError = () => {
    const { history } = this.props;
    this.setState({hasError: false});
    history.replace("/search");
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      // You can render any custom fallback UI
      return <Search />;
    }

    return <UnifiedSearch />;
  }
}

SearchErrorBoundary.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(SearchErrorBoundary);
