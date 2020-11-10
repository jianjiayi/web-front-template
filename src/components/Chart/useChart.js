/* eslint-disable */
import React, { useEffect } from 'react';
import echarts from 'echarts';

const useChart = (chartRef, config) => {
  let chartInstance = null;

  const renderChart = () => {
    const renderedInstance = echarts.getInstanceByDom(chartRef.current);
    if (renderedInstance) {
      chartInstance = renderedInstance;
    } else {
      chartInstance = echarts.init(chartRef.current);
    }
    chartInstance.setOption(config);
  };

  useEffect(() => {
    // console.log(111);
    renderChart();
  }, [JSON.stringify(config)]);

  useEffect(() => {
    return () => {
      chartInstance && chartInstance.dispose();
    };
  }, []);

  return;
};

export default useChart;
