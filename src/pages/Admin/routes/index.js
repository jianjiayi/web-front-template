import React, { useState, useEffect, useRef } from 'react';
// import {
//   Button,
// } from 'antd';
// import { connect } from 'react-redux';

import ListButton from '../components/ListButton';

const HooksComponent = () => {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(60);
  // 使用 useRef Hooks，useRef 可以返回一个可变的引用，它会生成一个对象，对象里这个有 current 属性，而 current 的值是可变的。
  const interval = useRef(); // interval 可以在这个作用域里任何地方清除和设置

  function increment() {
    setCount(count + 1);
  }

  const effectTime = () => { // effect 函数，不接受也不返回任何参数
    if (start) {
      interval.current = setInterval(() => {
        setTime((t) => t - 1); // ✅ 在 setTime 的回调函数参数里可以拿到对应 state 的最新值
      }, 1000);
    }
    return () => clearInterval(interval.current);
  };

  useEffect(effectTime, [start]);
  const changeTime = () => setStart(!start);

  return (
    <div>
      <h1>The last clicked button is {count}</h1>
      <ul>
        <ListButton
          title="Create"
          setClicked={increment}
        />
        <ListButton
          title={time}
          setClicked={changeTime}
        />
      </ul>
    </div>
  );
};

export default HooksComponent;
