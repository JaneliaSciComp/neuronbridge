// multiple stage password reset form.

import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Form, Input, Button, message } from "antd";
import { Redirect } from "react-router-dom";
import { faUser } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoaderButton from "./LoaderButton";
import "./ResetPassword.css";

export default function ResetPassword() {
  const [state, setState] = useState({
    email: null,
    sendingCode: false,
    confirming: false,
    confirmed: false
  });

  // stage 2 trigger confirmation code email
  async function handleEmailForm(values) {
    setState({ ...state, sendingCode: true });
    try {
      await Auth.forgotPassword(values.email);
      setState({ ...state, email: values.email, sendingCode: false });
    } catch (e) {
      message.error(e.message);
      setState({ ...state, sendingCode: false });
    }
  }
  // stage 1 enter email address
  if (!state.email) {
    return (
      <Form
        className="passwordReset"
        layout="vertical"
        onFinish={handleEmailForm}
      >
        <p>
          <b>Forgot your password?</b> Enter your email address and we will send
          you a reset confirmation code.
        </p>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email address" }
          ]}
        >
          <Input
            autoFocus
            prefix={<FontAwesomeIcon icon={faUser} style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email address"
          />
        </Form.Item>
        <LoaderButton
          loading={state.sendingCode}
          block
          type="primary"
          htmlType="submit"
        >
          Send Reset Code
        </LoaderButton>
      </Form>
    );
  }

  async function handleConfirmForm(values) {
    setState({ ...state, confirming: true });
    try {
      await Auth.forgotPasswordSubmit(
        state.email,
        values.code,
        values.password
      );
      setState({ ...state, confirmed: true, confirming: false });
      message.success("Your password has been updated.");
    } catch (e) {
      message.error(e.message);
      setState({ ...state, confirming: false });
    }
  }

  // stage 3 render form to enter confirmation code and new password
  const confirmationHelp = `Please check your email, ${state.email}, for a confirmation code.`;
  if (!state.confirmed) {
    return (
      <div className="passwordReset">
        <p>{confirmationHelp} Didn&apos;t get a code?
          <Button
            type="link"
            onClick={() => handleEmailForm({ email: state.email })}
          >
            Resend it
          </Button>
        </p>

        <Form layout="vertical" onFinish={handleConfirmForm}>
          <Form.Item
            label="Confirmation Code"
            name="code"
            rules={[
              { required: true, message: "Please input your confirmation code" }
            ]}
          >
            <Input autoFocus placeholder="Confirmation code" />
          </Form.Item>
          <Form.Item
            name="password"
            label="New Password"
            rules={[
              { required: true, message: "Please input your new password" }
            ]}
          >
            <Input type="password" placeholder="New Password" />
          </Form.Item>

          <LoaderButton
            loading={state.confirming}
            block
            type="primary"
            htmlType="submit"
          >
            Reset Password
          </LoaderButton>
        </Form>
      </div>
    );
  }

  // stage 4 show reset success message and provide link to login
  return <Redirect to="/login" />;
}
