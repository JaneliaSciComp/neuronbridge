import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, InputNumber, Select, Button, Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Auth, Storage } from "aws-amplify";
import config from "../config";

const { Option } = Select;

const mimetypesToExtension = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/tiff": "tif",
  "image/lsm": "lsm",
  "image/czi": "czi",
  "image/oif": "oif",
  "application/zip": "zip"
};

export default function SearchUploadMeta({ uploadedFile, onSearchSubmit, onCancel }) {
  const [isAligned, setIsAligned] = useState(true);

  if (!uploadedFile) {
    return null;
  }

  const onFinish = values => {
    Auth.currentCredentials().then(() => {
      Storage.put(`${uploadedFile.filename}/searchMeta.json`, values, {
        level: "private",
        bucket: config.SEARCH_BUCKET
      })
        .then(result => {
          onSearchSubmit();
          console.log(result);
        })
        .catch(e => console.log(e));
    });
  };

  const onFinishFailed = error => {
    console.log(error);
  };

  const onAlignedChange = checked => {
    setIsAligned(checked);
  };

  const mimeTypeOptions = Object.keys(mimetypesToExtension)
    .sort()
    .map(type => {
      return (
        <Option key={type} value={type}>
          {mimetypesToExtension[type]}
        </Option>
      );
    });

  return (
    <div>
      <p> Search parameters for {uploadedFile.file.name}</p>
      <p>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={isAligned}
          onChange={onAlignedChange}
        />{" "}
        Has this image been aligned already?
      </p>

      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        name="basic"
        initialValues={{
          searchtype: "em2lm",
          anatomicalregion: "brain",
          algorithm: "max",
          mimetype: uploadedFile.file.type ||
            "Couldn't be determined, please select"
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Search Type"
          name="searchType"
          rules={[{ required: true, message: "Please choose a search type!" }]}
        >
          <Select>
            <Option value="em2lm">EM to LM</Option>
            <Option value="lm2em">LM to EM</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Template Matching Algorithm" name="algorithm">
          <Select>
            <Option value="max">
              Maximum Intensity (Good for clean samples)
            </Option>
            <Option value="avg">
              Average Intensity (Better for noisy samples)
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Image mime-type"
          name="mimetype"
          rules={[
            { required: true, message: "Please choose a mime-type!" },
            {
              validator: (_, value) =>
                mimetypesToExtension[value]
                  ? Promise.resolve()
									// eslint-disable-next-line
                  : Promise.reject("Please select a valid mime-type")
            }
          ]}
        >
          <Select>{mimeTypeOptions}</Select>
        </Form.Item>

        {!isAligned && (
          <>
            <Form.Item
              label="Voxel Size (microns)"
              rules={[
                { required: true, message: "Please choose a voxel size!" }
              ]}
              style={{ marginBottom: 0 }}
            >
              <Form.Item
                name="voxelx"
                rules={[{ required: true }]}
                style={{ display: "inline-block" }}
              >
                <InputNumber />
              </Form.Item>
              <span>x</span>
              <Form.Item
                name="voxely"
                rules={[{ required: true }]}
                style={{ display: "inline-block" }}
              >
                <InputNumber />
              </Form.Item>
              <span>x</span>
              <Form.Item
                name="voxelz"
                rules={[{ required: true }]}
                style={{ display: "inline-block" }}
              >
                <InputNumber />
              </Form.Item>
            </Form.Item>

            <Form.Item
              label="Channel to Align"
              name="channel"
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
              <Select>
                <Option value="brain">Brain</Option>
                <Option value="vnc">VNC</Option>
              </Select>
            </Form.Item>
          </>
        )}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
				<Button onClick={onCancel}>Cancel</Button>
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
