import React from "react";
import { Typography, Form, Select, Input, Checkbox } from "antd";

const { Title } = Typography;
const { Option } = Select;

export default function ColorDepthSearchParameters() {
  return (
    <div>
      <Title level={3}>Set the search parameters</Title>
      <Form.Item
        label="Target Image Library"
        name="searchType"
        rules={[{ required: true, message: "Please choose a search type!" }]}
      >
        <Select>
          <Option value="em2lm">Light Microscopy Libraries</Option>
          <Option value="lm2em">Electron Microscopy Libraries</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Data Threshold" name="dataThreshold" rules={[]}>
        <Input step={1} type="number" placeholder="0" min={0} max={255} />
      </Form.Item>
      <Form.Item label="Mask Threshold" name="maskThreshold" rules={[]}>
        <Input step={1} type="number" placeholder="0" min={0} max={255} />
      </Form.Item>
      <Form.Item label="Z Slice Range" name="zSliceRange" rules={[]}>
        <Select>
          <Option value="1">1</Option>
          <Option value="3">3</Option>
          <Option value="5">5</Option>
        </Select>
      </Form.Item>
      <Form.Item label="XY Shift" name="xyShift" rules={[]}>
        <Select>
          <Option value={0}>0px</Option>
          <Option value={2}>2px</Option>
          <Option value={4}>4px</Option>
        </Select>
      </Form.Item>
      <Form.Item
        wrapperCol={{ offset: 8, span: 16 }}
        name="mirrorMask"
        valuePropName="checked"
      >
        <Checkbox>Mirror Mask</Checkbox>
      </Form.Item>
    </div>
  );
}
