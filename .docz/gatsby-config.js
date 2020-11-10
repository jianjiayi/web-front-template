const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'MobX with React',
    description: 'Make your components truly reactive with MobX',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {
          mode: 'dark',
          codemirrorTheme: 'blackboard',
          showPlaygroundEditor: false,
          linesToScrollEditor: 50,
          colors: {
            codeColor: '#8DB6DE',
            codeBg: '#0C1021',
            blockquoteColor: '#8DB6DE',
            blockquoteBg: '#0C1021',
          },
        },
        src: 'src',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: false,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root:
          '/Users/soho/HD/E/project/people/project/web-front-template/.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: 'src/**/*.mdx',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'MobX with React',
        description: 'Make your components truly reactive with MobX',
        host: 'localhost',
        port: 3001,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/soho/HD/E/project/people/project/web-front-template',
          templates:
            '/Users/soho/HD/E/project/people/project/web-front-template/node_modules/docz-core/dist/templates',
          docz:
            '/Users/soho/HD/E/project/people/project/web-front-template/.docz',
          cache:
            '/Users/soho/HD/E/project/people/project/web-front-template/.docz/.cache',
          app:
            '/Users/soho/HD/E/project/people/project/web-front-template/.docz/app',
          appPackageJson:
            '/Users/soho/HD/E/project/people/project/web-front-template/package.json',
          appTsConfig:
            '/Users/soho/HD/E/project/people/project/web-front-template/tsconfig.json',
          gatsbyConfig:
            '/Users/soho/HD/E/project/people/project/web-front-template/gatsby-config.js',
          gatsbyBrowser:
            '/Users/soho/HD/E/project/people/project/web-front-template/gatsby-browser.js',
          gatsbyNode:
            '/Users/soho/HD/E/project/people/project/web-front-template/gatsby-node.js',
          gatsbySSR:
            '/Users/soho/HD/E/project/people/project/web-front-template/gatsby-ssr.js',
          importsJs:
            '/Users/soho/HD/E/project/people/project/web-front-template/.docz/app/imports.js',
          rootJs:
            '/Users/soho/HD/E/project/people/project/web-front-template/.docz/app/root.jsx',
          indexJs:
            '/Users/soho/HD/E/project/people/project/web-front-template/.docz/app/index.jsx',
          indexHtml:
            '/Users/soho/HD/E/project/people/project/web-front-template/.docz/app/index.html',
          db:
            '/Users/soho/HD/E/project/people/project/web-front-template/.docz/app/db.json',
        },
        codeSandbox: false,
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
