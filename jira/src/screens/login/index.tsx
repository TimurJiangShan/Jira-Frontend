import React from "react";
import { useAuth } from "../../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);

export const LoginScreen = () => {
  const { login, user, register } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>{user ? `Login success! ${user.name}` : null}</div>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>register</button>
    </form>
  );
};
