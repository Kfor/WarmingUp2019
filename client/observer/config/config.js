import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      // dynamicImport: {
      //   loadingComponent: './components/PageLoading/index',
      //   webpackChunkName: true,
      //   level: 3,
      // },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
}

export default {
  plugins,
  block: {
    // 国内用户可以使用码云
    // defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks',
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },

            // {
            //   path: '/exchange',
            //   icon: 'dollar',
            //   name: '组间交易',
              // routes: [
              //   {
              //     path: '/exchange/up',
              //     component: 'exchange/up',
              //     name: '上中游交易',
              //   },
              //   {
              //     name: '中下游交易',
              //     path: '/exchange/middle',
              //     component: './exchange/middle',
              //   },
            //     // {
            //     //   name: '上下游交易',
            //     //   path: '/exchange/down',
            //     //   component: './exchange/down',
            //     // },
            //   ],
            // },


            {
              name: '上游公司',
              icon: 'dollar',
              //changed here
              path: '/up',
              routes: [
                {
                  path: '/up/show1',
                  component: './up/show1',
                  name: '上游公司的信息展示',
                },
                {
                  name: '上游公司的输入',
                  //changed here
                  path: '/up/input',
                  routes: [
                    {
                      name: '贷款',
                      path: '/up/input/input1',
                      component: './up/input/input1',
                    },
                    {
                      name: '芯片生产',
                      path: '/up/input/input2',
                      component: './up/input/input2',
                    },
                    {
                      name: '技术投入',
                      path: '/up/input/input3',
                      component: './up/input/input3',
                    },
                  ],
                },
              ],
            },

            {
              name: '中游公司',
              icon: 'dollar',
              //changed here
              path: '/middle',
              routes: [
                {
                  path: '/middle/show2',
                  component: './middle/show2',
                  name: '中游公司的信息展示',
                },
                {
                  name: '中游公司的输入',
                  //changed here
                  path: '/middle/input',
                  routes: [
                    {
                      name: '贷款',
                      path: '/middle/input/input1',
                      component: './middle/input/input1',
                    },
                    {
                      name: '手机生产',
                      path: '/middle/input/input2',
                      component: './middle/input/input2',
                    },
                    {
                      name: '技术投入',
                      path: '/middle/input/input3',
                      component: './middle/input/input3',
                    },
                  ],
                },
              ],
            },

            {
              name: '下游公司',
              icon:'dollar',
              //changed here
              path: '/down',
              routes: [
                {
                  path: '/down/show3',
                  component: './down/show3',
                  name: '下游公司的信息展示',
                },
                {
                  name: '下游公司的输入',
                  //changed here
                  path: '/down/input',
                  routes: [
                    {
                      name: '贷款',
                      path: '/down/input/input1',
                      component: './down/input/input1',
                    },
                    {
                      name: '手机销售',
                      path: '/down/input/input2',
                      component: './down/input/input2',
                    },
                    {
                      name: '广告投入',
                      path: '/down/input/input3',
                      component: './down/input/input3',
                    },
                  ],
                },
              ],
            },



            // {
            //   name: '中游公司',
            //   //changed here
            //   path: '/form/basic-form2',
            //   component: './form/basic-form2',
            // },
            // {
            //   name: '下游公司',
            //   path: '/form/basic-form3',
            //   component: './form/basic-form3',
            // },
            // {
            //   name: '上游公司 信息显示',
            //   path: '/profile/basic1js',
            //   component: './profile/basic1js',
            // },
            // {
            //   name: '中游公司 信息显示',
            //   path: '/profile/basic2js',
            //   component: './profile/basic2js',
            // },
            // {
            //   name: '下游公司 信息显示',
            //   path: '/profile/basic3js',
            //   component: './profile/basic3js',
            // },


            // {
            //   name: 'ref_form',
            //   path: '/form/ref_form',
            //   component: './form/ref_form',
            // },
             // {
            //   name: 'basic0',
            //   path: '/profile/basic0',
            //   component: './profile/basic0',
            // },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
};
