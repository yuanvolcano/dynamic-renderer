import { reactive, ref } from 'vue';

import type { IComponentConfig, IComponentState, IEventBus } from '@/types/component';

import { parseModeValue } from '@/utils/parse-expression';

// 上下文工具方法接口
export interface IContextUtils {
  // 状态管理方法
  setComponentState: (componentId: string, state: any) => void;
  getComponentState: (componentId: string) => IComponentState;
  updateState: (path: string, value: any, componentId?: string) => void;
  getStateValue: (path: string, componentId?: string) => any;

  // 事件处理
  handleEvent: (handler: any, componentId: string) => void;

  // 显隐控制
  isComponentVisible: (config: IComponentConfig) => boolean;
  handleVisibilityChange: (config: IComponentConfig, isVisible: boolean) => void;

  // 配置初始化
  init: (config: IComponentConfig[] | IComponentConfig) => void;

  // 重置状态
  resetState: (config: IComponentConfig[] | IComponentConfig) => void;

  // 实用方法
  setupGlobalEventHandlers: () => void;
  createParseContext: () => IParseContext;
}

// 解析上下文接口
export interface IParseContext {
  context: {
    globalState: any;
    componentStates: Record<string, IComponentState>;
    configs: IComponentConfig[];
    eventBus: IEventBus;
    utils: IContextUtils;
  };
  uni: any;
}

/**
 * 创建上下文工具方法
 */
export function useContextUtils(
  globalState: any,
  componentStates: Record<string, IComponentState>,
  eventBus: IEventBus
): IContextUtils {
  /** 当前 json 配置 */
  const configs = ref<IComponentConfig[]>([]);

  // 用于跟踪已处理的组件 ID，确保全局唯一性
  const componentIds = reactive(new Set<string>());

  // 设置组件状态
  const setComponentState = (componentId: string, state: any): void => {
    componentStates[componentId] = state;
  };

  // 获取组件状态
  const getComponentState = (componentId: string): IComponentState => {
    return componentStates[componentId] || {};
  };

  // 更新状态
  const updateState = (path: string, value: any, componentId?: string): void => {
    const targetState = componentId ? componentStates : globalState;

    if (path.includes('.')) {
      const keys = path.split('.');
      let current: any = targetState;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current?.[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
    } else {
      (targetState as any)[path] = value;
    }
  };

  // 获取状态值
  const getStateValue = (path: string, componentId?: string): any => {
    const targetState = componentId ? getComponentState(componentId) : globalState;

    if (path.includes('.')) {
      const keys = path.split('.');
      let current: any = targetState;

      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          return undefined;
        }
      }

      return current;
    }

    return (targetState as any)[path];
  };

  // 创建解析上下文 - 先声明，后面实现
  // eslint-disable-next-line prefer-const
  let createParseContext: () => IParseContext;

  // 判断组件是否可见
  const isComponentVisible = (config: IComponentConfig): boolean => {
    if (config.visibleOption === void 0) {
      return true; // 没有配置显隐条件，默认显示
    }

    try {
      return parseModeValue(config.visibleOption, componentStates, globalState, createParseContext());
    } catch (error) {
      console.warn(`Error evaluating visibility for component ${config.id}:`, error);
      return true; // 出错时默认显示
    }
  };

  // 递归重置组件及其所有子组件的默认值 - 内部函数
  const _resetComponentAndChildren = (config: IComponentConfig): void => {
    // 重置当前组件的默认值
    if (config.defaultValue !== undefined) {
      console.log(`~~ Resetting component ${config.id} to default value:`, config.defaultValue);
      setComponentState(config.id, config.defaultValue);
    }

    // 递归重置所有子组件
    if (config.children && config.children.length > 0) {
      config.children.forEach(child => {
        _resetComponentAndChildren(child);
      });
    }
  };

  // 处理组件显隐变化时的默认值重置
  const handleVisibilityChange = (config: IComponentConfig, isVisible: boolean): void => {
    if (!isVisible) {
      _resetComponentAndChildren(config);
    }
  };

  // 处理事件
  const handleEvent = (handler: any, componentId: string): void => {
    switch (handler.action) {
      case 'updateState':
        console.log(
          '~~ handleEvent updateState',
          handler.payload.path,
          handler.payload.value,
          handler.target || componentId
        );
        updateState(handler.payload.path, handler.payload.value, handler.target || componentId);
        break;

      case 'update:modelValue':
        console.log(
          '~~ handleEvent update:modelValue',
          handler.payload.path,
          handler.payload.value,
          handler.target || componentId
        );
        updateState(handler.payload.path, handler.payload.value, handler.target || componentId);
        break;

      case 'emit':
        eventBus.emit(handler.payload.event, handler.payload.data);
        break;

      case 'navigate':
        uni.navigateTo({ url: handler.payload.url });
        break;

      case 'navigateBack':
        // 在 H5 环境下使用 history.back() 避免路由冲突
        // #ifdef H5
        if (typeof window !== 'undefined' && window.history) {
          window.history.back();
        } else {
          uni.navigateBack({ delta: handler.payload?.delta || 1 });
        }
        // #endif
        // #ifndef H5
        uni.navigateBack({ delta: handler.payload?.delta || 1 });
        // #endif
        break;

      case 'showToast':
        uni.showToast(handler.payload);
        break;

      case 'custom':
        parseModeValue(handler.payload, componentStates, globalState, createParseContext());
        break;

      // 这里可以继续扩展事件处理

      default:
        console.warn(`Unknown action: ${handler.action}`);
    }
  };

  const _processConfig = (item: IComponentConfig) => {
    // 检查 ID 是否重复
    if (componentIds.has(item.id)) {
      const error = `❌ 配置错误: 发现重复的组件 ID "${item.id}"！每个组件的 ID 必须全局唯一。`;
      console.error(error);
      throw new Error(error);
    }

    // 记录已处理的 ID
    componentIds.add(item.id);

    // 初始化组件状态
    if (item.defaultValue !== void 0) {
      setComponentState(item.id, item.defaultValue);
    }

    // 处理子组件
    if (item.children) {
      item.children.forEach(child => {
        _processConfig(child);
      });
    }
  };

  // 初始化
  const init = (config: IComponentConfig[] | IComponentConfig): void => {
    const _configs = Array.isArray(config) ? config : [config];
    configs.value = _configs;

    // 清空并重新检查组件 ID
    componentIds.clear();
    _configs.forEach(item => {
      _processConfig(item);
    });
  };

  // 重置状态
  const resetState = (_config?: IComponentConfig[] | IComponentConfig): void => {
    console.log('~~ resetState');
    const _configs = _config ? (Array.isArray(_config) ? _config : [_config]) : configs.value;

    // 清空并重新检查组件 ID
    componentIds.clear();
    _configs.forEach(item => {
      _processConfig(item);
    });
  };

  // 设置全局事件处理器
  const setupGlobalEventHandlers = (): void => {
    // 设置一些全局事件处理器
    eventBus.on('log', (data: any) => {
      console.log('DynamicUI Log:', data);
    });

    eventBus.on('error', (error: any) => {
      console.error('DynamicUI Error:', error);
    });
  };

  // 构建工具方法对象
  const utils: IContextUtils = {
    setComponentState,
    getComponentState,
    updateState,
    getStateValue,
    handleEvent,
    isComponentVisible,
    handleVisibilityChange,
    init,
    resetState,
    setupGlobalEventHandlers,
    createParseContext: () => createParseContext(),
  };

  // 实现 createParseContext 函数
  createParseContext = (): IParseContext => ({
    context: {
      globalState,
      componentStates,
      configs: configs.value,
      eventBus,
      utils,
    },
    uni: uni,
  });

  return utils;
}
