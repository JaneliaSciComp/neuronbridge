let BUCKET_NAME = "janelia-neuronbridge-data-prod";

if (process.env.REACT_APP_DATA_TARGET === "dev") {
  BUCKET_NAME = "janelia-neuronbridge-data-dev";
} else if (process.env.REACT_APP_DATA_TARGET === "stage") {
  BUCKET_NAME = "janelia-neuronbridge-data-stage";
}

export default {
  MATCH_PATH: `https://${BUCKET_NAME}.s3.amazonaws.com/metadata/cdsresults/`,
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
  }
};
