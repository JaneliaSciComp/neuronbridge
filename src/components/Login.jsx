import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { faUser, faLockAlt } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Form, Divider, message } from "antd";
import { AppContext } from "../containers/AppContext";
import LoaderButton from "./LoaderButton";
import GoogleLogin from "./GoogleLogin";
import OktaLogin from "./OktaLogin";

import "./Login.css";

const isInternalSite =
  process.env.REACT_APP_LEVEL && process.env.REACT_APP_LEVEL.match(/pre$/);

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordUpdate, setPasswordUpdate] = useState(false);
  const { appState, setAppState } = useContext(AppContext);

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      const userObject = await Auth.signIn(values.email, values.password);

      if (userObject && userObject.challengeName === "NEW_PASSWORD_REQUIRED") {
        if (passwordUpdate && values.newPassword) {
          const { requiredAttributes } = userObject.challengeParam;
          await Auth.completeNewPassword(
            userObject, // the Cognito User Object
            values.newPassword, // the new password
            requiredAttributes
          ).then(() => {
            setAppState({
              ...appState,
              username: values.email
            });
          });
        }
        setPasswordUpdate(true);
        setIsLoading(false);
      } else {
        setAppState({
          ...appState,
          username: values.email
        });
      }
    } catch (e) {
      setIsLoading(false);
      if (e.code === "UserNotFoundException") {
        message.error("Login error: Incorrect username or password.");
      } else {
        message.error(`Login error: ${e.message}`);
      }
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
        {!isInternalSite || process.env.REACT_APP_NO_OKTA ? (
          <>
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
                prefix={
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
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
                prefix={
                  <FontAwesomeIcon
                    icon={faLockAlt}
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {passwordUpdate ? (
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                  { required: true, message: "Please input your new password" }
                ]}
              >
                <Input
                  prefix={
                    <FontAwesomeIcon
                      icon={faLockAlt}
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  type="password"
                  placeholder="New Password"
                />
              </Form.Item>
            ) : (
              ""
            )}
            <LoaderButton
              block
              type="primary"
              htmlType="submit"
              aria-label="Login"
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
          </>
        ) : (
          <OktaLogin userHasAuthenticated={userHasAuthenticated} />
        )}
      </Form>
    </div>
  );
}
