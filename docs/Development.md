
# Developer's Guide

## Build

The build currently requires Python 2.x. You can create that with Conda as follows:

```bash
conda create --name py2 python=2.7
conda activate py2
```

Build:

```bash
npm install
```

Start dev server:

```bash
npm start
```

1. Currently you need to edit node_modules/react-dev-utils/webpackHotDevClient.js:62 and change "ws" to "wss". This will be fixed soon.

2. In order for uploads to work, the default localhost URL cannot be used. Instead, add this to your /etc/hosts:

```shell
127.0.0.1 neuronbridge-dev.janelia.org
```

Then you can access your dev server like this: [https://neuronbridge-dev.janelia.org:3000](https://neuronbridge-dev.janelia.org:3000)

## Deploy

### Configuring AWS

See [AWS setup](SetupAWS.md) for detailed instructions for one-time setup that needs to be completed before the initial deployment.

### Deploying to AWS

For initial deployment, make sure the AWS resources have been provisioned:

```bash
sls deploy --stage <stage: dev, val, prod>
```

Deploy the website to AWS:

```bash
npm run deploy:<stage: dev, val, prod>
```

Bucket targets, API endpoints and graphQL endpoints are hard coded into src/config.js. These values can be obtained from your AWS console, after you have deployed the [neuronbridge-services](https://github.com/JaneliaSciComp/neuronbridge-services) backend.
