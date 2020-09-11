import { Auth } from "aws-amplify";

let BUCKET_NAME = "janelia-neuronbridge-data-prod";

if (process.env.REACT_APP_DATA_TARGET === "dev") {
  BUCKET_NAME = "janelia-neuronbridge-data-dev";
} else if (process.env.REACT_APP_DATA_TARGET === "val") {
  BUCKET_NAME = "janelia-neuronbridge-data-val";
}

export default {
  SEARCH_BUCKET: "janelia-neuronbridge-searches-dev",
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
        endpoint: "https://nt050zgj28.execute-api.us-east-1.amazonaws.com",
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
    NEURONBRIDGE: {
      title: "NeuronBridge",
      url:
        "https://raw.githubusercontent.com/JaneliaSciComp/open-data-flylight/master/janelia-flylight-color-depth/README.md"
    }
  }
};
