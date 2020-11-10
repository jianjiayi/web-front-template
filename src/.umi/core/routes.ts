// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/soho/HD/E/project/people/project/data-center/data-center-front/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: '.umi__plugin-layout__Layout' */'/Users/soho/HD/E/project/people/project/data-center/data-center-front/src/.umi/plugin-layout/Layout.tsx'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/user",
        "layout": false,
        "routes": [
          {
            "name": "login",
            "path": "/user/login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__login' */'/Users/soho/HD/E/project/people/project/data-center/data-center-front/src/pages/user/login'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/home",
        "name": "welcome",
        "icon": "smile",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/Users/soho/HD/E/project/people/project/data-center/data-center-front/src/pages/Welcome'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/demo",
        "name": "formDemo",
        "icon": "smile",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Demo__Welcome' */'/Users/soho/HD/E/project/people/project/data-center/data-center-front/src/pages/Demo/Welcome'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/admin",
        "name": "admin",
        "icon": "crown",
        "access": "canAdmin",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Admin' */'/Users/soho/HD/E/project/people/project/data-center/data-center-front/src/pages/Admin'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/admin/sub-page",
            "name": "sub-page",
            "icon": "smile",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/Users/soho/HD/E/project/people/project/data-center/data-center-front/src/pages/Welcome'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "name": "list.table-list",
        "icon": "table",
        "path": "/list",
        "routes": [
          {
            "path": "/list/hooks",
            "name": "sub-page",
            "icon": "smile",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Hooks__routes' */'/Users/soho/HD/E/project/people/project/data-center/data-center-front/src/pages/Hooks/routes'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/list/first-page",
            "name": "sub-page",
            "icon": "smile",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/Users/soho/HD/E/project/people/project/data-center/data-center-front/src/pages/Welcome'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/list/sub-page",
            "name": "sub-page",
            "icon": "smile",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ListTableList' */'/Users/soho/HD/E/project/people/project/data-center/data-center-front/src/pages/ListTableList'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/",
        "redirect": "/home",
        "exact": true
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/soho/HD/E/project/people/project/data-center/data-center-front/src/pages/404'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
