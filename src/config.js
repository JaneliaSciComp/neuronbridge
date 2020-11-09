import { Auth } from "aws-amplify";

const validLevels = ["prod", "val", "dev"];

const UNDER_MAINTENANCE = process.env.REACT_APP_UNDER_MAINTENANCE || false;

const dataLevel =
  process.env.REACT_APP_DATA_TARGET || process.env.REACT_APP_LEVEL;

let BUCKET_NAME = "janelia-neuronbridge-data-prod";
if (validLevels.includes(dataLevel)) {
  BUCKET_NAME = `janelia-neuronbridge-data-${dataLevel}`;
}

const searchLevel =
  process.env.REACT_APP_SEARCH_LEVEL || process.env.REACT_APP_LEVEL;

let SEARCH_BUCKET = "janelia-neuronbridge-searches-prod";
if (validLevels.includes(searchLevel)) {
  SEARCH_BUCKET = `janelia-neuronbridge-searches-${searchLevel}`;
}

const endpointLevel =
  process.env.REACT_APP_SEARCH_ENDPOINT || process.env.REACT_APP_LEVEL;

let SEARCH_ENDPOINT = "https://nan47vkv68.execute-api.us-east-1.amazonaws.com";

if (endpointLevel === "dev") {
  SEARCH_ENDPOINT = "https://nt050zgj28.execute-api.us-east-1.amazonaws.com";
} else if (endpointLevel === "val") {
  SEARCH_ENDPOINT = "https://dxfoj63unb.execute-api.us-east-1.amazonaws.com";
}

let GRAPHQL_ENDPOINT = "https://tujilg3ibbdvddaomn3t6tuap4.appsync-api.us-east-1.amazonaws.com/graphql";

if (endpointLevel === "dev") {
	GRAPHQL_ENDPOINT = "https://na2n7flfhbc5jihltfahcyplua.appsync-api.us-east-1.amazonaws.com/graphql";
} else if (endpointLevel === "val") {
  GRAPHQL_ENDPOINT = "https://wpd6x4kna5a3vdh7ldq5x4kkky.appsync-api.us-east-1.amazonaws.com/graphql";
}


export default {
  UNDER_MAINTENANCE,
  SEARCH_BUCKET,
  s3: {
    REGION: "us-east-1",
    BUCKET: BUCKET_NAME
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_owgI6RY6Y",
    APP_CLIENT_ID: "4ham9v2s8c0d9v9mdm7vk3fggp",
    IDENTITY_POOL_ID: "us-east-1:aa989ba7-1b37-4d5a-95f5-14b70c2694d2"
  },
  oauth: {
    DOMAIN: "neuronbridge.auth.us-east-1.amazoncognito.com",
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
  releasenotes: {
    NEURONBRIDGE: {
      title: "NeuronBridge",
      url:
        "https://raw.githubusercontent.com/JaneliaSciComp/open-data-flylight/master/janelia-flylight-color-depth/README.md"
    },
    DATA: {
      title: "Precomputed match data",
      url:
        "https://janelia-neuronbridge-data-dev.s3.amazonaws.com/v2_1_0/DATA_NOTES.md"
    },
    website: {
      title: "Neuronbridge Website",
      url: "/RELEASENOTES.md"
    }
  }
};
