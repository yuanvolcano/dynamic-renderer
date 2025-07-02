/**
 * 环境变量工具函数
 * 提供类型安全的环境变量访问
 */

// 获取应用环境
export const getAppEnv = (): 'development' | 'test' | 'production' => {
  return import.meta.env.VITE_APP_ENV || 'development';
};

// 检查是否为开发环境
export const isDev = (): boolean => {
  return getAppEnv() === 'development';
};

// 检查是否为测试环境
export const isTest = (): boolean => {
  return getAppEnv() === 'test';
};

// 检查是否为生产环境
export const isProd = (): boolean => {
  return getAppEnv() === 'production';
};

// 获取应用标题
export const getAppTitle = (): string => {
  return import.meta.env.VITE_APP_TITLE || '跨平台动态UI构建平台';
};

// 获取应用版本
export const getAppVersion = (): string => {
  return import.meta.env.VITE_APP_VERSION || '1.0.0';
};

// 获取API基础URL
export const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
};

// 获取API超时时间
export const getApiTimeout = (): number => {
  return parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000;
};

// 检查是否开启调试模式
export const isDebugMode = (): boolean => {
  return import.meta.env.VITE_APP_DEBUG === 'true';
};

// 获取日志级别
export const getLogLevel = (): 'debug' | 'info' | 'warn' | 'error' => {
  return (import.meta.env.VITE_APP_LOG_LEVEL as any) || 'info';
};

// 获取微信小程序AppID
export const getWeixinAppId = (): string => {
  return import.meta.env.VITE_MP_WEIXIN_APP_ID || '';
};

// 获取H5路由基础路径
export const getH5RouterBase = (): string => {
  return import.meta.env.VITE_H5_ROUTER_BASE || '/';
};

// 获取H5静态资源路径
export const getH5PublicPath = (): string => {
  return import.meta.env.VITE_H5_PUBLIC_PATH || '/';
};

// 检查是否移除console
export const shouldDropConsole = (): boolean => {
  return import.meta.env.VITE_DROP_CONSOLE === 'true';
};

// 检查是否移除debugger
export const shouldDropDebugger = (): boolean => {
  return import.meta.env.VITE_DROP_DEBUGGER === 'true';
};

// 环境配置对象
export const envConfig = {
  appEnv: getAppEnv(),
  isDev: isDev(),
  isTest: isTest(),
  isProd: isProd(),
  appTitle: getAppTitle(),
  appVersion: getAppVersion(),
  apiBaseUrl: getApiBaseUrl(),
  apiTimeout: getApiTimeout(),
  isDebugMode: isDebugMode(),
  logLevel: getLogLevel(),
  weixinAppId: getWeixinAppId(),
  h5RouterBase: getH5RouterBase(),
  h5PublicPath: getH5PublicPath(),
  shouldDropConsole: shouldDropConsole(),
  shouldDropDebugger: shouldDropDebugger(),
};

// 打印环境信息（仅在非生产环境）
if (!isProd()) {
  console.log('🔧 Environment Config:', envConfig);
}
