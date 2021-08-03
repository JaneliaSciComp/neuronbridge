import { signedPublicLink } from "../awsLib";

describe("aws lib testing", () => {
  it("works for non aws urls", () => {
    expect.assertions(1);
    const nonAWSUrl = "https://www.google.com";
    return expect(signedPublicLink(nonAWSUrl)).resolves.toEqual(nonAWSUrl);
  });
  /* it("works for aws urls", () => {
    expect.assertions(1);
    const awsUrl =
      "https://s3.amazonaws.com/janelia-ppp-match-dev/JRC2018_Unisex_20x_HR/20x_HR-ch_skel.png";
    return expect(signedPublicLink(awsUrl)).resolves.toEqual(awsUrl);
  }); */
});
