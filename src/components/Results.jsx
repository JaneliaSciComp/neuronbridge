import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";

export default function Results({ match }) {
  const searchId = match.params.id;
  const [searchMeta, setSearchMeta] = useState(null);
  useEffect(() => {
    if (searchId) {
      const query = graphqlOperation(queries.getSearch, {
        id: searchId
      });
      API.graphql(query)
        .then(results => setSearchMeta(results.data.getSearch))
        .catch(error => console.log(error));
    }
  }, [searchId]);

  if (!searchMeta) {
    return <p>...loading</p>;
  }

  return (
    <div>
      <p>Results for {searchMeta.upload}</p>
    </div>
  );
}

Results.propTypes = {
  match: PropTypes.object.isRequired
};
