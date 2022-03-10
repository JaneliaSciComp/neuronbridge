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
  const creds = await Auth.currentCredentials();
  const response = await API.post("SearchAPI", "/new_from_image", {
    body: {
      image,
      identityId: creds.identityId
    }
  });
  return response;
}

// if provided with a url that starts with s3.amazonaws.com,
// this function will return a signed url. If any other url
// is provided, it will be returned untouched.
export function signedPublicLink(url) {
  const matched = url.match(/^http[s]:\/\/s3\.amazonaws\.com\/([^/]*)\/(.*)/);
  if (matched) {
    const [, bucket, relativePath] = matched;
    // if we aren't skipping the signing, then sign it.
    if (!config.skip_signing_buckets.includes(bucket)) {
      const downloadOptions = {
        customPrefix: {
          public: ""
        },
        expires: 500,
        level: "public",
        bucket
      };

      return Storage.get(relativePath, downloadOptions).then(result => result);
    }
  }
  return new Promise(resolve => {
    resolve(url);
  });
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

export function createRelativePPPMImagePath(
  alignmentSpace,
  library,
  relativePath
) {
  return `${alignmentSpace}/${library}/${relativePath}`;
}

export function createPPPMImagePath({
  alignmentSpace,
  library,
  relativePath,
  baseURL
}) {
  // if paths.json has pppm base url present, then use that, otherwise use the
  // pppm_bucket from the configuration file.
  const base = baseURL || `https://s3.amazonaws.com/${config.PPPM_BUCKET}`;

  return `${base}/${createRelativePPPMImagePath(
    alignmentSpace,
    library,
    relativePath
  )}`;
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

export async function toDataURL(url, opts = {}) {
  let signed;
  if (opts.private) {
    signed = await signedLink(url);
  } else {
    signed = await signedPublicLink(url);
  }
  // "cache-control": "no-cache" was added to the fetch options here,
  // because safari was refusing to download images in a fetch request.
  // I created a proxy service that showed the requests weren't even being
  // sent to the 'signed' url unless the cache was disabled. This change
  // will force the image to be downloaded from the server, even if it was
  // once loaded into the http cache, but that seems like a small price to
  // pay for up to date and working downloads.
  const options =
    signed !== url
      ? {
          credentials: "include",
          headers: {
            "cache-control": "no-cache"
          }
        }
      : {
          headers: {
            "cache-control": "no-cache"
          }
        };
  const objectUrl = await fetch(signed, options)
    .then(response => {
      return response.blob();
    })
    .then(blob => {
      return URL.createObjectURL(blob);
    })
    .catch(e => {
      console.log(e);
    });
  return objectUrl;
}
