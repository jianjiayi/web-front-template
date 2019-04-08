import { init } from '@rematch/core';
import immerPlugin from '@rematch/immer';
import updatedPlugin from '@rematch/updated';
import createLoadingPlugin from '@rematch/loading';
/**
 * 导入所有models
 */
import * as models from './models';

/**
 * 使用Immer插件，reducer可以使用mutable方法来实现不可变状态
 * 优化性能
 * Immer 只支持对普通对象和数组的变化检测，
 * 所以像字符串或数字这样的原始值总是会返回一个变化
 */
const immer = immerPlugin();

/**
 * 在一定的时间段内防止昂贵（频繁）的获取请求。
 * throttle effects
 */
const updated = updatedPlugin();

/**
 * 添加自动 loading 指示器 effects 到 Rematch
 * eq:
 * const mapState = ({ loading }) => ({
    loading: loading.effects.user.login, // true when the `login/submit` effect is running
    // or
    loading: loading.models.user, // true when ANY effect on the `login` model is running
  })
 */
const loading = createLoadingPlugin({});

const store = init({
  models,
  plugins: [immer, updated, loading],
});

export default store;
/**
 * 导出 dispatch 供其他任意地方直接调用
 * Dispatch 标准化了你的action，而无需编写action types 或者  action creators。
 * import { dispatch } from '@rematch/core' 这种方式也可以，但不推荐
 * Dispatch 能被直接调用，或者用 dispatch[model][action](payload)简写。
 * eq:
 * // reducers
 * dispatch({ type: 'count/increment', payload: 1 }) // state = { count: 1 }
 * dispatch.count.increment(1)                       // state = { count: 2 }
 * // effects
 * dispatch({ type: 'count/incrementAsync', payload: 1 }) // state = { count: 3 } after delay
 * dispatch.count.incrementAsync(1)                       // state = { count: 4 } after dela
 */
export const { dispatch } = store;
