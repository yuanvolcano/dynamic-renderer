import { computed, reactive } from 'vue';

import { createContextUtils, type IContextUtils } from './use-context-utils';

import type { IComponentState, IEventBus } from '@/types/component';

// 动态上下文返回值接口
export interface IDynamicContextReturn {
  globalState: any;
  componentStates: Record<string, IComponentState>;
  eventBus: IEventBus;
  stateSnapshot: any;
  utils: IContextUtils;
}

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
export function useDynamicContext(): IDynamicContextReturn {
  // 响应式状态
  const globalState = reactive({});
  const componentStates = reactive<Record<string, IComponentState>>({});
  const eventBus = useEventBus();

  // 创建统一的工具方法
  const utils = createContextUtils(globalState, componentStates, eventBus);

  // 初始化全局事件处理器
  utils.setupGlobalEventHandlers();

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
    utils,
  };
}
