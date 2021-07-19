import { rest } from "msw";

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
      return res(
        ctx.status(200),
        ctx.json({
          maskPublishedName: "1932493302",
          maskLibraryName: "hemibrain:v1.2.1",
          neuronType: "PS071",
          neuronInstance: "PS071_R",
          results: [
            {
              id: "2426524251948318865",
              publishedName: "VT034811",
              libraryName: "Gen1 MCFO (meissnerg)",
              pppRank: 0.0,
              pppScore: 124,
              sampleName: "BJD_121B01_AE_01-20170609_61_C5",
              slideCode: "20170609_61_C5",
              objective: "40x",
              gender: "m",
              alignmentSpace: "JRC2018_Unisex_20x_HR",
              mountingProtocol: "DPX PBS Mounting",
              coverageScore: -124.46405531099008,
              aggregateCoverage: 92.91445148100985,
              mirrored: false,
              files: {
                SignalMipMasked:
                  "19/1932493302/1932493302-VT034811-20170609_61_C5-40x-JRC2018_Unisex_20x_HR-masked_raw.png",
                SignalMipMaskedSkel:
                  "19/1932493302/1932493302-VT034811-20170609_61_C5-40x-JRC2018_Unisex_20x_HR-skel.png",
                SignalMip:
                  "19/1932493302/1932493302-VT034811-20170609_61_C5-40x-JRC2018_Unisex_20x_HR-raw.png",
                ColorDepthMip:
                  "19/1932493302/1932493302-VT034811-20170609_61_C5-40x-JRC2018_Unisex_20x_HR-ch.png",
                ColorDepthMipSkel:
                  "19/1932493302/1932493302-VT034811-20170609_61_C5-40x-JRC2018_Unisex_20x_HR-ch_skel.png"
              },
              sourceImageFiles: {
                MASKED_RAW:
                  "/nrs/saalfeld/kainmuellerd/flymatch/all_hemibrain_1.2_NB/setup22_nblast_20/results/02/1932493302-PS071-RT_18U/lm_cable_length_20_v4_adj_by_cov_numba_agglo_aT/screenshots/1932493302-PS071-RT_18U_hr_1_hscore_0_cr_1_cscore_124_BJD_121B01_AE_01-20170609_61_C5_REG_UNISEX_40x_2_masked_raw.png",
                CH:
                  "/nrs/saalfeld/kainmuellerd/flymatch/all_hemibrain_1.2_NB/setup22_nblast_20/results/02/1932493302-PS071-RT_18U/lm_cable_length_20_v4_adj_by_cov_numba_agglo_aT/screenshots/1932493302-PS071-RT_18U_hr_1_hscore_0_cr_1_cscore_124_BJD_121B01_AE_01-20170609_61_C5_REG_UNISEX_40x_5_ch.png",
                CH_SKEL:
                  "/nrs/saalfeld/kainmuellerd/flymatch/all_hemibrain_1.2_NB/setup22_nblast_20/results/02/1932493302-PS071-RT_18U/lm_cable_length_20_v4_adj_by_cov_numba_agglo_aT/screenshots/1932493302-PS071-RT_18U_hr_1_hscore_0_cr_1_cscore_124_BJD_121B01_AE_01-20170609_61_C5_REG_UNISEX_40x_6_ch_skel.png",
                RAW:
                  "/nrs/saalfeld/kainmuellerd/flymatch/all_hemibrain_1.2_NB/setup22_nblast_20/results/02/1932493302-PS071-RT_18U/lm_cable_length_20_v4_adj_by_cov_numba_agglo_aT/screenshots/1932493302-PS071-RT_18U_hr_1_hscore_0_cr_1_cscore_124_BJD_121B01_AE_01-20170609_61_C5_REG_UNISEX_40x_1_raw.png",
                SKEL:
                  "/nrs/saalfeld/kainmuellerd/flymatch/all_hemibrain_1.2_NB/setup22_nblast_20/results/02/1932493302-PS071-RT_18U/lm_cable_length_20_v4_adj_by_cov_numba_agglo_aT/screenshots/1932493302-PS071-RT_18U_hr_1_hscore_0_cr_1_cscore_124_BJD_121B01_AE_01-20170609_61_C5_REG_UNISEX_40x_3_skel.png"
              },
              skeletonMatches: [
                {
                  id: "5927",
                  nblastScore: 1.6320245806578941,
                  coverage: 42.14039756277233
                },
                {
                  id: "16994",
                  nblastScore: 1.3769276271516182,
                  coverage: 7.086405089168958
                },
                {
                  id: "800",
                  nblastScore: 1.360507016773572,
                  coverage: 8.97228709948206
                },
                {
                  id: "2106",
                  nblastScore: 1.106308564820878,
                  coverage: 12.785737535476285
                },
                {
                  id: "902",
                  nblastScore: 1.1443081258630274,
                  coverage: 20.200780049909486
                },
                {
                  id: "13848",
                  nblastScore: 0.882812447547977,
                  coverage: 4.760817053741214
                },
                {
                  id: "1865",
                  nblastScore: 1.0210256500388921,
                  coverage: 17.78782185624468
                },
                {
                  id: "1385",
                  nblastScore: 0.9059436181134872,
                  coverage: 12.48251169218294
                },
                {
                  id: "4211",
                  nblastScore: 1.36112959,
                  coverage: 7.74539308
                },
                {
                  id: "17440",
                  nblastScore: 1.00360061,
                  coverage: 8.18652672
                },
                {
                  id: "13365",
                  nblastScore: 0.88277386,
                  coverage: 4.90814712
                },
                {
                  id: "9781",
                  nblastScore: 0.74785466,
                  coverage: 4.21660947
                },
                {
                  id: "23635",
                  nblastScore: 0.59818738,
                  coverage: 1.07071272
                },
                {
                  id: "1389",
                  nblastScore: 0.82755635,
                  coverage: 8.20622784
                },
                {
                  id: "12063",
                  nblastScore: 0.64244937,
                  coverage: 3.87540901
                },
                {
                  id: "12565",
                  nblastScore: 0.59679483,
                  coverage: 3.90852973
                },
                {
                  id: "17802",
                  nblastScore: 0.40493036,
                  coverage: 0.34262807
                },
                {
                  id: "19009",
                  nblastScore: 0.40140877,
                  coverage: 2.3458602
                },
                {
                  id: "8743",
                  nblastScore: 0.33430953,
                  coverage: 1.28485527
                },
                {
                  id: "5554",
                  nblastScore: 0.26203954,
                  coverage: 0.9422272
                },
                {
                  id: "2",
                  nblastScore: 0.66136444,
                  coverage: 16.90812428
                },
                {
                  id: "4402",
                  nblastScore: 0.38805921,
                  coverage: 6.42199215
                }
              ]
            },
						{
              id: "2426524251948318865",
              publishedName: "VT034811",
              libraryName: "Gen1 MCFO (meissnerg)",
              pppRank: 0.0,
              pppScore: 100,
              sampleName: "BJD_121B01_AE_01-20170609_61_C5",
              slideCode: "20170609_61_C5",
              objective: "40x",
              gender: "m",
              alignmentSpace: "JRC2018_Unisex_20x_HR",
              mountingProtocol: "DPX PBS Mounting",
              coverageScore: -124.46405531099008,
              aggregateCoverage: 92.91445148100985,
              mirrored: false,
              files: {
                SignalMipMasked:
                  "19/1932493302/1932493302-VT034811-20170609_61_C5-40x-JRC2018_Unisex_20x_HR-masked_raw.png",
                SignalMipMaskedSkel:
                  "19/1932493302/1932493302-VT034811-20170609_61_C5-40x-JRC2018_Unisex_20x_HR-skel.png",
                SignalMip:
                  "19/1932493302/1932493302-VT034811-20170609_61_C5-40x-JRC2018_Unisex_20x_HR-raw.png",
                ColorDepthMip:
                  "19/1932493302/1932493302-VT034811-20170609_61_C5-40x-JRC2018_Unisex_20x_HR-ch.png",
                ColorDepthMipSkel:
                  "19/1932493302/1932493302-VT034811-20170609_61_C5-40x-JRC2018_Unisex_20x_HR-ch_skel.png"
              },
              sourceImageFiles: {
                MASKED_RAW:
                  "/nrs/saalfeld/kainmuellerd/flymatch/all_hemibrain_1.2_NB/setup22_nblast_20/results/02/1932493302-PS071-RT_18U/lm_cable_length_20_v4_adj_by_cov_numba_agglo_aT/screenshots/1932493302-PS071-RT_18U_hr_1_hscore_0_cr_1_cscore_124_BJD_121B01_AE_01-20170609_61_C5_REG_UNISEX_40x_2_masked_raw.png",
                CH:
                  "/nrs/saalfeld/kainmuellerd/flymatch/all_hemibrain_1.2_NB/setup22_nblast_20/results/02/1932493302-PS071-RT_18U/lm_cable_length_20_v4_adj_by_cov_numba_agglo_aT/screenshots/1932493302-PS071-RT_18U_hr_1_hscore_0_cr_1_cscore_124_BJD_121B01_AE_01-20170609_61_C5_REG_UNISEX_40x_5_ch.png",
                CH_SKEL:
                  "/nrs/saalfeld/kainmuellerd/flymatch/all_hemibrain_1.2_NB/setup22_nblast_20/results/02/1932493302-PS071-RT_18U/lm_cable_length_20_v4_adj_by_cov_numba_agglo_aT/screenshots/1932493302-PS071-RT_18U_hr_1_hscore_0_cr_1_cscore_124_BJD_121B01_AE_01-20170609_61_C5_REG_UNISEX_40x_6_ch_skel.png",
                RAW:
                  "/nrs/saalfeld/kainmuellerd/flymatch/all_hemibrain_1.2_NB/setup22_nblast_20/results/02/1932493302-PS071-RT_18U/lm_cable_length_20_v4_adj_by_cov_numba_agglo_aT/screenshots/1932493302-PS071-RT_18U_hr_1_hscore_0_cr_1_cscore_124_BJD_121B01_AE_01-20170609_61_C5_REG_UNISEX_40x_1_raw.png",
                SKEL:
                  "/nrs/saalfeld/kainmuellerd/flymatch/all_hemibrain_1.2_NB/setup22_nblast_20/results/02/1932493302-PS071-RT_18U/lm_cable_length_20_v4_adj_by_cov_numba_agglo_aT/screenshots/1932493302-PS071-RT_18U_hr_1_hscore_0_cr_1_cscore_124_BJD_121B01_AE_01-20170609_61_C5_REG_UNISEX_40x_3_skel.png"
              },
              skeletonMatches: [
                {
                  id: "5927",
                  nblastScore: 1.6320245806578941,
                  coverage: 42.14039756277233
                },
                {
                  id: "16994",
                  nblastScore: 1.3769276271516182,
                  coverage: 7.086405089168958
                },
                {
                  id: "800",
                  nblastScore: 1.360507016773572,
                  coverage: 8.97228709948206
                },
                {
                  id: "2106",
                  nblastScore: 1.106308564820878,
                  coverage: 12.785737535476285
                },
                {
                  id: "902",
                  nblastScore: 1.1443081258630274,
                  coverage: 20.200780049909486
                },
                {
                  id: "13848",
                  nblastScore: 0.882812447547977,
                  coverage: 4.760817053741214
                },
                {
                  id: "1865",
                  nblastScore: 1.0210256500388921,
                  coverage: 17.78782185624468
                },
                {
                  id: "1385",
                  nblastScore: 0.9059436181134872,
                  coverage: 12.48251169218294
                },
                {
                  id: "4211",
                  nblastScore: 1.36112959,
                  coverage: 7.74539308
                },
                {
                  id: "17440",
                  nblastScore: 1.00360061,
                  coverage: 8.18652672
                },
                {
                  id: "13365",
                  nblastScore: 0.88277386,
                  coverage: 4.90814712
                },
                {
                  id: "9781",
                  nblastScore: 0.74785466,
                  coverage: 4.21660947
                },
                {
                  id: "23635",
                  nblastScore: 0.59818738,
                  coverage: 1.07071272
                },
                {
                  id: "1389",
                  nblastScore: 0.82755635,
                  coverage: 8.20622784
                },
                {
                  id: "12063",
                  nblastScore: 0.64244937,
                  coverage: 3.87540901
                },
                {
                  id: "12565",
                  nblastScore: 0.59679483,
                  coverage: 3.90852973
                },
                {
                  id: "17802",
                  nblastScore: 0.40493036,
                  coverage: 0.34262807
                },
                {
                  id: "19009",
                  nblastScore: 0.40140877,
                  coverage: 2.3458602
                },
                {
                  id: "8743",
                  nblastScore: 0.33430953,
                  coverage: 1.28485527
                },
                {
                  id: "5554",
                  nblastScore: 0.26203954,
                  coverage: 0.9422272
                },
                {
                  id: "2",
                  nblastScore: 0.66136444,
                  coverage: 16.90812428
                },
                {
                  id: "4402",
                  nblastScore: 0.38805921,
                  coverage: 6.42199215
                }
              ]
            }
          ]
        })
      );
    }
  )
];
