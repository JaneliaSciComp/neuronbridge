import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Form, Input } from "antd";
import { Auth } from "aws-amplify";
import LoaderButton from "./LoaderButton";
import "./Signup.css";

export default function Signup(props) {
  const [newUser, setNewUser] = useState(null);
  const [savedUser, setSavedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(values) {
    setIsLoading(true);

    try {
      const createdUser = await Auth.signUp({
        username: values.email,
        password: values.password
      });
      setIsLoading(false);
      setNewUser(createdUser);
      setSavedUser(values);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(values) {
    setIsLoading(true);

    try {
      await Auth.confirmSignUp(savedUser.email, values.confirmationCode);
      await Auth.signIn(savedUser.email, savedUser.password);

      props.userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      alert(e.message);
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
          isLoading={isLoading}
        >
          Verify
        </LoaderButton>
      </Form>
    );
  }

  function renderForm() {
    return (
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email address" }
          ]}
        >
          <Input autoFocus type="email" placeholder="Email address" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[{ required: true, message: "Please confirm your password" }]}
        >
          <Input type="password" placeholder="Confirm password" />
        </Form.Item>
        <LoaderButton
          block
          type="primary"
          htmlType="submit"
          isLoading={isLoading}
        >
          Signup
        </LoaderButton>
      </Form>
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
