import React, { useEffect, useState } from "react";

const testClosure = () => {
  let num = 0;

  const effect = () => {
    const message = `num value in message: ${num++}`;

    return function unmount() {
      console.log(message);
    };
  };
  return effect;
};

// 执行test，返回effect函数
const add = testClosure(); // 0
// 执行effect函数，返回引用了message1的unmount函数
const unmount = add(); // 1

// message3
add();
// message4
add();
// message5
add();

unmount();

export const Test = () => {
  const [num, setNum] = useState(0);

  const add = () => setNum(num + 1);

  useEffect(() => {
    const id = setInterval(() => {
      console.log("num in setInterval:", num);
    }, 5000);
    return () => clearInterval(id);
  }, [num]);

  useEffect(() => {
    // 卸载return函数里面，才是卸载时候的值
    return () => {
      console.log("卸载值：", num);
    };
  }, [num]);

  return (
    <div>
      <button onClick={add}>add</button>
      <p>number: {num}</p>
    </div>
  );
};
