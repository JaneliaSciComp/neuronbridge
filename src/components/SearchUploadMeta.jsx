import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Form,
  InputNumber,
  Select,
  Button,
  Switch,
  message
} from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";

const { Option } = Select;

export default function SearchUploadMeta({
  uploadedFile,
  onSearchSubmit,
  onCancel
}) {
  const [isAligned, setIsAligned] = useState(true);
  const [fakeMips, setFakeMips] = useState(false);

  if (!uploadedFile) {
    return null;
  }

  const onFinish = values => {
    Auth.currentCredentials().then(currentCreds => {
      const searchDetails = {
        step: isAligned ? 2 : 0,
        algorithm: values.algorithm,
        searchType: values.searchType,
        identityId: currentCreds.identityId,
        searchDir: uploadedFile.filename,
        upload: uploadedFile.file.name,
        mimeType: values.mimetype,
        simulateMIPGeneration: fakeMips
      };

      if (!isAligned) {
        searchDetails.anatomicalRegion = values.anatomicalregion;
        searchDetails.channel = values.channel;
        searchDetails.voxelX = values.voxelx;
        searchDetails.voxelY = values.voxely;
        searchDetails.voxelZ = values.voxelz;
      }

      if (isAligned) {
        searchDetails.searchMask = uploadedFile.file.name;
      }

      API.graphql(
        graphqlOperation(mutations.createSearch, { input: searchDetails })
      )
        .then(result => {
          // trigger the search to start on the backend.
          API.post("SearchAPI", "/searches", {
            body: {
              submittedSearches: [
                {
                  id: result.data.createSearch.id,
                  searchMask: uploadedFile.file.name
                }
              ]
            }
          });

          onSearchSubmit();
        })
        .catch(e => {
          e.errors.forEach(error => {
            message.error(error.message);
          });
        });
    });
  };

  const onFakeChange = checked => {
    setFakeMips(checked);
  };

  const onAlignedChange = checked => {
    setIsAligned(checked);
  };

  return (
    <div>
      <p> Search parameters for {uploadedFile.file.name}</p>
      <Row>
        <Col span={8} style={{ textAlign: "right" }}>
          <label htmlFor="aligned" style={{ marginRight: "8px" }}>
            Has this image been aligned already?:{" "}
          </label>
        </Col>
        <Col>
          <Switch
            style={{ margin: "0 0 1em 0" }}
            id="aligned"
            name="aligned"
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={isAligned}
            onChange={onAlignedChange}
          />{" "}
        </Col>
      </Row>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        name="basic"
        initialValues={{
          searchtype: "em2lm",
          anatomicalregion: "brain",
          algorithm: "max",
          mimetype:
            uploadedFile.file.type || "Couldn't be determined, please select"
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Search"
          name="searchType"
          rules={[{ required: true, message: "Please choose a search type!" }]}
        >
          <Select>
            <Option value="em2lm">LM Libraries</Option>
            <Option value="lm2em">EM Libraries</Option>
          </Select>
        </Form.Item>
        {!isAligned && (
          <>
            {/* <Form.Item label="Template Matching Algorithm" name="algorithm">
              <Select>
                <Option value="max">
                  Maximum Intensity (Good for clean samples)
                </Option>
                <Option value="avg">
                  Average Intensity (Better for noisy samples)
                </Option>
              </Select>
            </Form.Item> */}
            <Form.Item
              label="Voxel Size (microns)"
              rules={[
                { required: true, message: "Please choose a voxel size!" }
              ]}
              style={{ marginBottom: 0 }}
            >
              <span> x </span>
              <Form.Item
                name="voxelx"
                rules={[{ required: true }]}
                style={{ display: "inline-block", marginRight: '1em' }}
              >
                <InputNumber step={0.1} precision={3} type="number" />
              </Form.Item>
              <span> y </span>
              <Form.Item
                name="voxely"
                rules={[{ required: true }]}
                style={{ display: "inline-block", marginRight: '1em' }}
              >
                <InputNumber step={0.1} precision={3} type="number" />
              </Form.Item>
              <span> z </span>
              <Form.Item
                name="voxelz"
                rules={[{ required: true }]}
                style={{ display: "inline-block", marginRight: '1em' }}
              >
                <InputNumber step={0.1} precision={3} type="number" />
              </Form.Item>
            </Form.Item>

            <Form.Item
              label="Number of Channels"
              name="channel"
              extra="Our alignment algorithm assumes channel 0 is the reference."
              rules={[{ required: true, message: "Please choose a channel!" }]}
            >
              <Select>
                <Option value="0">0</Option>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Anatomical Region" name="anatomicalregion">
              <Select disabled>
                <Option value="brain">Brain</Option>
                <Option value="vnc">VNC</Option>
              </Select>
            </Form.Item>
            {process.env.NODE_ENV === "development" && (
              <Row>
                <Col
                  span={8}
                  style={{ textAlign: "right", marginRight: "8px" }}
                >
                  Use fake channels for masking?:{" "}
                </Col>
                <Col>
                  <Switch
                    style={{ margin: "0 0 1em 0" }}
                    id="fake"
                    name="fake"
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={fakeMips}
                    onChange={onFakeChange}
                  />
                </Col>
              </Row>
            )}
          </>
        )}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button style={{ marginLeft: "1em" }} onClick={onCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

SearchUploadMeta.propTypes = {
  uploadedFile: PropTypes.object,
  onSearchSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

SearchUploadMeta.defaultProps = {
  uploadedFile: null,
  onSearchSubmit: null,
  onCancel: null
};
