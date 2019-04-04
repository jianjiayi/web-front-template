/* eslint-disable func-names */
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api/**', {
      target: 'http://testsxappcms.peopletech.cn',
      changeOrigin: true,
    }),
  );
  app.use(
    proxy('/auth/**', {
      target: 'http://testsxappcms.peopletech.cn',
      changeOrigin: true,
    }),
  );
};
