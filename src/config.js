import { Auth } from "aws-amplify";

const validLevels = ['prod', 'val', 'dev'];

const dataLevel = process.env.REACT_APP_DATA_TARGET || process.env.REACT_APP_LEVEL;

let BUCKET_NAME = "janelia-neuronbridge-data-prod";
if (validLevels.includes(dataLevel)) {
  BUCKET_NAME = `janelia-neuronbridge-data-${dataLevel}`;
}

const searchLevel = process.env.REACT_APP_SEARCH_LEVEL || process.env.REACT_APP_LEVEL;

let SEARCH_BUCKET = "janelia-neuronbridge-searches-prod";
if (validLevels.includes(searchLevel)) {
  SEARCH_BUCKET = `janelia-neuronbridge-searches-${searchLevel}`;
}

const endpointLevel = process.env.REACT_APP_SEARCH_ENDPOINT || process.env.REACT_APP_LEVEL;

let SEARCH_ENDPOINT = "https://nt050zgj28.execute-api.us-east-1.amazonaws.com";

if (endpointLevel === "dev") {
  SEARCH_ENDPOINT = "https://nt050zgj28.execute-api.us-east-1.amazonaws.com";
} else if (endpointLevel === "val") {
  SEARCH_ENDPOINT = "https://nt050zgj28.execute-api.us-east-1.amazonaws.com";
}

export default {
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
  releasenotes: {
    data: {
      title: "NeuronBridge Data",
      url:
        "https://raw.githubusercontent.com/JaneliaSciComp/open-data-flylight/master/janelia-flylight-color-depth/README.md"
    },
    website: {
      title: "Neuronbridge Website",
      url: "/RELEASENOTES.md"
    }
  }
};
