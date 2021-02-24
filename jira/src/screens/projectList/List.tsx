import React from "react";
import { User } from "./SearchPanel";
import { Dropdown, Menu, Table } from "antd";
import { TableProps } from "antd/es/table";
import dayjs from "dayjs";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  projects: Project[];
}

export const List = ({ users, projects, ...props }: ListProps) => {
  return (
    <Table
      rowKey={"id"}
      dataSource={projects}
      pagination={false}
      columns={[
        {
          title: "Name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <div>{project.name}</div>;
          },
        },
        {
          title: "Organization",
          dataIndex: "organization",
        },
        {
          title: "Principal",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "Unknown"}
              </span>
            );
          },
        },
        {
          title: "Create Time",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "Unknown"}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
