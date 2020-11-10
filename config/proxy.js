/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
const domain = 'http://10.50.161.45:8590';
export default {
  dev: {
    '/api/v1': {
      target: domain,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/api/': {
      target: domain,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  test: {
    '/api/': {
      target: domain,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: domain,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
