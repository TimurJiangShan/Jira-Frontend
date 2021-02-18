import React from "react";
import { LoginScreen } from "./Login";
import { RegisterScreen } from "./Register";

export const UnauthenticatedAPP = () => {
  const [isRegistered, setIsRegistered] = React.useState(false);

  return (
    <div>
      {isRegistered ? <LoginScreen /> : <RegisterScreen />}{" "}
      <button onClick={() => setIsRegistered(!isRegistered)}>
        Change to {isRegistered ? "Register" : "Login"}
      </button>
    </div>
  );
};
