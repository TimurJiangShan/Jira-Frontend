import React from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "unauthenticatedApp";

const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);

export const LoginScreen = () => {
  const { login, user } = useAuth();

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;
  //   login({ username, password });
  // };
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <div>{user ? `Login success! ${user.name}` : null}</div>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input user name" }]}
      >
        <Input placeholder={"username"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input user password" }]}
      >
        <Input placeholder="password" type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type="primary">
          Login
        </LongButton>
      </Form.Item>
    </Form>
  );
};
