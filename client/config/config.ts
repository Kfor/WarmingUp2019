import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: false,
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
  history: 'hash',
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    // {
    //   path: '/user/login',
    //   component: '../layouts/UserLayout',
    //   routes: [
    //     {
    //       name: 'login',
    //       path: '/user/login',
    //       component: './user/login',
    //     },
    //   ],
    // },
    {
      path: '/',
      redirect: '/admin/rank',
    },
    {
      path: '/admin',
      component: '../layouts/BasicLayout',
      // authority: ['admin', 'user'],
      routes: [
        // {
        //   name: 'orderlist',
        //   path: '/admin/orderlist',
        //   component: './admin/orderList',
        // },
        // {
        //   name: 'deal',
        //   path: '/admin/inputorder',
        //   routes: [
        //     // {
        //     //   name: 'dealupmiddle',
        //     //   icon: 'smile',
        //     //   path: '/admin/inputorder/dealupmiddle',
        //     //   component: './admin/inputOrder/dealUpMiddle',
        //     // },
        //     // {
        //     //   name: 'dealmiddledown',
        //     //   icon: 'smile',
        //     //   path: '/admin/inputorder/dealmiddledown',
        //     //   component: './admin/inputOrder/dealMiddleDown',
        //     // },
        //     // {
        //     //   name: 'dealdown',
        //     //   icon: 'smile',
        //     //   path: '/admin/inputorder/dealdown',
        //     //   component: './admin/inputOrder/dealDown',
        //     // },
        //     // {
        //     //   name: 'dealbetween',
        //     //   icon: 'smile',
        //     //   path: '/admin/inputorder/dealbetween',
        //     //   component: './admin/inputOrder/dealBetween',
        //     // },
        //   ],
        // },
        {
          name: 'dealbetween',
          icon: 'smile',
          path: '/admin/inputorder/dealbetween',
          component: './admin/inputOrder/dealBetween',
        },
        {
          name: 'dealupmiddle',
          icon: 'smile',
          path: '/admin/inputorder/dealupmiddle',
          component: './admin/inputOrder/dealUpMiddle',
        },
        {
          name: 'dealmiddledown',
          icon: 'smile',
          path: '/admin/inputorder/dealmiddledown',
          component: './admin/inputOrder/dealMiddleDown',
        },
        {
          name: 'dealdown',
          icon: 'smile',
          path: '/admin/inputorder/dealdown',
          component: './admin/inputOrder/dealDown',
        },
        {
          name: 'oneround',
          icon: 'smile',
          path: '/admin/oneround',
          component: './admin/oneRound',
        },
        // {
        //   name: 'display',
        //   path: '/admin/display',
        //   component: './admin/display',
        // },
        // {
        //   name: 'angelinvest',
        //   path: '/admin/angelinvest',
        //   component: './admin/angelInvest',
        // },
        {
          name: 'fine',
          path: '/admin/fine',
          component: './admin/fine',
        },
        {
          name: 'controller',
          path: '/admin/controller',
          component: './admin/controller',
        },
        {
          name: 'rank',
          path: '/admin/rank',
          component: './admin/rank',
        },
        {
          name: 'jump',
          path: '/admin/jump',
          routes: [
            {
              name: 'gotoup',
              path: '/admin/jump/gotoup',
              redirect: '/up/upinput?userId=group1',
            },
            {
              name: 'gotomiddle',
              path: '/admin/jump/gotomiddle',
              redirect: '/middle/middleinput?userId=group5',
            },
            {
              name: 'gotodown',
              path: '/admin/jump/gotodown',
              redirect: '/down/downinput?userId=group10',
            },
          ],
        },
        {
          name: 'dealbetweenprofile',
          path: '/admin/dealbetweenprofile',
          component: './admin/dealBetweenProfile',
        },

        {
          component: './404',
        },
      ],
    },
    {
      path: '/up',
      component: '../layouts/BasicLayout',
      hideInBreadcrumb: true,
      // authority: ['admin', 'user'],
      routes: [
        {
          path: '/up',
          redirect: '/up/upinput',
        },
        {
          name: 'upinput',
          path: '/up/upinput',
          icon: 'input',
          component: './up/upInput',
          hideInBreadcrumb: true,
        },
        {
          name: 'upprofile',
          path: '/up/upprofile',
          icon: 'money',
          component: './up/upProfile',
          hideInBreadcrumb: true,
        }, // {
        //   name: 'updisplay',
        //   path: '/up/updisplay',
        //   component: './up/updisplay',
        //   hideInBreadcrumb: true,
        // },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/middle',
      component: '../layouts/BasicLayout',
      // authority: ['admin', 'user'],
      routes: [
        {
          path: '/middle',
          redirect: '/middle/middleinput',
        },
        {
          name: 'middleinput',
          path: '/middle/middleinput',
          icon: 'input',
          component: './middle/middleInput',
          hideInBreadcrumb: true,
        },
        // {
        //   name: 'middleprofile',
        //   path: '/middle/middleprofile',
        //   icon: 'money',
        //   component: './middle/middleProfile',
        //   hideInBreadcrumb: true,
        // }, // {
        //   name: 'middledisplay',
        //   path: '/middle/middledisplay',
        //   component: './middle/middledisplay',
        //   hideInBreadcrumb: true,
        // },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/down',
      component: '../layouts/BasicLayout',
      // authority: ['admin', 'user'],
      routes: [
        {
          path: '/down',
          redirect: '/down/downinput',
        },
        {
          name: 'downinput',
          path: '/down/downinput',
          icon: 'input',
          component: './down/downInput',
          hideInBreadcrumb: true,
        },
        // {
        //   name: 'downprofile',
        //   path: '/down/downprofile',
        //   icon: 'money',
        //   component: './down/downProfile',
        //   hideInBreadcrumb: true,
        // }, // {
        //   name: 'downdisplay',
        //   path: '/down/downdisplay',
        //   component: './down/downdisplay',
        //   hideInBreadcrumb: true,
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
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
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
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      pathRewrite: {
        '^/server': '',
      },
    },
  },
} as IConfig;
