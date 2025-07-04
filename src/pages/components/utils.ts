import { PAGE_PRESETS } from './constants';
import { IConfigPageProps, IPagePreset } from './types';

import { IComponentConfig } from '@/types/component';

/**
 * 创建配置页面的属性配置
 * @param preset 预设类型或自定义配置
 * @param staticConfig 静态配置数据
 * @param remoteConfigUrl 远程配置URL（可选）
 * @param overrides 自定义覆盖配置（可选）
 * @returns 配置页面组件的属性配置
 */
export function createConfigPageProps(
  preset: keyof typeof PAGE_PRESETS | Partial<IPagePreset>,
  staticConfig: IComponentConfig[],
  remoteConfigUrl?: string,
  overrides?: Partial<IConfigPageProps>
): IConfigPageProps {
  // 获取预设配置
  const presetConfig = typeof preset === 'string' ? PAGE_PRESETS[preset] || PAGE_PRESETS.default : preset;

  // 合并配置
  const baseConfig: IConfigPageProps = {
    pageId: presetConfig.pageId || 'config',
    pageTitle: presetConfig.pageTitle || '配置页面',
    staticConfig,
    remoteConfigUrl,
    localLoadDelay: presetConfig.localLoadDelay || 500,
    pageClass: presetConfig.pageClass || 'config-page',
    pageBackground: presetConfig.pageBackground || '',
    loadingText: presetConfig.loadingText || '配置加载中...',
    showLoadingSpinner: presetConfig.showLoadingSpinner || false,
    debugStyle: presetConfig.debugStyle || 'simple',
    ...overrides,
  };

  return baseConfig;
}

/**
 * 验证配置页面属性
 * @param props 配置页面属性
 * @returns 验证结果和错误信息
 */
export function validateConfigPageProps(props: IConfigPageProps): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // 必需字段验证
  if (!props.pageId) {
    errors.push('pageId 是必需的');
  }

  if (!props.pageTitle) {
    errors.push('pageTitle 是必需的');
  }

  if (!props.staticConfig || !Array.isArray(props.staticConfig)) {
    errors.push('staticConfig 必须是一个配置数组');
  }

  // 可选字段验证
  if (props.localLoadDelay !== undefined && props.localLoadDelay < 0) {
    errors.push('localLoadDelay 不能为负数');
  }

  if (props.debugStyle && !['simple', 'advanced'].includes(props.debugStyle)) {
    errors.push('debugStyle 必须是 "simple" 或 "advanced"');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * 获取所有可用的预设列表
 * @returns 预设名称和描述的列表
 */
export function getAvailablePresets(): Array<{
  key: string;
  name: string;
  description: string;
}> {
  return Object.entries(PAGE_PRESETS).map(([key, preset]) => ({
    key,
    name: preset.pageTitle || key,
    description: `${preset.pageTitle || key} - ${preset.loadingText || '加载中...'}`,
  }));
}

/**
 * 创建自定义预设
 * @param name 预设名称
 * @param config 预设配置
 */
export function createCustomPreset(name: string, config: Partial<IPagePreset>): void {
  if (PAGE_PRESETS[name]) {
    console.warn(`预设 "${name}" 已存在，将被覆盖`);
  }

  PAGE_PRESETS[name] = config;
}

/**
 * 生成页面配置的默认值
 * @param pageId 页面ID
 * @returns 默认配置
 */
export function generateDefaultConfig(pageId: string): Partial<IConfigPageProps> {
  return {
    pageId,
    pageTitle: `${pageId.charAt(0).toUpperCase() + pageId.slice(1)}页面`,
    pageClass: `${pageId}-page`,
    loadingText: `${pageId}配置加载中...`,
    showLoadingSpinner: false,
    debugStyle: 'simple',
    localLoadDelay: 500,
  };
}
