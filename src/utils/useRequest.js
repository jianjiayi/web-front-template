import { useRequest } from 'ahooks';
import request from './request';
/**
 *
 *
 * const {
    data,
    error,
    loading,
    run,
    params,
    cancel,
    refresh,
    mutate,
    fetches,
  } = useRequest(service, {
    manual,
    initialData,
    refreshDeps,
    onSuccess,
    onError,
    formatResult,
    cacheKey,
    loadingDelay,
    defaultParams,
    pollingInterval,
    pollingWhenHidden,
    fetchKey,
    refreshOnWindowFocus,
    focusTimespan,
    debounceInterval,
    throttleInterval,
    ready,
    throwOnError,
  });
 *
 */

export default function useReq(service, opt = {}) {
  // console.log(1)
  const initOptions = {
    initialData: opt.initialData || {},
    debounceInterval: 200,
    requestMethod: (param) => request(param),
    ...opt,
  };
  return useRequest(service, initOptions);
}
