import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      error: null,
      stat: "success",
    });

  const setError = (error: Error) =>
    setState({
      error,
      data: null,
      stat: "error",
    });

  // run 用来触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("Please pass in Promise type");
    }

    setState({
      ...state,
      stat: "loading",
    });

    /**
     *  const promise = new Promise((resolve, reject) => {
          resolve('第 1 次 resolve')
          console.log('resolve后的普通逻辑')
          reject('error')
          resolve('第 2 次 resolve')
        })
        
        promise
        .then((res) => {
          console.log('then: ', res)
        })
        .catch((err) => {
          console.log('catch: ', err)
        })
     * 
     * 
     * 1. Promise 中的处理函数是异步任务, 但是promise中的回调函数是同步任务
     * 2. then 方法中传入的任务是一个异步任务。
     * resolve() 这个调用，作用是将 Promise 的状态从 pending 置为 fulfilled，
     * 这个新状态会让 Promise 知道“我的 then 方法中那个任务可以执行了”——注意是”可以执行了“，
     * 而不是说”立刻就会执行“。毕竟作为一个异步任务，它的基本修养就是要等同步代码执行完之后再执行。
     * 3. Promise对象的状态只能被改变一次
     * promise 初始状态为 pending，我们在函数体第一行就用 resolve 把它置为了 fulfilled 态。
     * 这个切换完成后，后续所有尝试进一步作状态切换的动作全部不生效，所以后续的 reject、resolve大家直接忽略掉就好；
     * 需要注意的是，我们忽略的是第一次 resolve 后的 reject、resolve，而不是忽略它身后的所有代码。
     * 因此 console.log(‘resolve后的普通逻辑’) 这句，仍然可以正常被执行。
     * 也就是说，后面的同步代码还是照样运行
     * 4. then 方法的入参只能是函数(Promise 值穿透问题)
     *    Promise.resolve(1)
          .then(Promise.resolve(2))
          .then(3)
          .then()
          .then(console.log)
     * 
     */

    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error: Error) => {
        // catch 会消化异常，如果不主动抛出，外面是接收不到异常的
        setError(error);
        if (config.throwOnError) {
          return Promise.reject(error);
        }

        return error;
      });
  };

  //   stat: "idle" | "loading" | "error" | "success";
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
