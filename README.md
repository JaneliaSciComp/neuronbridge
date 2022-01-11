# NeuronBridge

NeuronBridge is a web-based neuron matching service for cross-modality searches. We index large data sets of LM and EM imagery to enable finding similar neurons. 

[Janelia's production instance of NeuronBridge](https://neuronbridge.janelia.org/)

## Source Code

This repository contains the web client. Other related repositories:
* [https://github.com/JaneliaSciComp/neuronbridge-services](https://github.com/JaneliaSciComp/neuronbridge-services) - Backend API for AWS
* [https://github.com/JaneliaSciComp/colormipsearch](https://github.com/JaneliaSciComp/colormipsearch) - Color Depth MIP Algorithms

The imagery is stored in AWS S3, and is available for browsing here:
* [Color Depth MIPS on S3](https://open.quiltdata.com/b/janelia-flylight-color-depth)

## Release Notes

See the [RELEASENOTES.md](public/RELEASENOTES.md) in the public directory.

## License

This code is made available under the [Janelia Open Source License](LICENSE.md). All studies and publications that use this software should cite [doi:10.25378/janelia.12159378.v1](https://doi.org/10.25378/janelia.12159378.v1).

# For Developers

## Development

The build currently requires Python 2.x. You can create that with Conda as follows:
```
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
```
127.0.0.1 neuronbridge-dev.janelia.org
```
Then you can access your dev server like this: [https://neuronbridge-dev.janelia.org:3000](https://neuronbridge-dev.janelia.org:3000)

## Deployment

Note: Please make sure you have created a cognito user pool and the appropriate roles to access your data and search buckets on AWS. See [AWS setup](README_AWS.md) for more details. Once that is complete:

For initial deployment, make sure the AWS resources have been provisioned:
```bash
sls deploy --stage <stage: dev, val, prod>
```

Deploy the website to AWS:
```bash
npm run deploy:<stage: dev, val, prod>
```
Bucket targets, API endpoints and graphQL endpoints are hard coded into src/config.js. These values can be obtained from your aws console, after you have deployed the [neuronbridge-services](https://github.com/JaneliaSciComp/neuronbridge-services) backend.

## Configuring AWS

See [AWS setup](README_AWS.md).
