import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Typography,
  Switch,
  message
} from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import { deleteSearch } from "../libs/awsLib";

const { Option } = Select;
const { Title } = Typography;

export default function SearchUploadMeta({
  uploadedFile,
  onSearchSubmit,
  onCancel
}) {
  const [isAligned, setIsAligned] = useState(true);
  const [override, setOverride] = useState(false);
  const [fakeMips, setFakeMips] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const history = useHistory();

  if (!uploadedFile) {
    return null;
  }

  const onFinish = values => {
    setIsUploading(true);
    Auth.currentCredentials().then(currentCreds => {
      const searchDetails = {
        step: 0,
        algorithm: values.algorithm,
        searchType: values.searchType,
        identityId: currentCreds.identityId,
        searchDir: uploadedFile.filename,
        upload: uploadedFile.file.name,
        mimeType: values.mimetype,
        simulateMIPGeneration: fakeMips,
        anatomicalRegion: values.anatomicalregion
      };

      if (!isAligned) {
        if (override) {
          searchDetails.userDefinedImageParams = true;
          searchDetails.voxelX = parseFloat(values.voxelxy);
          searchDetails.voxelY = parseFloat(values.voxelxy);
          searchDetails.voxelZ = parseFloat(values.voxelz);
        }
        if (values.referenceChannel !== "auto") {
          searchDetails.referenceChannel = values.referenceChannel;
        }
        if (process.env.NODE_ENV === "development") {
          searchDetails.channel = values.channel;
        }
      }

      API.graphql(
        graphqlOperation(mutations.createSearch, { input: searchDetails })
      )
        .then(result => {
          // if aligned already create the generatedMIPS file and go to mask selection page.
          if (isAligned) {
            API.post("SearchAPI", "/create_default_channel", {
              body: {
                searchId: result.data.createSearch.id
              }
            })
              .then(() => {
                setIsUploading(false);
                history.push(`/mask-selection/${result.data.createSearch.id}`);
              })
              .catch(() => {
                deleteSearch({ id: result.data.createSearch.id });
                setIsUploading(false);
                message.error(
                  "There was a problem contacting the search service. Please wait and try again. If the problem persists, please contact us via the link at the bottom of the page.",
                  8
                );
              });
          } else {
            // else trigger the alignment to start on the backend.
            API.post("SearchAPI", "/searches", {
              body: {
                submittedSearches: [
                  {
                    id: result.data.createSearch.id,
                    searchMask: uploadedFile.file.name
                  }
                ]
              }
            })
              .then(() => {
                setIsUploading(false);
                onSearchSubmit();
              })
              .catch(() => {
                deleteSearch({ id: result.data.createSearch.id });
                setIsUploading(false);
                message.error(
                  "There was a problem contacting the search service. Please wait and try again. If the problem persists, please contact us via the link at the bottom of the page.",
                  8
                );
              });
          }
        })
        .catch(e => {
          setIsUploading(false);
          e.errors.forEach(error => {
            message.error(error.message);
          });
        });
    });
  };

  const onFakeChange = checked => {
    setFakeMips(checked);
  };

  const onOverrideChange = checked => {
    setOverride(checked);
  };

  const onAlignedChange = checked => {
    setIsAligned(checked);
  };

  return (
    <div>
      <Title level={3}>
        Tell us more about your image: {uploadedFile.file.name}
      </Title>

      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        name="basic"
        initialValues={{
          searchtype: "em2lm",
          anatomicalregion: "brain",
          algorithm: "max",
          referenceChannel: "auto",
          mimetype:
            uploadedFile.file.type || "Couldn't be determined, please select"
        }}
        onFinish={onFinish}
      >
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
        <Form.Item label="Anatomical Region" name="anatomicalregion">
          <Select>
            <Option value="brain">Brain</Option>
            <Option value="vnc" disabled>VNC</Option>
          </Select>
        </Form.Item>

        {!isAligned && (
          <>
            <Row>
              <Col span={8} style={{ textAlign: "right" }}>
                <Title level={4}>Alignment Parameters</Title>
              </Col>
            </Row>
            <Row style={{ marginBottom: "1em" }}>
              <Col span={8} style={{ textAlign: "right" }}>
                <label htmlFor="aligned" style={{ marginRight: "8px" }}>
                  Override Image Properties:{" "}
                </label>
              </Col>
              <Col span={2}>
                <Switch
                  style={{ margin: "0 0 1em 0" }}
                  id="aligned"
                  name="aligned"
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  checked={override}
                  onChange={onOverrideChange}
                />{" "}
              </Col>
              <Col span={14} style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                By default we will try to infer voxel size and reference channel
                from your file. If this doesn&apos;t work, you will need to
                override the values here.
              </Col>
            </Row>

            {override && (
              <>
                <Form.Item label="Template Matching Algorithm" name="algorithm">
                  <Select>
                    <Option value="max">
                      Maximum Intensity (Good for clean samples)
                    </Option>
                    <Option value="avg">
                      Median Intensity (Better for noisy samples)
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Voxel Size (microns)"
                  rules={[
                    { required: true, message: "Please choose a voxel size!" }
                  ]}
                  style={{ marginBottom: 0 }}
                >
                  <Form.Item
                    name="voxelxy"
                    rules={[
                      { required: true, message: "Voxel XY size is required" }
                    ]}
                    style={{ display: "inline-block", marginRight: "1em" }}
                  >
                    <Input
                      addonBefore="XY"
                      step={0.01}
                      precision={3}
                      type="number"
                      placeholder="0"
                      min={0}
                    />
                  </Form.Item>
                  <Form.Item
                    name="voxelz"
                    rules={[
                      { required: true, message: "Voxel Z size is required" }
                    ]}
                    style={{ display: "inline-block", marginRight: "1em" }}
                  >
                    <Input
                      addonBefore="Z"
                      step={0.01}
                      precision={3}
                      type="number"
                      placeholder="0"
                      min={0}
                    />
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  label="Reference Channel Index"
                  name="referenceChannel"
                  extra="This is the channel that will be aligned to the reference brain. It must include staining through-out the entire neuropil. A typical example is Brp antibody staining with nc82."
                >
                  <Select>
                    <Option value="auto">Auto-detect</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                  </Select>
                </Form.Item>
              </>
            )}
            {process.env.NODE_ENV === "development" && (
              <>
                <Row>
                  <Col span={8} style={{ textAlign: "right" }}>
                    <Title level={4}>Dev Only!!</Title>
                  </Col>
                </Row>
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
                {fakeMips ? (
                  <Form.Item
                    label="Channel count"
                    name="channel"
                    rules={[
                      {
                        required: true,
                        message: "Channel count is required"
                      }
                    ]}
                  >
                    <Select>
                      <Option value={1}>1</Option>
                      <Option value={2}>2</Option>
                      <Option value={3}>3</Option>
                      <Option value={4}>4</Option>
                    </Select>
                  </Form.Item>
                ) : (
                  ""
                )}
              </>
            )}
          </>
        )}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isUploading}>
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
