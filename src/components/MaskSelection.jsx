import React, { useEffect, useState, useCallback } from "react";
import { Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Auth, Storage, API, graphqlOperation } from "aws-amplify";
import { message, Form, Button, Typography, Divider } from "antd";
import NotFound from "./NotFound";
import MaskDrawing from "./MaskDrawing";
import MaskChannelSelection from "./MaskChannelSelection";
import ColorDepthSearchParameters from "./ColorDepthSearchParameters";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import { signedLink } from "../libs/awsLib";
import config from "../config";

const { Title, Paragraph } = Typography;

export default function MaskSelection({ match }) {
  const searchId = match.params.id;
  const [searchMeta, setSearchMeta] = useState(null);
  const [maskedImage, setMaskedImage] = useState(null);
  const [missingResults, setMissingResults] = useState(false);
  const [channel, setChannel] = useState(null);
  const [channelImgSrc, setChannelImgSrc] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (searchId) {
      const query = graphqlOperation(queries.getSearch, {
        id: searchId
      });
      API.graphql(query)
        .then(results => {
          const currentMeta = results.data.getSearch;
          // TODO: we should be using the mask image and not the upload for this
          // When masks are ready this needs to be changed over.
          if (!currentMeta) {
            setMissingResults(true);
          } else {
            const uploadUrl = `${currentMeta.searchDir}/${currentMeta.upload}`;
            // TODO: add another step here to generate the real imageURL,
            // rather than use the same one as the thumbnail.
            signedLink(uploadUrl).then(result => {
              const metaWithSignedUrls = {
                ...currentMeta,
                thumbnailURL: result,
                imageURL: result
              };
              setSearchMeta(metaWithSignedUrls);
            });
          }
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            setMissingResults(true);
          } else {
            message.error(error.message);
          }
        });
    }
  }, [searchId]);

  const handleChannelSelect = useCallback((selectedChannel, imgSrc) => {
    setChannelImgSrc(imgSrc);
    setChannel(selectedChannel);
  }, []);

  // if the search step is anything other than the mask selection step,
  // redirect the site back to the search results list.
  if (searchMeta && searchMeta.step !== 2) {
    return <Redirect to="/upload" />;
  }

  if (missingResults) {
    return <NotFound />;
  }

  const handleMaskChange = maskImageData => {
    setMaskedImage(maskImageData);
  };

  const handleCancel = () => {
    history.replace("/upload");
  };

  const handleSubmit = async searchFormData => {
    if (!channelImgSrc) {
      message.info("Please select a channel to use as the search input");
      return;
    }

    setSubmitting(true);
    Auth.currentCredentials()
      .then(async () => {
        // use the whole channel image if no mask was drawn on the image
        let maskName = channelImgSrc.replace(`${searchMeta.searchDir}/`, "");
        let maskPath = `${channelImgSrc}`;

        if (maskedImage) {
          // They drew a path, so we need to upload it and record the
          // location of the masked file
          const uploadName = searchMeta.upload.replace(/\.[^.]*$/, "");
          maskName = `${uploadName}_${channel}_mask.png`;
          maskPath = `${searchMeta.searchDir}/${maskName}`;
          await Storage.put(maskPath, maskedImage, {
            contentType: maskedImage.type,
            level: "private",
            bucket: config.SEARCH_BUCKET
          });
        }

        const maskDetails = { searchMask: maskName, id: searchMeta.id };
        const searchParams = { ...searchFormData, ...maskDetails };
        API.graphql(
          graphqlOperation(mutations.updateSearch, { input: searchParams })
        ).then(() => {
          // kick off the search
          API.post("SearchAPI", "/searches", {
            body: {
              submittedSearches: [
                {
                  id: searchMeta.id,
                  searchMask: maskName
                }
              ]
            }
          }).then(() => {
            // redirect back to search progress page.
            setSubmitting(false);
            history.push("/upload");
          });
        });
      })
      .catch(error => {
        message.error(error.message);
        setSubmitting(false);
      });
  };

  let dividerMessage = "Please choose a channel from above to create your mask";
  if (channel) {
    dividerMessage =
      "Use your mouse to draw around the area you wish to search. This will create a mask by removing the contents of the image around the region you selected.";
  }

  const anatomicalRegion = searchMeta ? searchMeta.anatomicalRegion : undefined;

  return (
    <div>
      <Title component="h2">Mask selection</Title>
      {searchMeta ? (
        <MaskChannelSelection
          searchDir={searchMeta.searchDir}
          channel={channel}
          onChange={handleChannelSelect}
        />
      ) : null}
        <Divider orientation="left"/>
        <Paragraph>{dividerMessage}</Paragraph>
      <MaskDrawing imgSrc={channelImgSrc} onMaskChange={handleMaskChange} anatomicalRegion={anatomicalRegion} />
      <Divider />
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        name="basic"
        initialValues={{
          searchType: "lm2em",
          dataThreshold: 100,
          maskThreshold: 100,
          xyShift: 2,
          pixColorFluctuation: 1,
          mirrorMask: true
        }}
        onFinish={handleSubmit}
      >
        <ColorDepthSearchParameters />
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Submit
          </Button>
          <Button
            type="default"
            onClick={handleCancel}
            style={{ marginLeft: "1em" }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

MaskSelection.propTypes = {
  match: PropTypes.object.isRequired
};
