import { jsx } from "@emotion/react";
import { Form, Input, Select } from "antd";
import React from "react";
import { Project } from "./List";
const apiUrl = process.env.REACT_APP_API_URL;

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  /*
    1. 当用户在input框输入值或者选择select框的时候， param变化
    2. 当param变化的时候，去请求工程列表
    3. 如果 ok是true，说明请求成功了
  */

  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    fetch(`${apiUrl}/posts`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);

  return (
    // css 属性要先引入jsx
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"Project name"}
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>Principal</Select.Option>
          {users.map((user: User) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
