import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { API, graphqlOperation } from "aws-amplify";
import { message, Button, Radio, Typography, Row, Col, Card } from "antd";
import NotFound from "./NotFound";
import MaskDrawing from "./MaskDrawing";
import * as queries from "../graphql/queries";
import { signedLink } from "../libs/awsLib";

const { Title, Paragraph } = Typography;

export default function MaskSelection({ match }) {
  const searchId = match.params.id;
  const [searchMeta, setSearchMeta] = useState(null);
  const [missingResults, setMissingResults] = useState(false);
  const [channel, setChannel] = useState(null);
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
          // rather than use the sameone as the thumbnail.
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
    return <Redirect to="/mysearches" />;
  }

  if (missingResults) {
    return <NotFound />;
  }

  const channelImages = [0, 1, 2, 3, 4].map(image => {
    const title = `Channel ${image}`;
    const selectTitle = <Radio value={image}>{title}</Radio>;
    return (
      <Col key={image} xs={24} md={12} lg={12} xl={8}>
        <Card size="small" title={selectTitle} style={{ width: "100%", marginBottom: '1em' }}>
          <img src="/maskplaceholder.jpg" style={{maxWidth: '100%'}} alt="colordepth mip" />
        </Card>
      </Col>
    );
  });

  const handleChannelSelect = e => {
    setChannel(e.target.value);
  };

  const handleSubmit = () => {
    // send mask image to server
    // kick off the search
    // redirect back to search progress page.
    history.push('/mysearches');
  };

  let imgSrc;
  if (channel !== null) {
    imgSrc = `Channel ${channel}`;
  }

  return (
    <div>
      <Title component="h2">Mask selection</Title>
      <Paragraph>Choose a channel to use in your search</Paragraph>
      <Radio.Group onChange={handleChannelSelect} value={channel} style={{ display: 'block'}}>
        <Row gutter={16}>{channelImages}</Row>
      </Radio.Group>
      <MaskDrawing imgSrc={imgSrc} />
      <Button type="primary" onClick={handleSubmit}>Submit</Button>
      <Paragraph>
        Once mask is uploaded, redirect back to the searches page to show
        progress.
      </Paragraph>
    </div>
  );
}

MaskSelection.propTypes = {
  match: PropTypes.object.isRequired
};
