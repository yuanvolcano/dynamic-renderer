// 导入枚举常量
import { EEventExecutionMode, EValueMode, type TEventExecutionMode } from '@/constants/enums';

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
  bindings?: Record<string, TValueCondition>;
  /** 组件默认值 */
  defaultValue?: any;
  /** 事件处理器 */
  events?: Record<string, IEventHandler | IEventHandler[]>;
  /** 事件执行模式：parallel(并行) | sequential(顺序)，默认 parallel */
  eventExecutionMode?: TEventExecutionMode;
  /** 显隐式控制 */
  visibleOption?: TValueCondition;
  /** 预留其他属性，方便扩展 */
  [key: string]: any;
}

// 基础组件属性接口
export interface IBaseComponentProps {
  style?: Record<string, any>;
  onClick?: (_event: any) => void;
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

// 使用枚举替代原来的 EValueMode
export { EValueMode };

export type TExpression = boolean | number | undefined | string;

export interface IModeCondition {
  mode: EValueMode;
  condition: TExpression | string[];
}

export type TValueCondition = boolean | number | string | undefined | IModeCondition;

// 状态管理相关类型
export interface IComponentState {
  [key: string]: any;
}

// 事件处理器类型
export interface IEventHandler {
  type?: string;
  action: string;
  payload?: any;
  target?: string; // 目标组件ID
  delay?: number; // 执行前延迟（毫秒）
  waitAfter?: number; // 执行后等待时间（毫秒）
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

// 重新导出常用的枚举和类型（向后兼容）
export { EEventExecutionMode };
export type { TEventExecutionMode };
