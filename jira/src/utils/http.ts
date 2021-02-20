import { useAuth } from "context/auth-context";
import qs from "qs";
import * as auth from "../auth-provider";
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  /*
    1. 在 GET 请求里，所传的参数，在fetch的API里面是要带到URL里面的
    2. 在 POST PATCH DELETE，是直接放在 Body 里面
  */

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios 和 fetch的行为不一样。在 axios里面，返回状态码不为2xx的时候，会在后面的catch里面抛出异常

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "Please relogin" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

// 如果要使用其他hook的话，那么那个函数本身就得是一个hook
export const useHttp = () => {
  const { user } = useAuth();

  // Utility type的用法： 用泛型给它传入一个其他类型， 然后utility type对这个类型进行某种操作
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// JS 中的typeof是在 Runtime的时候运行
// TS 中的typeof类型定义是在 静态的时候运行的

// 类型别名 type, interface 在这种情况下没法代替 type
type FavoriteNumber = string | number;
let roseFavoriteNumber: FavoriteNumber = "12d";

type Person = {
  name: string;
  age: number;
};

// 当我们想部分实现Person这个类型，而且在不改动原本Person代码的情况下，用Partial
// const xiaoming: Person = { name: "小名" }; // 我现在只知道 name，不知道age

const xiaoming: Partial<Person> = {};

// 现在有一个神秘人， 只有age， 没有name。 要用到 Omit， 意思是把第一个参数中的某些类型删掉

const shenmiren: Omit<Person, "name"> = {
  age: 123,
};

const shenmirenMax: Omit<Person, "name" | "age"> = {}; // 可以在第二个参数里面使用联合类型
