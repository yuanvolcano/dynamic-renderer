// 组件导出
export { default as ConfigPageContainer } from './config-page-container/index.vue';

// 类型导出
export type { IConfigPageExposed, IConfigPageProps, IPagePreset } from './types';

// 常量导出
export { PAGE_PRESETS } from './constants';

// 工具函数导出
export {
  createConfigPageProps,
  createCustomPreset,
  generateDefaultConfig,
  getAvailablePresets,
  validateConfigPageProps,
} from './utils';
