import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import styled from "@emotion/styled";
import { Project } from "./List";
import React from "react";
import { useMount, useDebounce, cleanObject } from "../../utils/index";
import { useHttp } from "utils/http";
import { useAsync } from "utils/useAsync";
import { useProjects } from "utils/useProjects";
import { Typography } from "antd";

export const ProjectListScreen = () => {
  // const [list, setList] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [param, setParam] = React.useState({
    name: "",
    personId: "",
  });

  // const { run, isLoading, data: list, error } = useAsync<Project[]>();
  const debouncedParam = useDebounce(param, 200);
  const { isLoading, data: list, error } = useProjects(debouncedParam);
  const client = useHttp();

  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? <Typography.Text>{error.message}</Typography.Text> : null}
      <List isLoading={isLoading} users={users} projects={list || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
