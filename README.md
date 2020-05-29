# NeuronBridge

NeuronBridge is a web-based color depth search tool for neuroscience data. 

[Janelia's production instance of NeuronBridge](https://neuronbridge.janelia.org/)

## Source Code

Source code is currently stored in this and other repos:
* [Web App](https://github.com/JaneliaSciComp/neuronbridge/)
* [API](https://github.com/JaneliaSciComp/color-depth-api/)

The data is stored in AWS S3, and is available here:

[Color Depth MIPS on S3](https://open.quiltdata.com/b/janelia-flylight-color-depth)

## License

This code is made available under the [Janeia Open Source License](LICENSE.md). All studies and publications that use this software must cite [doi:10.25378/janelia.12159378.v1](https://doi.org/10.25378/janelia.12159378.v1).


## For Developers
Build:
```bash
npm install
```

Start dev server:
```bash
npm start
```

Create optimized build for deployment:
```bash
npm run build
```

Deployment to AWS:
```bash
npm run deploy:prod
```
Other stages of deployment can also be used. ```deploy:dev``` or ```deploy:val```

Bucket targets are hard coded into the package.json file. To change the deployment targets, please create a new bucket on AWS and modify the package.json file.