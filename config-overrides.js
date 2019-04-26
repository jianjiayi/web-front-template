const {
  override, fixBabelImports, addDecoratorsLegacy, addLessLoader,
  addWebpackAlias,
} = require('customize-cra');
const path = require('path');

module.exports = override(
  addDecoratorsLegacy(),
  /**
     * 按需加载组件代码和样式的 babel 插件
     */
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style: 'css',
    style: true,
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  /**
     * addLessLoader 来帮助加载 less 样式
     * 利用less-loader 的 modifyVars 来进行主题配置
     * Ant Design 的样式变量
     * https://ant.design/docs/react/customize-theme-cn
     * 另外一种方式是建立一个单独的 less 变量文件，
     * @import "~antd/dist/antd.less";   // 引入官方提供的 less 样式入口文件
     * @import "your-theme-file.less";   // 用于覆盖上面定义的变量
     */
  addLessLoader({
    // strictMath: true,
    // noIeCompat: true,
    // localIdentName: '[local]--[hash:base64:5]',
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1890ff' },
  }),
);
