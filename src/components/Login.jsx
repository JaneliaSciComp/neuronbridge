import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Form, Divider, message } from "antd";
import { AppContext } from "../containers/AppContext";
import LoaderButton from "./LoaderButton";
import GoogleLogin from "./GoogleLogin";

import "./Login.css";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [appState, setAppState] = useContext(AppContext);

  async function handleSubmit(values) {
    setIsLoading(true);

    try {
      await Auth.signIn(values.email, values.password);
      setAppState({
        ...appState,
        username: values.email
      });
    } catch (e) {
      message.error("Login error:", e.message);
      setIsLoading(false);
    }
  }

  const userHasAuthenticated = username => {
    setAppState({
      ...appState,
      username
    });
  };

  return (
    <div className="Login">
      <Form layout="vertical" onFinish={handleSubmit}>
        <p>
          By logging into this application you agree to the{" "}
          <Link to="/usage">Usage Terms</Link>
        </p>
        <GoogleLogin userHasAuthenticated={userHasAuthenticated} />
        <Divider>or</Divider>
        <p>Login with your email address.</p>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email address" }
          ]}
        >
          <Input
            autoFocus
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email address"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
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
        <Link className="forgotLink" to="/login/reset">
          Forgot password?
        </Link>
        <p className="forgotLink">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </Form>
    </div>
  );
}
