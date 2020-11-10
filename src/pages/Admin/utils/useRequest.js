import { useRequest } from 'ahooks';
/**
 *
 *
 * const {
    data, // service 返回的数据，默认为 undefined。 如果有 formatResult, 则该数据为被格式化后的数据。
    error, // service 抛出的异常，默认为 undefined
    loading, // service 是否正在执行
    run, // 手动触发 service 执行，参数会传递给 service debounce 模式与 throttle 模式返回值为 Promise<null>
    params, // 当次执行的 service 的参数数组。比如你触发了 run(1, 2, 3)，则 params 等于 [1, 2, 3]
    cancel, // 取消当前请求 如果有轮询，停止
    refresh, // 使用上一次的 params，重新执行 service
    mutate, // 直接修改 data (newData) => void / ((oldData)=>newData) => void
    fetches, // 默认情况下，新请求会覆盖旧请求。如果设置了 fetchKey，则可以实现多个请求并行，fetches 存储了多个请求的状态。 外层的状态为最新触发的 fetches 数据。
  } = useRequest(service, {
    manual, // 默认 false。 即在初始化时自动执行 service。 如果设置为 true，则需要手动调用 run 触发执行。
    initialData, // 默认的 data
    refreshDeps, // 在 manual = false 时，refreshDeps 变化，会触发 service 重新执行
    onSuccess, // service resolve 时触发，参数为 data 和 params 如果有 formatResult ，则 data 为格式化后数据。
    onError, // service 报错时触发，参数为 error 和 params。
    formatResult, // 格式化请求结果
    fetchKey, // 根据 params，获取当前请求的 key，设置之后，我们会在 fetches 中同时维护不同 key 值的请求状态。
    cacheKey, // 请求唯一标识。如果设置了 cacheKey，我们会启用缓存机制 我们会缓存每次请求的 data , error , params , loading 在缓存机制下，同样的请求我们会先返回缓存中的数据，同时会在背后发送新的请求，待新数据返回后，重新触发数据更新
    defaultParams, // 如果 manual=false ，自动执行 run 的时候，默认带上的参数
    loadingDelay, // 设置显示 loading 的延迟时间，避免闪烁
    pollingInterval, // 轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 run
    pollingWhenHidden, // 在页面隐藏时，是否继续轮询。默认为 true，即不会停止轮询 如果设置为 false , 在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询
    refreshOnWindowFocus, // 在屏幕重新获取焦点或重新显示时，是否重新发起请求。默认为 false，即不会重新发起请求。 如果设置为 true，在屏幕重新聚焦或重新显示时，会重新发起请求。
    focusTimespan, // 屏幕重新聚焦，如果每次都重新发起请求，不是很好，我们需要有一个时间间隔，在当前时间间隔内，不会重新发起请求 需要配和 refreshOnWindowFocus 使用。
    debounceInterval, // 防抖间隔, 单位为毫秒，设置后，请求进入防抖模式。
    throttleInterval, // 节流间隔, 单位为毫秒，设置后，请求进入节流模式。
    ready, // 只有当 ready 为 true 时，才会发起请求
    throwOnError, // 如果 service 报错，我们会帮你捕获并打印日志，如果你需要自己处理异常，可以设置 throwOnError 为 true
    cacheTime, // 设置缓存数据回收时间。默认缓存数据 5 分钟后回收 如果设置为 -1, 则表示缓存数据永不过期 需要配和 cacheKey 使用
    staleTime, // 缓存数据保持新鲜时间。在该时间间隔内，认为数据是新鲜的，不会重新发请求 如果设置为 -1，则表示数据永远新鲜 需要配和 cacheKey 使用
  });
 *
 */

/**
 * service
 * @param {*} service
 * 如果使用 ./request 封装的axios方法要用fun返回 promise
 * useRequest(() => request())
 * 或者
 * function getRoleDetail(roleId) {
 *    return async () => request(`${apiCommonPath}/roles/${roleId}`);
 * }
 * useRequest(getRoleDetail)
 * @param {*} opt
 */
// eslint-disable-next-line func-names
export default function (service, opt = {}) {
  const initOptions = {
    initialData: opt.initialData || {}, // 默认 {}，防止报错，但返回值为数组时要注意[]
    debounceInterval: 200,
    ...opt,
  };
  return useRequest(service, initOptions);
}
