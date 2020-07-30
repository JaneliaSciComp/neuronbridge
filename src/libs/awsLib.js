import { API, Storage, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import config from "../config";

// eslint-disable-next-line import/prefer-default-export
export function deleteSearch(search) {
  const { id } = search;
  API.graphql(
    graphqlOperation(mutations.deleteSearch, { input: { id } })
  ).then(results => console.log(results));

  Storage.remove(`${search.searchDir}/${search.upload}`, {
    level: "private",
    bucket: config.SEARCH_BUCKET
  })
}
