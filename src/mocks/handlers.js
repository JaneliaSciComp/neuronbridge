import { rest } from "msw";
// import data1537331894 from "./1537331894.json";
// import metadata1537331894 from "./1537331894_metadata.json";
// import metadata1932493302 from "./1932493302_metadata.json";
import announcements from "./announcements.json";

/* eslint-disable-next-line import/prefer-default-export */
export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),
  rest.get(
    "https://s3.amazonaws.com/janelia-neuronbridge-data-prod/announcements.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(announcements));
    }
  ),
  /* rest.get(
    "https://janelia-neuronbridge-data-dev.s3.us-east-1.amazonaws.com/v2_1_0/metadata/by_body/1537331894.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(metadata1537331894));
    }
  ),
  rest.get(
    "https://janelia-neuronbridge-data-dev.s3.us-east-1.amazonaws.com/v2_1_0/metadata/pppresults/1537331894.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(data1537331894));
    }
  ),
  rest.get(
    "https://janelia-neuronbridge-data-dev.s3.us-east-1.amazonaws.com/v2_1_0/metadata/by_body/1932493302.json",
    (req, res, ctx) => {
      return res(
        // Respond with a 200 status code
        ctx.status(200),
        ctx.json({
          results: [
            {
              id: "2945073156357976075",
              publishedName: "1932493302",
              libraryName: "FlyEM_Hemibrain_v1.2.1",
              imageURL:
                "JRC2018_Unisex_20x_HR/FlyEM_Hemibrain_v1.2.1/1932493302-JRC2018_Unisex_20x_HR-CDM.png",
              thumbnailURL:
                "JRC2018_Unisex_20x_HR/FlyEM_Hemibrain_v1.2.1/1932493302-JRC2018_Unisex_20x_HR-CDM.jpg",
              neuronType: "PS071",
              neuronInstance: "PS071_R",
              gender: "f"
            },
            {
              id: "2820604191108497419",
              publishedName: "1932493302",
              libraryName: "FlyEM_Hemibrain_v1.1",
              imageURL:
                "JRC2018_Unisex_20x_HR/FlyEM_Hemibrain_v1.1/1932493302-RT-JRC2018_Unisex_20x_HR-CDM.png",
              thumbnailURL:
                "JRC2018_Unisex_20x_HR/FlyEM_Hemibrain_v1.1/1932493302-RT-JRC2018_Unisex_20x_HR-CDM.jpg",
              gender: "f"
            }
          ]
        })
      );
    }
  ),
  rest.get(
    "https://janelia-neuronbridge-data-dev.s3.us-east-1.amazonaws.com/v2_1_0/metadata/pppresults/1932493302.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(metadata1932493302));
    }
  ),
  rest.get(
    "https://janelia-neuronbridge-data-dev-pre.s3.us-east-1.amazonaws.com/paths.json",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          precomputedDataRootPath: "v2_3_0_pre",
          imageryBaseURL:
            "https://s3.amazonaws.com/janelia-flylight-color-depth-dev",
          thumbnailsBaseURLs:
            "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev",
          pppImageryBaseURL: "https://s3.amazonaws.com/janelia-ppp-match-dev"
        })
      );
    }
  ) */
];
