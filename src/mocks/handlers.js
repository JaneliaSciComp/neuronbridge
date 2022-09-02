import { rest } from "msw";
import metadata1537331894 from "./1537331894_metadata.json";
import LH173metadata from "./LH173_metadata.json";
import config from "./config.json";
import cdsResults from "./2945073141049430027.json";
import cdsResults2798488256260341771 from "./2798488256260341771.json";

/* eslint-disable-next-line import/prefer-default-export */
export const handlers = [
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
    "https://janelia-neuronbridge-data-dev.s3.us-east-1.amazonaws.com/v2_4_0/metadata/cdsresults/2798488256260341771.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(cdsResults2798488256260341771));
    }
  ),
];
