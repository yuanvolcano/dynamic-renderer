import { computed, reactive, ref } from 'vue';

import type { IComponentConfig, IComponentState, IEventBus } from '@/types/component';

import { parseModeValue } from '@/utils/parse-expression';

/**
 * 事件总线类
 */
class EventBus implements IEventBus {
  private events: Record<string, Function[]> = {};

  emit(event: string, payload?: any): void {
    if (this.events[event]) {
      this.events[event].forEach(handler => {
        try {
          handler(payload);
        } catch (error) {
          console.error(`Event handler error for "${event}":`, error);
        }
      });
    }
  }

  on(event: string, handler: Function): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }

  off(event: string, handler?: Function): void {
    if (!this.events[event]) return;

    if (handler) {
      const index = this.events[event].indexOf(handler);
      if (index > -1) {
        this.events[event].splice(index, 1);
      }
    } else {
      delete this.events[event];
    }
  }
}

/**
 * 创建事件总线 hook
 */
export function useEventBus(): IEventBus {
  return new EventBus();
}

/**
 * 动态UI上下文 hook
 */
export function useDynamicUIContext() {
  // 响应式状态
  const jsonSchema = ref<IComponentConfig[] | IComponentConfig>([]);
  const globalState = reactive({});
  const componentStates = reactive<Record<string, IComponentState>>({});
  const eventBus = useEventBus();

  // 设置组件状态
  const setComponentState = (componentId: string, state: IComponentState): void => {
    console.log('~~ setComponentState', componentId, state);
    componentStates[componentId] = reactive({ ...state });
  };

  // 获取组件状态
  const getComponentState = (componentId: string): IComponentState => {
    return componentStates[componentId] || {};
  };

  // 更新状态
  const updateState = (path: string, value: any, componentId?: string): void => {
    console.log('~~ updateState', path, value, componentId);
    const targetState = componentId ? getComponentState(componentId) : globalState;

    if (path.includes('.')) {
      const keys = path.split('.');
      let current = targetState;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
    } else {
      targetState[path] = value;
    }
  };

  // 获取状态值
  const getStateValue = (path: string, componentId?: string): any => {
    const targetState = componentId ? getComponentState(componentId) : globalState;

    if (path.includes('.')) {
      const keys = path.split('.');
      let current = targetState;

      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          return undefined;
        }
      }

      return current;
    }

    return targetState[path];
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
        parseModeValue(handler.payload, componentStates, globalState, {
          context: {
            globalState,
            componentStates,
            eventBus,
            updateState,
            getStateValue,
            handleEvent,
            setComponentState,
            getComponentState,
          },
          uni: uni,
        });
        break;

      default:
        console.warn(`Unknown action: ${handler.action}`);
    }
  };

  // 初始化
  const init = (config: IComponentConfig[] | IComponentConfig): void => {
    const configs = Array.isArray(config) ? config : [config];
    jsonSchema.value = configs;

    const processConfig = (item: IComponentConfig) => {
      // 初始化组件状态
      if (item.defaultValue !== void 0) {
        setComponentState(item.id, item.defaultValue);
      }

      // 处理子组件
      if (item.children) {
        item.children.forEach(processConfig);
      }
    };

    configs.forEach(processConfig);
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

  // 初始化
  setupGlobalEventHandlers();

  // 计算属性 - 获取所有状态的快照
  const stateSnapshot = computed(() => ({
    global: globalState,
    components: componentStates,
  }));

  // 返回所有需要的方法和状态
  return {
    // 状态
    globalState,
    componentStates,
    eventBus,
    stateSnapshot,

    utils: {
      // 状态管理方法
      setComponentState,
      getComponentState,
      updateState,
      getStateValue,

      // 事件处理
      handleEvent,

      // 配置初始化
      init,

      // 实用方法
      setupGlobalEventHandlers,
    },
  };
}
