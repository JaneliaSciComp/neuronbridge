import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Storage } from "aws-amplify";
import { Typography, Radio, Row, Col, Card } from "antd";
import { signedLink } from "../libs/awsLib";
import config from "../config";

const { Paragraph } = Typography;

export default function MaskChannelSelection({ searchDir, channel, onChange }) {
  const [channelObjects, setChannels] = useState([]);
  useEffect(() => {
    async function fetchData() {
      // get list of channel images from s3
      const channelsUrl = `${searchDir}/generatedMIPS`;
      const options = {
        level: "private",
        bucket: config.SEARCH_BUCKET
      };
      const channelsList = await Storage.list(channelsUrl, options);

      channelsList.forEach(original => {
        // get signed urls for each one
        signedLink(original.key).then(signed => {
          // figure out channel number from file name
          const number = parseInt(original.key.match(/_(\d*)\.png$/)[1],10);
          setChannels((existing) => [...existing, {url: signed, number}]);
        });
      });
      // set the selected image to the first channel available.
      // onChange(channelNum, channelImgSrc);
    }
    fetchData();
  }, [searchDir]);

  const handleChannelSelect = e => {
    const channelImgSrc = channelObjects.filter(obj => obj.number === e.target.value)[0].url;
    onChange(e.target.value, channelImgSrc);
  };

  const channelImages = channelObjects.map(cobj => {
    const title = `Channel ${cobj.number}`;
    const selectTitle = <Radio value={cobj.number}>{title}</Radio>;
    return (
      <Col key={cobj.number} xs={24} md={12} lg={8} xl={6}>
        <Card
          size="small"
          title={selectTitle}
          style={{ width: "100%", marginBottom: "1em" }}
        >
          <img
            src={cobj.url}
            style={{ maxWidth: "100%" }}
            alt="colordepth mip"
          />
        </Card>
      </Col>
    );
  });

  return (
    <>
      <Paragraph>Choose a channel to use in your search</Paragraph>
      <Radio.Group
        onChange={handleChannelSelect}
        value={channel}
        style={{ display: "block" }}
      >
        <Row gutter={16}>{channelImages}</Row>
      </Radio.Group>
    </>
  );
}

MaskChannelSelection.propTypes = {
  channel: PropTypes.number,
  searchDir: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

MaskChannelSelection.defaultProps = {
  channel: null
};
