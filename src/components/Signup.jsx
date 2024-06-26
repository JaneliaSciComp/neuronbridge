import React, { useState, useContext } from "react";
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
import { faUser, faLockAlt } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Auth } from "aws-amplify";
import LoaderButton from "./LoaderButton";
import { AppContext } from "../containers/AppContext";
import UsageTerms from "./UsageTerms";

import "./Signup.css";

const { Title } = Typography;

export default function Signup() {
  const [newUser, setNewUser] = useState(null);
  const [savedUser, setSavedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { appState, setAppState } = useContext(AppContext);
  const history = useHistory();

  const handleSubmit = async (values) => {
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

  const handleAcceptedTerms = (event) => {
    setAcceptedTerms(event.target.checked);
  }

  const handleConfirmationSubmit = async (values) => {
    setIsLoading(true);

    try {
      await Auth.confirmSignUp(savedUser.email, values.confirmationCode);
      await Auth.signIn(savedUser.email, savedUser.password);

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
      <Row gutter={24}>
        <Col xs={24} sm={10}>
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
                prefix={<FontAwesomeIcon icon={faUser} style={{ color: "rgba(0,0,0,.25)" }} />}
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
                prefix={<FontAwesomeIcon icon={faLockAlt} style={{ color: "rgba(0,0,0,.25)" }} />}
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
                prefix={<FontAwesomeIcon icon={faLockAlt} style={{ color: "rgba(0,0,0,.25)" }} />}
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
        <Col offset={2} sm={12}>
          <UsageTerms />
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
