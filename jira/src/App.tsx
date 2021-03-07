import { AuthenticatedApp } from "AuthenticatedApp";
import React from "react";
import "./App.css";
import { UnauthenticatedAPP } from "unauthenticatedApp";
import { useAuth } from "./context/auth-context";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedAPP />}
    </div>
  );
}

export default App;
