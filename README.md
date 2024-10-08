# NeuronBridge

[![DOI](https://zenodo.org/badge/257408159.svg)](https://zenodo.org/badge/latestdoi/257408159)
[![Node.js CI](https://github.com/JaneliaSciComp/neuronbridge/actions/workflows/node.js.yml/badge.svg)](https://github.com/JaneliaSciComp/neuronbridge/actions/workflows/node.js.yml)
[![bioRxiv](https://img.shields.io/badge/bioRxiv-10.1101%2F2022.07.20.500311%20-red)](https://www.biorxiv.org/content/10.1101/2022.07.20.500311v1)
[![Follow on Twitter](http://img.shields.io/badge/twitter-%40NeuronBridge-1DA1F2?labelColor=000000&logo=twitter)](https://twitter.com/NeuronBridge)

<p align="center" style="background:white">
  <img src="https://github.com/JaneliaSciComp/neuronbridge/blob/master/assets/neuronbridge_logo_light_white_background.gif" alt="NeuronBridge logo"/>
</p>

NeuronBridge is a web-based service for neuron matching and searching in _Drosophila melanogaster_. It indexes large data sets of LM and EM imagery to enable finding similar neurons across modalities and data sets. The software is described in [this paper](https://doi.org/10.1186/s12859-024-05732-7).

[![Janelia's production instance of NeuronBridge](https://img.shields.io/static/v1?style=for-the-badge&logo=&label=&message=View%20Production%20Site&color=008B94)](https://neuronbridge.janelia.org/)

## Source Code

This repository contains the web client. Other related repositories:

* [neuronbridge-services](https://github.com/JaneliaSciComp/neuronbridge-services) - Backend implementation
* [neuronbridge-aligners](https://github.com/JaneliaSciComp/neuronbridge-aligners) - Aligner implementation
* [neuronbridge-precompute](https://github.com/JaneliaSciComp/neuronbridge-precompute) - Precompute scripts
* [neuronbridge-python](https://github.com/JaneliaSciComp/neuronbridge-python) - Python API
* [neuronbridge-vol-viewer](https://github.com/JaneliaSciComp/neuronbridge-vol-viewer) - Web-based 3D Volume Viewer
* [colormipsearch](https://github.com/JaneliaSciComp/colormipsearch) - Color Depth MIP Search Algorithms


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

All code related to NeuronBridge is made available under the [3-Clause BSD License](LICENSE.md).

All data served by the application is made available under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

Studies and publications that use this software should cite [doi:10.1101/2022.07.20.500311](<https://doi.org/10.1101/2022.07.20.500311>).
