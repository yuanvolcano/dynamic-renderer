import { inject, provide, computed } from 'vue';
import { DynamicUIContext } from '@/core/dynamic-ui-context';

const DYNAMIC_UI_CONTEXT_KEY = Symbol('dynamic-ui-context');

// 提供上下文
export function provideDynamicUIContext(initialState = {}) {
  const context = new DynamicUIContext(initialState);
  provide(DYNAMIC_UI_CONTEXT_KEY, context);
  return context;
}

// 使用上下文
export function useDynamicUIContext(): DynamicUIContext {
  const context = inject<DynamicUIContext>(DYNAMIC_UI_CONTEXT_KEY);
  if (!context) {
    throw new Error('useDynamicUIContext must be used within a DynamicUIProvider');
  }
  return context;
}

// 组件级状态管理
export function useComponentState(componentId: string) {
  const context = useDynamicUIContext();

  const state = computed(() => context.getComponentState(componentId));

  const updateState = (path: string, value: any) => {
    context.updateState(path, value, componentId);
  };

  const getState = (path: string) => {
    return context.getStateValue(path, componentId);
  };

  return {
    state,
    updateState,
    getState,
  };
}

// 全局状态管理
export function useGlobalState() {
  const context = useDynamicUIContext();

  const state = computed(() => context.globalState);

  const updateState = (path: string, value: any) => {
    context.updateState(path, value);
  };

  const getState = (path: string) => {
    return context.getStateValue(path);
  };

  return {
    state,
    updateState,
    getState,
  };
}

// 事件系统
export function useEventBus() {
  const context = useDynamicUIContext();
  return context.eventBus;
}
