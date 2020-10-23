import { API, Storage, graphqlOperation, Auth } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import config from "../config";

// eslint-disable-next-line import/prefer-default-export
export async function deleteSearch(search) {
  const { id } = search;
  API.graphql(graphqlOperation(mutations.deleteSearch, { input: { id } }));

  const options = {
    level: "private",
    bucket: config.SEARCH_BUCKET
  };

  // remove all the files for this search
  const filesList = await Storage.list(`${search.searchDir}`, options);
  filesList.forEach(file => {
    Storage.remove(file.key, options);
  });
}

export async function maskAndSearch(image) {
  // expect image to be object with imageURL and thumbnailURL attributes
  const creds = await Auth.currentCredentials()
  const response = await API.post("SearchAPI", "/copy", {
    body: {
      image,
      identityId: creds.identityId,
      action: "new_search_from_image"
    }
  });
  return response;
}

export function signedLink(url, identityId) {
  const downloadOptions = {
    expires: 500,
    level: "private",
    bucket: config.SEARCH_BUCKET
  };

  // if the identityId is provided then we have to use the public/private hack
  // to get to the correct signed url. Without this the Amplify framework will
  // try to use the identity of the currently signed in user, which will point
  // to the wrong directory in the S3 bucket.
  if (identityId) {
    downloadOptions.level = "public";
    downloadOptions.customPrefix = { public: `private/${identityId}/` };
  }

  return Storage.get(url, downloadOptions).then(result => result);
}

export function logSearchInfo(search) {
  Auth.currentCredentials().then(creds => {
    // eslint-disable-next-line no-console
    console.log(`Search: ${search.upload} - ${search.id}`);
    // eslint-disable-next-line no-console
    console.log(
      `\tFiles: https://s3.console.aws.amazon.com/s3/buckets/${config.SEARCH_BUCKET}/private/${creds.identityId}/${search.searchDir}/`
    );
  });
}

/**
 * @desc Recursively fetch all items in a list query using nextToken
 * @param {Object} query The query object from cda-graphql in use.
 * @param {Object} variables The variables to pass to query.
 * @param {Array} items Any preliminary Items already fetched
 * @param {Function} callback Optional callback function to be fired with every batch of items from query iteration.
 * @returns {Array} Array of all items received from queries.
 * Copied from https://medium.com/swlh/how-to-really-use-aws-amplify-fcb4c5ed769c
 */
export async function fetchItemsNextToken({
  query,
  variables,
  items = [],
  callback = undefined
}) {
  const { data } = await API.graphql(graphqlOperation(query, variables));
  const key = Object.keys(data).find(k => k.includes("list"));
  const res = data[key]; // res = { items: [], nextToken: '' }

  items.push(...res.items);
  if (callback) {
    callback(res.items);
  }
  if (!res.nextToken) return items;

  // eslint-disable-next-line no-param-reassign
  variables.nextToken = res.nextToken;
  return fetchItemsNextToken({ query, variables, items, callback });
}
