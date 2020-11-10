import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useChart from './useChart';

const Chart = (props) => {
  const { width, height, option } = props;

  const chartRef = useRef(null);
  const config = option;
  useChart(chartRef, config);

  return <div style={{ width: width || '100%', height: height || '100%' }} ref={chartRef} />;
};

Chart.defaultProps = {
  width: '',
  height: '',
  option: {},
};
Chart.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  option: PropTypes.object,
};

export default Chart;
