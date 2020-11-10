// @ts-nocheck
import React, { useState, useEffect } from "react";
import { ApplyPluginsType, useModel } from "umi";
import { plugin } from "../core/umiExports";
import LayoutComponent from './layout/layout/index.tsx';

export default props => {
  const [runtimeConfig, setRuntimeConfig] = useState(null);

  const initialInfo = (useModel && useModel("@@initialState")) || {
    initialState: undefined,
    loading: false,
    setInitialState: null
  }; // plugin-initial-state 未开启

  useEffect(() => {
    const useRuntimeConfig =
      plugin.applyPlugins({
        key: "layout",
        type: ApplyPluginsType.modify,
        initialValue: initialInfo
      }) || {};
    if (useRuntimeConfig instanceof Promise) {
      useRuntimeConfig.then(config => {
        setRuntimeConfig(config);
      });
      return;
    }
    setRuntimeConfig(useRuntimeConfig);
  }, [initialInfo?.initialState]);

  const userConfig = {
    ...{'name':'data-center','theme':'PRO','locale':false,'showBreadcrumb':true,'navTheme':'dark','primaryColor':'#1890ff','layout':'side','contentWidth':'Fluid','fixedHeader':false,'fixSiderbar':true,'colorWeak':false,'menu':{'locale':false},'title':'中后台前端框架','pwa':false,'iconfontUrl':''},
    ...runtimeConfig || {}
  };

  if(!runtimeConfig){
    return null
  }

  return React.createElement(LayoutComponent, {
    userConfig,
    ...props
  });
};
