import React, { useState } from "react";
import PropTypes from "prop-types";
import { Auth } from "aws-amplify";
import { Form, Input, Icon } from "antd";
import LoaderButton from "./LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Login.css";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email address" }
          ]}
        >
          <Input
            name="email"
            autoFocus
            value={fields.email}
            onChange={handleFieldChange}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email address"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="password"
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
            placeholder="Password"
          />
        </Form.Item>
        <LoaderButton
          block
          type="primary"
          htmlType="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
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
