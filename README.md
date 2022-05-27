# NeuronBridge

[![DOI](https://zenodo.org/badge/257408159.svg)](https://zenodo.org/badge/latestdoi/257408159)
[![Follow on Twitter](http://img.shields.io/badge/twitter-%40NeuronBridge-1DA1F2?labelColor=000000&logo=twitter)](https://twitter.com/NeuronBridge)

<p align="center">
  <img src="assets/neuronbridge_logo_light.png" alt="NeuronBridge logo"/>
</p>

NeuronBridge is a web-based service for neuron matching and searching in _Drosophila melanogaster_. It indexes large data sets of LM and EM imagery to enable finding similar neurons across modalities and data sets. Visit the service here:

[![Janelia's production instance of NeuronBridge](https://img.shields.io/static/v1?style=for-the-badge&logo=&label=&message=View%20Production%20Site&color=008B94)](https://neuronbridge.janelia.org/)
[![Janelia's pre-release instance of NeuronBridge](https://img.shields.io/static/v1?style=for-the-badge&logo=&label=&message=View%20Pre-release%20Site&color=84297E)](https://neuronbridge-pre.janelia.org/)

(Pre-release is only accessible on Janelia's network)

## Source Code

This repository contains the web client. Other related repositories:

* [neuronbridge-services](https://github.com/JaneliaSciComp/neuronbridge-services) - Backend implementation
* [neuronbridge-utilities](https://github.com/JaneliaSciComp/neuronbridge-utilities) - Utility scripts
* [neuronbridge-aligners](https://github.com/JaneliaSciComp/neuronbridge-aligners) - Aligner implementation
* [colormipsearch](https://github.com/JaneliaSciComp/colormipsearch) - Color Depth MIP Search Algorithms
* [neuronbridge-python](https://github.com/JaneliaSciComp/neuronbridge-python) - Python API

## Data Availability

The imagery and metadata are stored on AWS S3, and are available for browsing and reuse, subject to the license agreement:

* [Color Depth MIPS](https://open.quiltdata.com/b/janelia-flylight-color-depth)
* [Precomputed CDM match metadata](https://open.quiltdata.com/b/janelia-neuronbridge-data-prod)
* [Precomputed PPPM match metadata](https://open.quiltdata.com/b/janelia-ppp-match-prod)

## Release Notes

View the [Release Notes](public/RELEASENOTES.md) for a history of changes to the web client.

## Development

Read the [Developer's Guide](docs/Development.md) for more information about developing and deploying this service.

## License

This code is made available under the [Janelia Open Source License](LICENSE.md). All studies and publications that use this software should cite [doi:10.25378/janelia.12159378.v2](<https://doi.org/10.25378/janelia.121593>
