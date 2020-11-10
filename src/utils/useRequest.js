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

export default function useReq({ url, ...options }, useOpt = {}) {
  const initOptions = {
    initialData: useOpt.initialData || {},
    debounceInterval: 200,
    ...useOpt,
  };
  return useRequest(() => request(url, options), initOptions);
}
