describe('config testing', () => {

  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules() // most important - it clears the cache
    process.env = { ...OLD_ENV }; // make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // restore old env
  });

  test('test REACT_APP_LEVEL = dev', () => {
    process.env.REACT_APP_LEVEL = 'dev';
    process.env.REACT_APP_DATA_TARGET = null;
    process.env.REACT_APP_SEARCH_LEVEL = null;
    process.env.REACT_APP_SEARCH_ENDPOINT = null;
    // eslint-disable-next-line
    const config = require("../config").default;
    expect(config.SEARCH_BUCKET).toEqual("janelia-neuronbridge-searches-dev");
    expect(config.s3.BUCKET).toEqual("janelia-neuronbridge-data-dev");
    const searchEndpoint = config.api.endpoints.filter(ep => ep.name === "SearchAPI")[0].endpoint;
    expect(searchEndpoint).toEqual("https://nt050zgj28.execute-api.us-east-1.amazonaws.com");
  });

  test('test REACT_APP_LEVEL = val', () => {
    process.env.REACT_APP_LEVEL = 'val';
    process.env.REACT_APP_DATA_TARGET = null;
    process.env.REACT_APP_SEARCH_LEVEL = null;
    process.env.REACT_APP_SEARCH_ENDPOINT = null;
    // eslint-disable-next-line
    const config = require("../config").default;
    expect(config.SEARCH_BUCKET).toEqual("janelia-neuronbridge-searches-val");
    expect(config.s3.BUCKET).toEqual("janelia-neuronbridge-data-val");
    const searchEndpoint = config.api.endpoints.filter(ep => ep.name === "SearchAPI")[0].endpoint;
    expect(searchEndpoint).toEqual("https://dxfoj63unb.execute-api.us-east-1.amazonaws.com");
  });

  test('test REACT_APP_LEVEL = prod', () => {
    process.env.REACT_APP_LEVEL = 'prod';
    process.env.REACT_APP_DATA_TARGET = null;
    process.env.REACT_APP_SEARCH_LEVEL = null;
    process.env.REACT_APP_SEARCH_ENDPOINT = null;
    // eslint-disable-next-line
    const config = require("../config").default;
    expect(config.SEARCH_BUCKET).toEqual("janelia-neuronbridge-searches-prod");
    expect(config.s3.BUCKET).toEqual("janelia-neuronbridge-data-prod");
    const searchEndpoint = config.api.endpoints.filter(ep => ep.name === "SearchAPI")[0].endpoint;
    expect(searchEndpoint).toEqual("https://nan47vkv68.execute-api.us-east-1.amazonaws.com");
  });

  test('test REACT_APP_LEVEL = null', () => {
    process.env.REACT_APP_LEVEL = null;
    process.env.REACT_APP_DATA_TARGET = null;
    process.env.REACT_APP_SEARCH_LEVEL = null;
    process.env.REACT_APP_SEARCH_ENDPOINT = null;
    // eslint-disable-next-line
    const config = require("../config").default;
    expect(config.SEARCH_BUCKET).toEqual("janelia-neuronbridge-searches-prod");
    expect(config.s3.BUCKET).toEqual("janelia-neuronbridge-data-prod");
    const searchEndpoint = config.api.endpoints.filter(ep => ep.name === "SearchAPI")[0].endpoint;
    expect(searchEndpoint).toEqual("https://nan47vkv68.execute-api.us-east-1.amazonaws.com");
  });

  test('test REACT_APP_LEVEL = dev && REACT_APP_DATA_TARGET = prod', () => {
    process.env.REACT_APP_LEVEL = 'dev';
    process.env.REACT_APP_DATA_TARGET = 'prod';
    process.env.REACT_APP_SEARCH_LEVEL = null;
    process.env.REACT_APP_SEARCH_ENDPOINT = null;
    // eslint-disable-next-line
    const config = require("../config").default;
    expect(config.SEARCH_BUCKET).toEqual("janelia-neuronbridge-searches-dev");
    expect(config.s3.BUCKET).toEqual("janelia-neuronbridge-data-prod");
    const searchEndpoint = config.api.endpoints.filter(ep => ep.name === "SearchAPI")[0].endpoint;
    expect(searchEndpoint).toEqual("https://nt050zgj28.execute-api.us-east-1.amazonaws.com");
  });

  test('test REACT_APP_LEVEL = dev && REACT_APP_SEARCH_LEVEL = prod', () => {
    process.env.REACT_APP_LEVEL = 'dev';
    process.env.REACT_APP_DATA_TARGET = null;
    process.env.REACT_APP_SEARCH_LEVEL = 'prod';
    process.env.REACT_APP_SEARCH_ENDPOINT = null;
    // eslint-disable-next-line
    const config = require("../config").default;
    expect(config.SEARCH_BUCKET).toEqual("janelia-neuronbridge-searches-prod");
    expect(config.s3.BUCKET).toEqual("janelia-neuronbridge-data-dev");
    const searchEndpoint = config.api.endpoints.filter(ep => ep.name === "SearchAPI")[0].endpoint;
    expect(searchEndpoint).toEqual("https://nt050zgj28.execute-api.us-east-1.amazonaws.com");
  });

  test('test REACT_APP_LEVEL = dev && REACT_APP_SEARCH_ENDPOINT = prod', () => {
    process.env.REACT_APP_LEVEL = 'dev';
    process.env.REACT_APP_DATA_TARGET = null;
    process.env.REACT_APP_SEARCH_LEVEL = null;
    process.env.REACT_APP_SEARCH_ENDPOINT = 'prod';
    // eslint-disable-next-line
    const config = require("../config").default;
    expect(config.SEARCH_BUCKET).toEqual("janelia-neuronbridge-searches-dev");
    expect(config.s3.BUCKET).toEqual("janelia-neuronbridge-data-dev");
    const searchEndpoint = config.api.endpoints.filter(ep => ep.name === "SearchAPI")[0].endpoint;
    expect(searchEndpoint).toEqual("https://nan47vkv68.execute-api.us-east-1.amazonaws.com");
  });


  test('test REACT_APP_LEVEL = dev && all other ENVs = prod', () => {
    process.env.REACT_APP_LEVEL = 'dev';
    process.env.REACT_APP_DATA_TARGET = 'prod';
    process.env.REACT_APP_SEARCH_LEVEL = 'prod';
    process.env.REACT_APP_SEARCH_ENDPOINT = 'prod';
    // eslint-disable-next-line
    const config = require("../config").default;
    expect(config.SEARCH_BUCKET).toEqual("janelia-neuronbridge-searches-prod");
    expect(config.s3.BUCKET).toEqual("janelia-neuronbridge-data-prod");
    const searchEndpoint = config.api.endpoints.filter(ep => ep.name === "SearchAPI")[0].endpoint;
    expect(searchEndpoint).toEqual("https://nan47vkv68.execute-api.us-east-1.amazonaws.com");
  });

});


