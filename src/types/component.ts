// 组件配置接口
export interface IComponentConfig {
  /** 组件ID */
  id: string;
  /** 组件名称 */
  componentName: string;
  /** 静态数据 */
  props?: Record<string, any>;
  /** 子组件 */
  children?: IComponentConfig[];
  /** 绑定数据 */
  bindings?: Record<string, IModeCondition>;
  /** 组件状态 */
  state?: any;
  /** 事件处理器 */
  events?: Record<string, IEventHandler | IEventHandler[]>;
}

// 基础组件属性接口
export interface IBaseComponentProps {
  style?: Record<string, any>;
  onClick?: () => void;
}

// 动态UI数据结构
export interface DynamicUISchema {
  version: string;
  components: IComponentConfig[];
  metadata?: {
    title?: string;
    description?: string;
    author?: string;
    createTime?: string;
    updateTime?: string;
  };
}

export type TExpression = boolean | number | string | undefined;

export enum EValueMode {
  READ = 'read',
  PATH = 'path',
  PARSE = 'parse',
}

export interface IModeCondition {
  mode: EValueMode;
  condition: TExpression;
}

// 状态管理相关类型
export interface IComponentState {
  [key: string]: any;
}

// 事件处理器类型
export interface IEventHandler {
  type: string;
  action: string;
  payload?: any;
  target?: string; // 目标组件ID
}

// 动态UI上下文
export interface IDynamicUIContext {
  globalState: IComponentState;
  componentStates: Record<string, IComponentState>;
  eventBus: IEventBus;
}

// 事件总线接口
export interface IEventBus {
  emit: (_event: string, _payload?: any) => void;
  on: (_event: string, _handler: Function) => void;
  off: (_event: string, _handler?: Function) => void;
}
