import React, { useState } from "react";
import PropTypes from "prop-types";
import { Auth } from "aws-amplify";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Form, message } from "antd";
import LoaderButton from "./LoaderButton";
import "./Login.css";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values) {

    setIsLoading(true);

    try {
      await Auth.signIn(values.email, values.password);
      props.userHasAuthenticated(true);
    } catch (e) {
      message.error(e.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email address" }
          ]}
        >
          <Input
            autoFocus
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email address"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <LoaderButton
          block
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
}

Login.propTypes = {
  userHasAuthenticated: PropTypes.func.isRequired
};
