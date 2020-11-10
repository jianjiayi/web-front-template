// import { fetch } from '../utils';
import { apiCommonPath } from '@/constants';
// import request from '@/utils/request';

export function getRealtime(data) {
  return {
    url: `${apiCommonPath}/realtime`,
    method: 'post',
    data,
  };
}

export default {};
