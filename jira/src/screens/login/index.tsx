import React from "react";

const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);
export const LoginScreen = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };

  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      if (response.ok) {
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>Login</button>
    </form>
  );
};
