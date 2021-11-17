import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"/kanban"}>看板</Link>
      <Link to={"/epic"}>任务组</Link>
      <Routes>
        {/* /*projects/:projectId/kanban, 如果kanban前面有斜杠，意思就是根路由后面就加上kanban了 */}
        <Route path={"kanban"} element={<KanbanScreen />}></Route>
        {/* /*projects/:projectId/epic */}
        <Route path={"epic"} element={<EpicScreen />}></Route>
        {/* 如果上面的路由都没有匹配到，就到Navigate的路由去 */}
        <Navigate to={window.location.pathname + "/kanban"} />
      </Routes>
    </div>
  );
};
