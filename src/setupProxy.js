/* eslint-disable func-names */
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api/users/**', {
      target: 'http://testsxappcms.peopletech.cn',
      // target: 'http://localhost:4000',
      changeOrigin: true,
    }),
  );
  app.use(
    proxy('/api/mock/**', {
      // target: 'http://testsxappcms.peopletech.cn',
      target: 'http://localhost:4000',
      changeOrigin: true,
    }),
  );
  app.use(
    proxy('/auth/**', {
      target: 'http://testsxappcms.peopletech.cn',
      changeOrigin: true,
    }),
  );
  app.use(
    proxy('/captcha/**', {
      target: 'http://testsxappcms.peopletech.cn',
      changeOrigin: true,
    }),
  );
};
