export { basename, rootPathName, initialPage } from '../../config/routes';
export const { host } = window.location;
export const path = host.substr(host.indexOf('.'));
export const domian = window.location.hostname.substr(host.indexOf('.'));

// export const basename = '/polymeric';
// export const rootPathName = '';
// export const initialPage = `${rootPathName}/dashboard/monitor`;
export const baseApiPath = '/audit';
export const version = '';
export const apiCommonPath = `${baseApiPath}${version}`;
export const uploadFilesPath = '/api/files';
export default {
  /**
   * history 默认是 browser
   * hashHistory 和 browserHistory 配置开关
   * 使用hashHistory,浏览器的url是这样的：/#/user/liuna?_k=adseis
   * 使用browserHistory,浏览器的url是这样的：/user/liuna
   * 建议使用browser
   * 使用 nginx
   * server {
        listen 80;
        # gzip config
        ...
        root /usr/share/nginx/html;

        location / {
            # 用于配合 browserHistory使用
            try_files $uri $uri/ /index.html;

            # 如果有资源，建议使用 https + http2，配合按需加载可以获得更好的体验
            # rewrite ^/(.*)$ https://preview.xxx.com/$1 permanent;

        }
        location /api {
            proxy_pass https://preview.xxx.com;
            proxy_set_header   X-Forwarded-Proto $scheme;
            proxy_set_header   Host              $http_host;
            proxy_set_header   X-Real-IP         $remote_addr;
        }
    }
    server {
      # 如果有资源，建议使用 https + http2，配合按需加载可以获得更好的体验
      listen 443 ssl http2 default_server;

      # 证书的公私钥
      ssl_certificate /path/to/public.crt;
      ssl_certificate_key /path/to/private.key;

      location / {
            # 用于配合 browserHistory使用
            try_files $uri $uri/ /index.html;

      }
      location /api {
          proxy_pass https://preview.xxx.com;
          proxy_set_header   X-Forwarded-Proto $scheme;
          proxy_set_header   Host              $http_host;
          proxy_set_header   X-Real-IP         $remote_addr;
      }
    }
  * 使用 spring boot
  * 然后将编译之后的文件复制到 spring boot 项目的 /src/main/resources/static
    @RequestMapping("/api/**")
    public ApiResult api(HttpServletRequest request, HttpServletResponse response){
        return apiProxy.proxy(request, reponse);
    }

    @RequestMapping(value="/**", method=HTTPMethod.GET)
    public String index(){
        return "index"
    }
   */
  history: 'browser', // browser
  localPath: `//${host}/`, // 兼容 https
  contentPath: '/api/v2/',
};
