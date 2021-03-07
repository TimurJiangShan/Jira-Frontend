import React from "react";
import { User } from "./SearchPanel";
import { Dropdown, Menu, Table } from "antd";
import { TableProps } from "antd/es/table";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// 带dom的负责处理和浏览器或者宿主环境相关的操作。

// TODO: 把所有的Id都改成number类型
export interface Project {
  id: number;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  projects: Project[];
  isLoading: boolean;
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
            // 这里会渲染比如说a标签，以及相应的点击事件等，这些东西依赖于宿主环境（浏览器）强关联
            return <Link to={String(project.id)}>{project.name}</Link>;
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
