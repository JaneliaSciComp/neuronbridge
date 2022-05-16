import { Auth } from "aws-amplify";

const validLevels = ["prod", "val", "dev", "devpre", "prodpre"];

const UNDER_MAINTENANCE = process.env.REACT_APP_UNDER_MAINTENANCE || false;

const dataLevel =
  process.env.REACT_APP_DATA_TARGET || process.env.REACT_APP_LEVEL;

let BUCKET_NAME = "janelia-neuronbridge-data-prod";
if (validLevels.includes(dataLevel)) {
  BUCKET_NAME = `janelia-neuronbridge-data-${dataLevel}`;
}

const SEARCH_BUCKET = process.env.REACT_APP_SEARCH_BUCKET;

let PPPM_BUCKET = "janelia-ppp-match-prod";
if (validLevels.includes(dataLevel)) {
  PPPM_BUCKET = `janelia-ppp-match-${dataLevel}`;
}

const SEARCH_ENDPOINT = process.env.REACT_APP_SEARCH_ENDPOINT;
const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT;

const fathomEventKeys = {
  "prod": {
    "imageUpload": "MGYJFBMS",
  },
  "pre": {
    "imageUpload": "L1SRH70K",
  }
};

const VOL_VIEWER = process.env.REACT_APP_VOL_VIEWER || "https://neuronbridge-vol-viewer.janelia.org";


export default {
  APP_LEVEL: process.env.REACT_APP_LEVEL,
  ZIP_DOWNLOAD_LIMIT: 200,
  UNDER_MAINTENANCE,
  SEARCH_BUCKET,
  PPPM_BUCKET,
  s3: {
    REGION: "us-east-1",
    BUCKET: BUCKET_NAME
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: process.env.REACT_APP_USERPOOL_ID, // "us-east-1_IlMc6JlxA"
    APP_CLIENT_ID: process.env.REACT_APP_USERPOOL_CLIENT_ID, // "2ionqplpshb3ghes9ik23d2tdb"
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID // "us-east-1:fb9f4e5a-57f9-42b3-91f0-74d5921ecd6a"
  },
  oauth: {
    DOMAIN: `neuronbridge-${process.env.REACT_APP_LEVEL}.auth.us-east-1.amazoncognito.com`,
    SCOPE: ["email", "openid", "profile"],
    REDIRECT_SIGN_IN: window.location.origin,
    REDIRECT_SIGN_OUT: window.location.origin
  },
  api: {
    endpoints: [
      {
        name: "SearchAPI",
        endpoint: SEARCH_ENDPOINT,
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getAccessToken()
              .getJwtToken()}`
          };
        }
      }
    ]
  },
  appsync: {
    graphqlEndpoint: GRAPHQL_ENDPOINT,
    region: "us-east-1",
    authenticationType: "AMAZON_COGNITO_USER_POOLS",
    apiKey: "oexu5gsgl5g5vcaah6q4nl7gui"
  },
  announcements: `https://s3.amazonaws.com/${BUCKET_NAME}/announcements.json`,
  releasenotes: {
    DATA: {
      title: "Precomputed Match Data",
      url: `https://s3.amazonaws.com/janelia-neuronbridge-data-${process.env.REACT_APP_LEVEL}/{version}/DATA_NOTES.md`
    },
    website: {
      title: "Neuronbridge Software",
      url: "/RELEASENOTES.md"
    }
  },
  uploadDimensions: {
    'brain': '1210 x 566 px',
    'vnc': '573 x 1119 px'
  },
  // These buckets get skipped, because they are not in our AWS stack and as such,
  // don't allow signed requests. By default these buckets should allow public
  // access
  skip_signing_buckets: ["janelia-flylight-color-depth"],
  fathomEventKeys: fathomEventKeys[process.env.REACT_APP_LEVEL],
  volumeViewer: VOL_VIEWER
};
