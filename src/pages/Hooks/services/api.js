import { fetch } from '../utils';

export async function getAllLocalGov() {
  return fetch('/api/cms/ask/getAllLocalGov', {
    method: 'GET',
  });
}

export default {};
