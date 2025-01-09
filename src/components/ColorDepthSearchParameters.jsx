import React, { useContext } from "react";
import propTypes from "prop-types";
import { Typography, Form, Select, Input, Checkbox } from "antd";
import { AppContext } from "../containers/AppContext";

const { Title } = Typography;
const { Option } = Select;

// TODO: load the image collections from the appcontext and populate the select options
// instead of hardcoding them.
export default function ColorDepthSearchParameters({ searchMeta }) {
  const { appState } = useContext(AppContext);

  const collections = [];

  Object.values(appState.dataConfig.stores).forEach((store) => {
    // if the value in the anatomical area does not match to a case
    // insensitive substring of the store anatomical area, then skip it.
    if (
      searchMeta.anatomicalRegion.toLowerCase() !==
      store.anatomicalArea.toLowerCase()
    ) {
      return;
    }
    const { lmLibraries, emLibraries } = store.customSearch;
    lmLibraries.forEach((library) => {
      collections.push(
        <Option key={library.name} value={library.name}>
          {library.name.replace(/_/g,' ')} ({library.count})
        </Option>,
      );
    });
    emLibraries.forEach((library) => {
      collections.push(
        <Option key={library.name} value={library.name}>
          {library.name.replace(/_/g, ' ')} ({library.count})
        </Option>,
      );
    });
  });

  return (
    <div>
      <Title level={3}>Set the search parameters</Title>
      <Form.Item
        label="Target Image Collection"
        name="searchType"
        rules={[{ required: true, message: "Please choose a search type!" }]}
      >
        <Select>{collections}</Select>
      </Form.Item>
      <Form.Item
        extra="Values between 0 - 255. Intensity values in the mask image which are below this cutoff are ignored."
        label="Mask Threshold"
        name="maskThreshold"
        rules={[]}
      >
        <Input step={1} type="number" placeholder="0" min={0} max={255} />
      </Form.Item>
      <Form.Item
        extra="Values between 0 - 255. Intensity values in the CDM libraries which are below this cutoff are ignored."
        label="Data Threshold"
        name="dataThreshold"
        rules={[]}
      >
        <Input step={1} type="number" placeholder="0" min={0} max={255} />
      </Form.Item>
      <Form.Item
        extra="Tolerance for how many Z slices to search for each pixel in the mask"
        label="Z Slice Range"
        name="pixColorFluctuation"
        rules={[]}
      >
        <Select>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="5">5</Option>
        </Select>
      </Form.Item>
      <Form.Item
        extra="Number of pixels to shift mask in XY plane"
        label="XY Shift"
        name="xyShift"
        rules={[]}
      >
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

ColorDepthSearchParameters.propTypes = {
  searchMeta: propTypes.object.isRequired,
};
