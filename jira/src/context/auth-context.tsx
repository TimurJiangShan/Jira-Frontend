import * as auth from "auth-provider";
import { User } from "screens/projectList/SearchPanel";
import React, { ReactNode } from "react";
import { http } from "../utils/http";
import { useMount } from "../utils/index";
import { useAsync } from "../utils/useAsync";
import { FullPageLoading, FullPageError } from "../components/lib";

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

interface AuthForm {
  username: string;
  password: string;
}

/*
  1. 找token
  2. 拿着token去获取user信息
  3. 最后把这个user的信息 set到 当前组件的user state里面
*/
const bootstrapUser = async () => {
  let user = null;

  // 1. 尝试读取在localStorage里面存的 token
  const token = auth.getToken();
  if (token) {
    // 2. 如果能读到值，就带着这个 token 去请求 "me" 这个API。 这个 "me" API的返回值就包括返回信息
    const data = await http("me", { token });
    user = data.user;
  }

  return user;
};

// 用useContext存储全局用户信息

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = React.useState<User | null>(null);
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  // point free
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  // 当AuthProvider加载的时候，也就是整个APP加载的时候, 调用useMount。
  // 当页面加载的时候，调用bootstrapUser，

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }

  return context;
};
