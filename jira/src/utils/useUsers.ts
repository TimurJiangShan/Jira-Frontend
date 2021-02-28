import { User } from "./../screens/projectList/SearchPanel";
import { useAsync } from "utils/useAsync";
import React from "react";
import { cleanObject } from "utils/index";
import { useHttp } from "./http";

export const useUsers = (params: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();
  React.useEffect(() => {
    run(
      client("users", {
        data: cleanObject(params),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};
