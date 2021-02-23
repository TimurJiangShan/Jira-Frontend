import { Form, Input } from "antd";
import React from "react";
const apiUrl = process.env.REACT_APP_API_URL;

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export const SearchPanel = () => {
  /*
    1. 当用户在input框输入值或者选择select框的时候， param变化
    2. 当param变化的时候，去请求工程列表
    3. 如果 ok是true，说明请求成功了
  */

  const [param, setParam] = React.useState({
    name: "",
    personId: "",
  });

  const [users, setUsers] = React.useState([]);
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    fetch(`${apiUrl}/posts`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);

  return (
    <Form layout={"inline"}>
      <Form.Item>
        {/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
        <Input
          placeholder={"项目名"}
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
    </Form>
  );
};
