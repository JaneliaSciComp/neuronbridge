import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Row,
  Col,
  Checkbox,
  Form,
  Input,
  Space,
  message
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Auth } from "aws-amplify";
import LoaderButton from "./LoaderButton";
import { AppContext } from "../containers/AppContext";
import UsageTerms from "./UsageTerms";

import "./Signup.css";

const { Title } = Typography;

export default function Signup(props) {
  const [newUser, setNewUser] = useState(null);
  const [savedUser, setSavedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [appState, setAppState] = useContext(AppContext);
  const history = useHistory();

  async function handleSubmit(values) {
    setIsLoading(true);

    if (!acceptedTerms) {
      message.error("You must accept the terms of usage to proceed");
      setIsLoading(false);
      return;
    }

    try {
      const createdUser = await Auth.signUp({
        username: values.email,
        password: values.password
      });
      setIsLoading(false);
      setNewUser(createdUser);
      setSavedUser(values);
    } catch (e) {
      message.error(e.message);
      setIsLoading(false);
    }
  }

  function handleAcceptedTerms(event) {
    setAcceptedTerms(event.target.checked);
  }

  async function handleConfirmationSubmit(values) {
    setIsLoading(true);

    try {
      await Auth.confirmSignUp(savedUser.email, values.confirmationCode);
      await Auth.signIn(savedUser.email, savedUser.password);

      props.userHasAuthenticated(true);
      setAppState({
        ...appState,
        username: savedUser.email
      });

      history.push("/");
    } catch (e) {
      message.error(e.message);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <Form layout="vertical" onFinish={handleConfirmationSubmit}>
        <Form.Item
          label="Confirmation Code"
          name="confirmationCode"
          rules={[
            { required: true, message: "Please input your confirmation Code" }
          ]}
        >
          <Input
            type="tel"
            autoFocus
            extra="Please check your email for the code."
          />
        </Form.Item>
        <LoaderButton
          block
          htmlType="submit"
          type="primary"
          loading={isLoading}
        >
          Verify
        </LoaderButton>
      </Form>
    );
  }

  function renderForm() {
    return (
      <Row>
        <Col sm={12}>
          <UsageTerms />
        </Col>
        <Col sm={12}>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Title level={3}>Create your account</Title>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email address" }
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                autoFocus
                type="email"
                placeholder="Email address"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password" }
              ]}
            >
              <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[
                { required: true, message: "Please confirm your password" }
              ]}
            >
              <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Confirm password"
              />
            </Form.Item>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Checkbox checked={acceptedTerms} onChange={handleAcceptedTerms}>
                I accept the terms of usage.
              </Checkbox>

              <LoaderButton
                block
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Signup
              </LoaderButton>
            </Space>
          </Form>
        </Col>
      </Row>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}

Signup.propTypes = {
  userHasAuthenticated: PropTypes.func.isRequired
};
