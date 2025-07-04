import { IPagePreset } from './types';

/**
 * 预定义的页面预设
 */
export const PAGE_PRESETS: Record<string, Partial<IPagePreset>> = {
  // 布局页面预设
  layout: {
    pageId: 'layout',
    pageTitle: '布局页面',
    pageClass: 'layout-page',
    pageBackground: '',
    loadingText: '布局配置加载中...',
    showLoadingSpinner: false,
    debugStyle: 'simple',
    localLoadDelay: 500,
  },

  // 表单页面预设
  form: {
    pageId: 'form',
    pageTitle: '表单页面',
    pageClass: 'form-page',
    pageBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    loadingText: '表单配置加载中...',
    showLoadingSpinner: true,
    debugStyle: 'advanced',
    localLoadDelay: 300,
  },

  // 默认页面预设
  default: {
    pageId: 'config',
    pageTitle: '配置页面',
    pageClass: 'config-page',
    pageBackground: '',
    loadingText: '配置加载中...',
    showLoadingSpinner: false,
    debugStyle: 'simple',
    localLoadDelay: 500,
  },
};
