const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/soho/HD/E/project/people/project/web-front-template/.docz/.cache/dev-404-page.js"))),
  "component---src-index-copy-mdx": hot(preferDefault(require("/Users/soho/HD/E/project/people/project/web-front-template/src/index copy.mdx"))),
  "component---src-index-mdx": hot(preferDefault(require("/Users/soho/HD/E/project/people/project/web-front-template/src/index.mdx"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/soho/HD/E/project/people/project/web-front-template/.docz/src/pages/404.js")))
}

