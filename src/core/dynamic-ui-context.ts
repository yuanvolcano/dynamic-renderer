import { reactive } from 'vue';

import type { IComponentConfig, IComponentState, IDynamicUIContext, IEventBus } from '@/types/component';

import { isIModeCondition, parseModeValue } from '@/utils/parse-expression';

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

export class DynamicUIContext implements IDynamicUIContext {
  public globalState: IComponentState;
  public componentStates: Record<string, IComponentState>;
  public eventBus: IEventBus;

  constructor(initialState: IComponentState = {}) {
    this.globalState = reactive(initialState);
    this.componentStates = reactive({});
    this.eventBus = new EventBus();

    this.setupGlobalEventHandlers();
  }

  // 设置组件状态
  setComponentState(componentId: string, state: IComponentState): void {
    this.componentStates[componentId] = reactive({ ...state });
  }

  // 获取组件状态
  getComponentState(componentId: string): IComponentState {
    return this.componentStates[componentId] || {};
  }

  // 更新状态
  updateState(path: string, value: any, componentId?: string): void {
    const targetState = componentId ? this.getComponentState(componentId) : this.globalState;

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
  }

  // 获取状态值
  getStateValue(path: string, componentId?: string): any {
    const targetState = componentId ? this.getComponentState(componentId) : this.globalState;

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
  }

  // 处理事件
  handleEvent(eventType: string, handler: any, componentId: string): void {
    switch (handler.action) {
      case 'update:modelValue':
        this.updateState(handler.payload.path, handler.payload.value, handler.target || componentId);
        break;

      case 'emit':
        this.eventBus.emit(handler.payload.event, handler.payload.data);
        break;

      case 'navigate':
        uni.navigateTo({ url: handler.payload.url });
        break;

      case 'showToast':
        uni.showToast(handler.payload);
        break;

      case 'custom':
        // 执行自定义函数
        if (isIModeCondition(handler.payload)) {
          parseModeValue(handler.payload, this.componentStates, this.globalState, { context: this });
        }
        break;

      default:
        console.warn(`Unknown action: ${handler.action}`);
    }
  }

  // 初始化配置
  initializeConfig(config: IComponentConfig[] | IComponentConfig): void {
    const configs = Array.isArray(config) ? config : [config];

    const processConfig = (item: IComponentConfig) => {
      // 初始化组件状态
      if (item.state) {
        this.setComponentState(item.id, item.state);
      }

      // 处理子组件
      if (item.children) {
        item.children.forEach(processConfig);
      }
    };

    configs.forEach(processConfig);
  }

  private setupGlobalEventHandlers(): void {
    // 设置一些全局事件处理器
    this.eventBus.on('log', data => {
      console.log('DynamicUI Log:', data);
    });

    this.eventBus.on('error', error => {
      console.error('DynamicUI Error:', error);
    });
  }
}
