import React from "react";
import { useAuth } from "./context/auth-context";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <div>Welcome</div>
    </div>
  );
};
