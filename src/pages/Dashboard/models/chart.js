/* eslint-disable no-param-reassign */
import { fakeChartData } from '../../../services/api';

export default {
  state: {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [{
      x: 1554258821325, y1: 67, y2: 28,
    },
    {
      x: 1554260621325, y1: 17, y2: 33,
    },
    {
      x: 1554262421325, y1: 84, y2: 99,
    },
    ],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
    loading: false,
  },
  reducers: {
    save(state, payload) {
      state = {
        ...state,
        ...payload,
      };
      return state;
    },
  },
  effects: dispatch => ({
    async fetch(payload) {
      const res = await fakeChartData();
      dispatch.chart.save(payload);
    },
  }),
};
