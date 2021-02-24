import { useAsync } from "utils/useAsync";
import React from "react";
import { cleanObject } from "utils/index";
import { Project } from "../screens/projectList/List";
import { useHttp } from "./http";

export const useProjects = (params: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  React.useEffect(() => {
    run(
      client("projects", {
        data: cleanObject(params),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};
