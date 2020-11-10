import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
} from 'antd';
// import { connect } from 'react-redux';
import useRequest from '@/utils/useRequest';
import { getRealtime } from '../services/api';
import ThemeProvider from '../provider';

import ListButton from '../components/ListButton';
import useLocation from '../components/useLocation';

const HooksComponent = () => {
  const [params, setParams] = useState({
    coarse: 1,
  });
  const {
    // data,
    // run,
    loadMore,
  } = useRequest(getRealtime(params), {
    manual: true,
    refreshDeps: JSON.stringify(params),
    loadMore: true,
    // initialData: [],
  });

  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(60);
  const [lat, errorMessage] = useLocation();
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

  const renderContent = () => {
    if (errorMessage && !lat) {
      return <div>Error: {errorMessage}</div>;
    }
    if (!errorMessage && lat) {
      return <h2>{lat}</h2>;
    }
    return (
      <Button type="primary" size="small" loading>
        Loading
      </Button>
    );
  };

  const handleRequest = () => {
    setParams({
      ...params,
      thin: 1,
      sss: 1,
    });
    loadMore();
    // run();
  };

  return (
    <ThemeProvider>
      <h1>The last clicked button is {count}</h1>
      <ul>
        <ListButton
          title="useRequest"
          setClicked={handleRequest}
        />
        <ListButton
          title="Create"
          setClicked={increment}
        />
        <ListButton
          title={time}
          setClicked={changeTime}
        />
      </ul>
      {renderContent()}
    </ThemeProvider>
  );
};

export default HooksComponent;
