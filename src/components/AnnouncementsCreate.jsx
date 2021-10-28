import React, { useState } from "react";
import {
  Form,
  Card,
  Input,
  DatePicker,
  Checkbox,
  Select,
  Button,
  message
} from "antd";
import { Auth, API } from "aws-amplify";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

export default function AnnouncementsCreate() {
  const [loading, setLoading] = useState(false);

  // on submit handler
  const handleSubmit = data => {
    // convert dates to timestamps
    setLoading(true);
    const { dates, ...updatedData } = data;
    updatedData.startTime = dates[0].format("x");
    updatedData.endTime = dates[1].format("x");

    Auth.currentCredentials().then(() => {
      API.post("SearchAPI", "/announcements", {
        body: updatedData
      })
        .then(() => {
          message.success("Announcement has been published");
          setLoading(false);
        })
        .catch(error => {
          message.error(error.message);
          setLoading(false);
        });
    });
  };

  // input fields for message, start and end times, link actions, etc.
  return (
    <Card size="small" title="Add an announcement">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        name="newAnnouncement"
        initialValues={{
          type: "info",
          closable: true,
          stamp: false
        }}
        layout="horizontal"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="message"
          name="message"
          rules={[
            {
              required: true,
              message: "Please enter a message to be displayed!"
            }
          ]}
        >
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="dates"
          name="dates"
          rules={[
            {
              type: "array",
              required: true,
              message: "Please select a start & end time to display the alert!"
            }
          ]}
        >
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>
        <Form.Item
          name="closable"
          valuePropName="checked"
          wrapperCol={{ offset: 4, span: 20 }}
        >
          <Checkbox>Closable</Checkbox>
        </Form.Item>
        <Form.Item
          name="stamp"
          valuePropName="checked"
          wrapperCol={{ offset: 4, span: 20 }}
        >
          <Checkbox>Show time stamp</Checkbox>
        </Form.Item>
        <Form.Item name="type" label="type">
          <Select>
            <Option value="info">Info</Option>
            <Option value="warning">Warning</Option>
            <Option value="error">Error</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Action" style={{ marginBottom: 0 }}>
          <Form.Item
            name="actionText"
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <Input placeholder="Action button text - should be short" />
          </Form.Item>
          <Form.Item
            name="actionLink"
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px"
            }}
          >
            <Input placeholder="Action button link, eg: /announcements" />
          </Form.Item>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
