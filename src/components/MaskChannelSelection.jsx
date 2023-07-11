import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Storage } from "aws-amplify";
import { Typography, Radio, Row, Col, Card, Button, Tooltip } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import { signedLink, toDataURL } from "../libs/awsLib";
import config from "../config";

const { Paragraph } = Typography;

export default function MaskChannelSelection({ searchDir, channel, onChange }) {
  const [channelObjects, setChannels] = useState([]);
  useEffect(() => {
    async function fetchData() {
      // clear out the channel state before loading in the new ones.
      setChannels([]);
      // get list of channel images from s3
      const channelsUrl = `${searchDir}/generatedMIPS`;
      const options = {
        level: "private",
        pageSize: 'ALL',
        bucket: config.SEARCH_BUCKET
      };
      const channelsList = await Storage.list(channelsUrl, options);

      channelsList.results.forEach(original => {
        // get signed urls for each one
        signedLink(original.key).then(signed => {
          // figure out channel number from file name
          if (/\.png$/.test(original.key)) {
            const number = parseInt(original.key.match(/_(\d*)\.png$/)[1], 10);
            setChannels(existing => [
              ...existing,
              { signed, url: original.key, number }
            ]);
            if (channelsList.length === 1) {
              onChange(number, original.key);
            }
          }
        });
      });
    }
    fetchData();
  }, [searchDir, onChange]);

  const handleChannelSelect = e => {
    const channelImgSrc = channelObjects.filter(
      obj => obj.number === e.target.value
    )[0].url;
    onChange(e.target.value, channelImgSrc);
  };

  function handleCardClick(cobj) {
    onChange(cobj.number, cobj.url);
  }

  const handleDownload = async url => {
    const filename = url
      .split("\\")
      .pop()
      .split("/")
      .pop();
    const a = document.createElement("a");
    a.href = await toDataURL(url, {private: true});
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const channelImages = channelObjects.map(cobj => {
    const title = `Channel ${cobj.number}`;
    const selectTitle = <Radio value={cobj.number}>{title}</Radio>;
    return (
      <Col key={cobj.number} xs={24} md={12} lg={8} xl={6}>
        <Card
          size="small"
          title={selectTitle}
          style={{ width: "100%", marginBottom: "1em", cursor: "pointer" }}
          onClick={() => handleCardClick(cobj)}
        >
          <Tooltip title="Download this aligned channel">
            <Button
              type="primary"
              shape="circle"
              style={{ position: "absolute", bottom: "2px", right: "2px" }}
            >
              <DownloadOutlined onClick={() => handleDownload(cobj.url)} />
            </Button>
          </Tooltip>
          <img
            src={cobj.signed}
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
