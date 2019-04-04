后台管理系统 starter kit，基于 creacte-react-app 2.x webpack 4。

## 可用的脚本

In the project directory, you can run:

### `npm start`

本地开发<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

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

命名需加入 .module<br>
import styles from './index.module.less';<br>
className={styles.logo}

## JavaScript 风格指南

eslint校验规则 .eslintrc.js
请在自己的 IDE 上配置eslint插件，并按规范书写代码。生产环境 build 不允许出现警告。
采用 Airbnb JavaScript 风格指南
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
