import { rest } from "msw";
import metadata1537331894 from "./1537331894_metadata.json";
import LH173metadata from "./LH173_metadata.json";
import R16F12metadata from "./R16F12_metadata.json";
import config from "./config.json";
import devPreConfig from "./dev_pre_config.json";
import cdsResults2711777268786528267 from "./2711777268786528267.json";
import cdsResults from "./2945073141049430027.json";
import cdsResults2798488256260341771 from "./2798488256260341771.json";
import pppresults1537331894 from "./1537331894_pppresults.json";

import customResults from "./custom_results.json";
/* eslint-disable-next-line import/prefer-default-export */
export const handlers = [
  rest.get(
		"https://janelia-neuronbridge-data-devpre.s3.us-east-1.amazonaws.com/v3_0_0/config.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(devPreConfig));
    }
  ),

  rest.get(
    "https://janelia-neuronbridge-data-dev.s3.us-east-1.amazonaws.com/v2_4_0/config.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(config));
    }
  ),
  rest.get(
    "https://janelia-neuronbridge-data-dev.s3.us-east-1.amazonaws.com/v2_4_0/metadata/by_body/1537331894.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(metadata1537331894));
    }
  ),
  rest.get(
    "https://janelia-neuronbridge-data-dev.s3.us-east-1.amazonaws.com/v2_4_0/metadata/cdsresults/2945073141049430027.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(cdsResults));
    }
  ),
  rest.get(
    "https://janelia-neuronbridge-data-dev.s3.us-east-1.amazonaws.com/v2_4_0/metadata/by_line/LH173.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(LH173metadata));
    }
  ),
  rest.get(
    "https://janelia-neuronbridge-data-dev.s3.us-east-1.amazonaws.com/v2_4_0/metadata/by_line/R16F12.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(R16F12metadata));
    }
  ),
  rest.get(
    "https://janelia-neuronbridge-data-dev.s3.us-east-1.amazonaws.com/v2_4_0/metadata/cdsresults/2711777268786528267.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(cdsResults2711777268786528267));
    }
  ),
  rest.get(
    "https://janelia-neuronbridge-data-dev.s3.us-east-1.amazonaws.com/v2_4_0/metadata/cdsresults/2798488256260341771.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(cdsResults2798488256260341771));
    }
  ),
  rest.get(
    "https://janelia-neuronbridge-data-dev.s3.us-east-1.amazonaws.com/v2_4_0/metadata/pppresults/1537331894.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(pppresults1537331894));
    }
  ),
  rest.get(
    "https://janelia-neuronbridge-search-dev.s3.us-east-1.amazonaws.com/private/us-east-1%3Afa7ca00c-9ffc-426c-ad55-2c05b0f4a4d2/0751e020-9b09-11ec-98f4-5f9e052d4953/1077847238_undefined%20%282%29_1_mask.result",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(customResults));
    }
  ),



];
