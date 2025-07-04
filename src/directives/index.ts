import vLoading from './loading';

import type { App } from 'vue';

// 所有指令列表
const directives = {
  loading: vLoading,
};

// 批量注册指令的方法
export const setupDirectives = (app: App): void => {
  Object.keys(directives).forEach(key => {
    app.directive(key, directives[key as keyof typeof directives]);
  });
};

// 单独导出指令，方便按需引入
export { vLoading };

// 默认导出批量注册方法
export default setupDirectives;
