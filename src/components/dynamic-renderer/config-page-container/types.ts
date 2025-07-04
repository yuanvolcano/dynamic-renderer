import { IComponentConfig } from '@/types/component';

/**
 * 配置页面容器组件的属性接口
 */
export interface IConfigPageProps {
  // 页面标识符，用于日志和缓存
  pageId: string;
  // 页面标题，用于错误提示
  pageTitle: string;
  // 静态配置
  staticConfig: IComponentConfig[];
  // 远程配置 API 地址
  remoteConfigUrl?: string;
  // 本地配置加载延迟时间（毫秒）
  localLoadDelay?: number;
  // 页面样式类名
  pageClass?: string;
  // 页面背景样式
  pageBackground?: string;
  // 加载文本
  loadingText?: string;
  // 是否显示加载动画
  showLoadingSpinner?: boolean;
  // 调试工具样式
  debugStyle?: 'simple' | 'advanced';
}

/**
 * 配置页面容器组件暴露的方法接口
 */
export interface IConfigPageExposed {
  // 重新加载配置
  reloadConfig: () => Promise<void>;
  // 使用本地配置
  useLocalConfig: () => Promise<void>;
  // 清除错误信息
  clearError: () => void;
  // 配置数据
  config: IComponentConfig[];
  // 加载状态
  loading: boolean;
  // 错误信息
  error: string;
}

/**
 * 页面预设配置类型
 */
export interface IPagePreset {
  pageId: string;
  pageTitle: string;
  pageClass: string;
  pageBackground: string;
  loadingText: string;
  showLoadingSpinner: boolean;
  debugStyle: 'simple' | 'advanced';
  localLoadDelay: number;
}
