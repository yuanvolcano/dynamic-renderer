/**
 * 跨平台路由工具函数
 * 兼容 H5 history 模式和小程序导航
 */

import { envConfig } from './env';

// 路由跳转选项
export interface NavigateOptions {
  url: string;
  query?: Record<string, any>;
  mode?: 'push' | 'replace' | 'reLaunch' | 'switchTab';
  animationType?: string;
  animationDuration?: number;
}

/**
 * 统一的路由跳转方法
 * @param options 跳转选项
 */
export const navigateTo = (options: NavigateOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    const { url, query = {}, mode = 'push' } = options;

    // 构建完整的URL
    let fullUrl = url;
    const queryString = Object.keys(query)
      .map(key => `${key}=${encodeURIComponent(query[key])}`)
      .join('&');

    if (queryString) {
      fullUrl += (url.includes('?') ? '&' : '?') + queryString;
    }

    // 确保URL以/开头
    if (!fullUrl.startsWith('/')) {
      fullUrl = '/' + fullUrl;
    }

    try {
      switch (mode) {
        case 'push':
          uni.navigateTo({
            url: fullUrl,
            success: () => resolve(),
            fail: error => reject(error),
          });
          break;

        case 'replace':
          uni.redirectTo({
            url: fullUrl,
            success: () => resolve(),
            fail: error => reject(error),
          });
          break;

        case 'reLaunch':
          uni.reLaunch({
            url: fullUrl,
            success: () => resolve(),
            fail: error => reject(error),
          });
          break;

        case 'switchTab':
          uni.switchTab({
            url: fullUrl,
            success: () => resolve(),
            fail: error => reject(error),
          });
          break;

        default:
          uni.navigateTo({
            url: fullUrl,
            success: () => resolve(),
            fail: error => reject(error),
          });
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * 返回上一页
 * @param delta 返回的页面数，默认为1
 */
export const navigateBack = (delta: number = 1): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      uni.navigateBack({
        delta,
        success: () => resolve(),
        fail: error => reject(error),
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * 切换到 Tab 页面
 * @param url tab页面路径
 */
export const switchTab = (url: string): Promise<void> => {
  return navigateTo({ url, mode: 'switchTab' });
};

/**
 * 获取当前页面路径
 */
export const getCurrentRoute = (): string => {
  const pages = getCurrentPages();
  if (pages.length > 0) {
    const currentPage = pages[pages.length - 1];
    return currentPage.route || '';
  }
  return '';
};

/**
 * 获取当前页面完整路径（包含参数）
 */
export const getCurrentRouteWithQuery = (): string => {
  const pages = getCurrentPages();
  if (pages.length > 0) {
    const currentPage = pages[pages.length - 1];
    const route = currentPage.route || '';
    const options = (currentPage as any).options || {};

    const queryString = Object.keys(options)
      .map(key => `${key}=${encodeURIComponent(options[key])}`)
      .join('&');

    return queryString ? `${route}?${queryString}` : route;
  }
  return '';
};

/**
 * 解析URL参数
 * @param url 完整URL
 */
export const parseUrlQuery = (url: string): Record<string, string> => {
  const queryIndex = url.indexOf('?');
  if (queryIndex === -1) return {};

  const queryString = url.substring(queryIndex + 1);
  const params: Record<string, string> = {};

  queryString.split('&').forEach(param => {
    const [key, value] = param.split('=');
    if (key) {
      params[key] = decodeURIComponent(value || '');
    }
  });

  return params;
};

/**
 * 构建URL
 * @param path 路径
 * @param query 查询参数
 */
export const buildUrl = (path: string, query?: Record<string, any>): string => {
  if (!query || Object.keys(query).length === 0) {
    return path;
  }

  const queryString = Object.keys(query)
    .map(key => `${key}=${encodeURIComponent(query[key])}`)
    .join('&');

  return `${path}?${queryString}`;
};

/**
 * 路由预设常量
 */
export const ROUTES = {
  HOME: '/pages/index/index',
  DEMO: '/pages/demo/demo',
} as const;

/**
 * Tab页面路径常量
 */
export const TAB_ROUTES = [ROUTES.HOME, ROUTES.DEMO] as const;

/**
 * 判断是否为Tab页面
 * @param url 页面路径
 */
export const isTabRoute = (url: string): boolean => {
  const cleanUrl = url.split('?')[0];
  return TAB_ROUTES.includes(cleanUrl as any);
};

/**
 * 智能导航（自动判断是否为Tab页面）
 * @param url 目标页面路径
 * @param query 查询参数
 */
export const smartNavigate = (url: string, query?: Record<string, any>): Promise<void> => {
  const mode = isTabRoute(url) ? 'switchTab' : 'push';
  return navigateTo({ url, query, mode });
};

// 调试信息（仅在开发环境）
if (envConfig.isDev) {
  console.log('🧭 Router utils loaded:', {
    currentRoute: getCurrentRoute(),
    routerMode: 'history', // H5 使用 history 模式
    environment: envConfig.appEnv,
  });
}
