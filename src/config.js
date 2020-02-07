export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "sle-notes-api-dev-attachmentsbucket-c5nvt63nllor"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://bevfdlia18.execute-api.us-east-1.amazonaws.com/dev",
    WSS_URL: "wss://wfc2j7xjm6.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_owgI6RY6Y",
    APP_CLIENT_ID: "4ham9v2s8c0d9v9mdm7vk3fggp",
    IDENTITY_POOL_ID: "us-east-1:aa989ba7-1b37-4d5a-95f5-14b70c2694d2"
  }
};
