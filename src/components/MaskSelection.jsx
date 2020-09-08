import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Auth, Storage, API, graphqlOperation } from "aws-amplify";
import { message, Button, Typography, Divider } from "antd";
import NotFound from "./NotFound";
import MaskDrawing from "./MaskDrawing";
import MaskChannelSelection from "./MaskChannelSelection";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import { signedLink } from "../libs/awsLib";
import config from "../config";

const { Title } = Typography;

export default function MaskSelection({ match }) {
  const searchId = match.params.id;
  const [searchMeta, setSearchMeta] = useState(null);
  const [maskedImage, setMaskedImage] = useState(null);
  const [missingResults, setMissingResults] = useState(false);
  const [channel, setChannel] = useState(null);
  const [channelImgSrc, setChannelImgSrc] = useState(null);
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
        })
        .catch(error => {
          if (error.response.status === 404) {
            setMissingResults(true);
          } else {
            message.error(error.message);
          }
        });
    }
  }, [searchId]);

  // if the search step is anything other than the mask selection step,
  // redirect the site back to the search results list.
  if (searchMeta && searchMeta.step !== 2) {
    return <Redirect to="/upload" />;
  }

  if (missingResults) {
    return <NotFound />;
  }

  const handleChannelSelect = (selectedChannel, imgSrc) => {
    setChannelImgSrc(imgSrc);
    setChannel(selectedChannel);
  };

  const handleMaskChange = maskImageData => {
    setMaskedImage(maskImageData);
  };

  const handleSubmit = () => {
    if (!maskedImage) {
      message.info("Please select a channel for masking and mask the image");
      return;
    }
    // send mask image to server
    Auth.currentCredentials().then(() => {
      const uploadName = searchMeta.upload.replace(/\.[^.]*$/, "");
      const maskName = `${uploadName}_${channel}_mask.png`;
      const maskPath = `${searchMeta.searchDir}/${maskName}`;
      Storage.put(maskPath, maskedImage, {
        contentType: maskedImage.type,
        level: "private",
        bucket: config.SEARCH_BUCKET
      })
        .then(() => {
          // add the file to DynamoDB
          const maskDetails = { searchMask: maskName, id: searchMeta.id };
          API.graphql(
            graphqlOperation(mutations.updateSearch, { input: maskDetails })
          ).then(() => {
            // kick off the search
            API.post("SearchAPI", "/searches", {
              body: {
                searchIds: [searchMeta.id]
              }
            })
              .then(response => {
                console.log(response);
                // redirect back to search progress page.
                history.push("/upload");
              })
              .catch(error => console.log(error));
          });
        })
        .catch(e => console.error(e));
    });
  };

  let dividerMessage = "Please choose a channel to create your mask";
  if (channel) {
    dividerMessage =
      "Use your mouse to draw around the area you wish to search. Then click 'Create Mask' to preview.";
  }

  return (
    <div>
      <Title component="h2">Mask selection</Title>
      {searchMeta && (
        <MaskChannelSelection
          searchDir={searchMeta.searchDir}
          channel={channel}
          onChange={handleChannelSelect}
        />
      )}
      <Divider orientation="left">{dividerMessage}</Divider>
      <MaskDrawing imgSrc={channelImgSrc} onMaskChange={handleMaskChange} />
      <Divider />
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

MaskSelection.propTypes = {
  match: PropTypes.object.isRequired
};
