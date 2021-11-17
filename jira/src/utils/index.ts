import React, { useEffect, useRef, useState } from "react";

interface KeyValueObject {
  [key: string]: unknown;
}

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

/*
  自定义hook要加use。 只要是hook，就不能再普通函数中运行
  它只能在：  
  1. 其他hook中运行
  2. 组件中运行
 */
export const useMount = (callback: () => void) => {
  React.useEffect(() => {
    callback();
  }, []);
};

// 在一个函数里，改变传入的对象本身是不好的
// object: { [key: string]: unknown } 这样写可以清晰地表示：我想要的对象就是一个键值对，因为 object的范围很广，一个普通的函数也是对象
export const cleanObject = (object: KeyValueObject) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// 后面用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

// keepOnUnmount: 当页面卸载的时候保持...
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
  // 返回的 ref 对象在组件的整个生命周期内保持不变。
  const oldTitle = useRef(document.title).current;
  // (不用ref时)页面加载时：oldTitle = 旧title；
  // (不用ref时)加载后（第一个useEffect执行）：oldTitle = 新title

  useEffect(() => {
    document.title = title;
  }, [title]);

  // useEffect的return的回调函数: 当页面被卸载的时候被调用
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 在页面卸载时，如果不指定依赖，读到的就是旧title
        document.title = oldTitle;
      }
    };
    // 这里如果不用useRef，那么oldTitle在页面卸载时就永远是最新的title，无法保存最原始的title
  }, [title, keepOnUnmount]);
};

// 重置路由状态并刷新页面

export const resetRoute = () => (window.location.href = window.location.origin);
