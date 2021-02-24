import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import styled from "@emotion/styled";
import { Project } from "./List";
import React from "react";
import { useMount, useDebounce, cleanObject } from "../../utils/index";
import { useHttp } from "utils/http";

export const ProjectListScreen = () => {
  const [list, setList] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [param, setParam] = React.useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 200);
  const client = useHttp();

  React.useEffect(() => {
    client("projects", {
      data: cleanObject(debouncedParam),
    }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} projects={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
