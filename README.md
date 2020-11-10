# Ant Design Pro

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```
###
```bash
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
```
## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).
