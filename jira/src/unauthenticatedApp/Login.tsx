import React from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "unauthenticatedApp";
import { useAsync } from "utils/useAsync";

const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);

export const LoginScreen = (props: { onError: (error: Error) => void }) => {
  const { login, user } = useAuth();
  const { run, isLoading, error } = useAsync();
  // const { run, isLoading, error } = useAsync(undefined, { throwOnError: true }); 主动让它抛出错误
  const { onError } = props;
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;
  //   login({ username, password });
  // };
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (error) {
      onError(error);
    }
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
        <LongButton loading={isLoading} htmlType={"submit"} type="primary">
          Login
        </LongButton>
      </Form.Item>
    </Form>
  );
};
