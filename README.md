后台管理系统 starter kit，基于 creacte-react-app 2.x webpack 4。

## 可用的脚本

在项目目录下运行:

### `npm start`

本地开发<br>
浏览器地址 [http://localhost:3000](http://localhost:3000)。

### yarn start:mock
本地 mock 测试数据，用于后端服务未提供时使用。<br>
建议和后端协调好 api接口及返回数据后使用。<br>
本地 mock 数据参考文件 ./mock/chart.js<br>
并引入到./mock/index.js 中。<br>
具体参考[json-server](https://github.com/typicode/json-server)

```bash
// proxy 代理 注意把单独需要的 path 代理到http://localhost:4000
// 例如 /mock
app.use(
  proxy('/api/mock/**', {
    target: 'http://localhost:4000',
    changeOrigin: true,
  }),
);
```
### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

生产环境打包<br>
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `run analyze 分析JavaScript包`

依赖 source-map-explorer

### less 使用

scope（私有）引入，命名需加入 .module<br>
```bash
import styles from './index.module.less';
className={styles.logo}
```
公共引入 此模式可能会与其他 css 冲突，慎用！！！
```bash
import from './index.less';
className="logo"
```

## JavaScript 风格指南

eslint校验规则 .eslintrc.js<br>
请在自己的 IDE 上配置eslint插件，并配置tab 为两个空格，并按规范书写代码。<br>
生产环境 build 不允许出现警告。<br>
采用 Airbnb JavaScript 风格指南<br>
详细规则 [Airbnb JavaScript 风格指南](https://github.com/lin-123/javascript)

## 建议使用 yarn

[yarn](https://yarnpkg.com/zh-Hans/docs/install#mac-stable)

## 版本锁定

```
"react": "^16.8.6",
"react-dom": "^16.8.6",
"react-redux": "^6.0.1",
"@rematch/core": "^1.1.0",
"react-router-dom": "^5.0.0",
"antd": "^3.15.2",
"less": "^3.9.0",
```

## proxy 代理

proxy代理配置见 config-overrides.js。
禁止在 js 中写死 url 地址。

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
