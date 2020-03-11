import React, { Component } from "react";
import MyContext from "./MyContext";
import config from "../config";

/* eslint-disable */
class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      result: null,
      matches: null,
      matchId: null
    };
  }

  render() {
    const { children } = this.props;
    const { open, result } = this.state;
    return (
      <MyContext.Provider
        value={{
          open,
          result,
          handleClickOpen: () => {
            this.setState({
              open: true
            });
          },
          handleClose: () => {
            this.setState({
              open: false
            });
          },
          changeTab: () => {
            this.setState({
              result: null
            });
          },
          getInformation: (name, path) => {
            let that = this; // bind this to that
            if (name) {
              const thePath = path + name + ".json";
              fetch(thePath)
                .then(function(response) {
                  return response.json();
                })
                .then(function(json) {
                  const result = json["results"];
                  that.setState({
                    result
                  });
                })
                .catch(function(error) {
                  console.log(error);
                });
            }
          },
          getMatches: event => {
            let that = this; // bind this to that
            const bodyId = event.currentTarget.value;

            if (bodyId) {
              const path = config.MATCH_PATH + bodyId + ".json";
              fetch(path)
                .then(function(response) {
                  return response.json();
                })
                .then(function(json) {
                  const matches = json.results;
                  that.setState({
                    matches
                  });
                })
                .catch(function(error) {
                  console.log(error);
                });
            }
          }
        }}
      >
        {children}
      </MyContext.Provider>
    );
  }
}
/* eslint-enable */
export default MyProvider;
