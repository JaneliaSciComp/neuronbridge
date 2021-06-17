import { Auth } from "aws-amplify";

const validLevels = ["prod", "val", "dev", "int"];

const searchEndpoints = {
  prod: "https://nan47vkv68.execute-api.us-east-1.amazonaws.com",
  dev: "https://62d6tq28ji.execute-api.us-east-1.amazonaws.com",
  val: "https://dxfoj63unb.execute-api.us-east-1.amazonaws.com",
  int: "https://ek76dqtvai.execute-api.us-east-1.amazonaws.com"
};

const graphqlEndpoints = {
  prod: "https://tujilg3ibbdvddaomn3t6tuap4.appsync-api.us-east-1.amazonaws.com/graphql",
  dev: "https://uueocb3pcjesbepkdutc2lmfyu.appsync-api.us-east-1.amazonaws.com/graphql",
  val: "https://wpd6x4kna5a3vdh7ldq5x4kkky.appsync-api.us-east-1.amazonaws.com/graphql",
  int: "https://olnk5b7oofaajb2qjvkepwdnwq.appsync-api.us-east-1.amazonaws.com/graphql"
};

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
const SEARCH_ENDPOINT = searchEndpoints[endpointLevel];
const GRAPHQL_ENDPOINT = graphqlEndpoints[endpointLevel];

export default {
  APP_LEVEL: process.env.REACT_APP_LEVEL,
  ZIP_DOWNLOAD_LIMIT: 200,
  UNDER_MAINTENANCE,
  SEARCH_BUCKET,
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
