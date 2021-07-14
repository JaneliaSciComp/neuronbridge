import { rest } from 'msw';

/* eslint-disable-next-line import/prefer-default-export */
export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true');
    return res(
      // Respond with a 200 status code
      ctx.status(200),
    )
	}),
  rest.get('https://janelia-neuronbridge-data-dev.s3.us-east-1.amazonaws.com/v2_1_0/metadata/by_body/543584523.json', (req, res, ctx) => {
    // Persist user's authentication in the session
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        results : [{
          id : "2820604059260551179",
          publishedName : "543584523",
          libraryName : "FlyEM_Hemibrain_v1.1",
          imageURL : "JRC2018_Unisex_20x_HR/FlyEM_Hemibrain_v1.1/543584523-LV-JRC2018_Unisex_20x_HR-CDM.png",
          thumbnailURL : "JRC2018_Unisex_20x_HR/FlyEM_Hemibrain_v1.1/543584523-LV-JRC2018_Unisex_20x_HR-CDM.jpg",
          gender : "f"
        }]
      })
    )
	})

];
