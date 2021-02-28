import React from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "unauthenticatedApp";

const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);

export const RegisterScreen = (props: { onError: (error: Error) => void }) => {
  const { register } = useAuth();
  const { onError } = props;

  // cpassword 不参与服务端的交互
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("Password does not match"));
      // 记得这里要return回去
      return;
    }
    try {
      await register(values);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input username" }]}
      >
        <Input placeholder={"username"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input user password" }]}
      >
        <Input placeholder="password" type="password" id={"password"} />
      </Form.Item>
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "Please confirm your password" }]}
      >
        <Input placeholder="password" type="password" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type="primary">
          Register
        </LongButton>
      </Form.Item>
    </Form>
  );
};
