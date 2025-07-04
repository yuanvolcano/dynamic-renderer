/**
 * 系统枚举常量定义
 * 集中管理所有枚举值，避免魔法字符串
 */

// 事件执行模式枚举
export enum EEventExecutionMode {
  /** 并行执行（默认） - 所有事件处理器同时开始执行 */
  PARALLEL = 'parallel',
  /** 顺序执行 - 事件处理器按顺序执行，等待前一个完成后再执行下一个 */
  SEQUENTIAL = 'sequential',
}

// 组件显示模式枚举
export enum EValueMode {
  /** 读取模式 - 直接读取值 */
  READ = 'read',
  /** 解析模式 - 解析表达式 */
  PARSE = 'parse',
}

// 事件动作类型枚举
export enum EEventAction {
  /** 更新状态 */
  UPDATE_STATE = 'updateState',
  /** 更新模型值 */
  UPDATE_MODEL_VALUE = 'update:modelValue',
  /** 触发事件 */
  EMIT = 'emit',
  /** 导航 */
  NAVIGATE = 'navigate',
  /** 返回 */
  NAVIGATE_BACK = 'navigateBack',
  /** 显示提示 */
  SHOW_TOAST = 'showToast',
  /** 自定义动作 */
  CUSTOM = 'custom',
}

// 按钮类型枚举
export enum EButtonType {
  /** 主要按钮 */
  PRIMARY = 'primary',
  /** 默认按钮 */
  DEFAULT = 'default',
  /** 警告按钮 */
  WARN = 'warn',
  /** 文本按钮 */
  TEXT = 'text',
}

// 按钮尺寸枚举
export enum EButtonSize {
  /** 小尺寸 */
  SMALL = 'small',
  /** 默认尺寸 */
  DEFAULT = 'default',
  /** 大尺寸 */
  LARGE = 'large',
}

// 输入框类型枚举
export enum EInputType {
  /** 文本 */
  TEXT = 'text',
  /** 数字 */
  NUMBER = 'number',
  /** 密码 */
  PASSWORD = 'password',
  /** 电话号码 */
  TEL = 'tel',
  /** 邮箱 */
  EMAIL = 'email',
  /** URL */
  URL = 'url',
  /** 搜索 */
  SEARCH = 'search',
}

// 调试样式枚举
export enum EDebugStyle {
  /** 无调试信息 */
  NONE = 'none',
  /** 基础调试信息 */
  BASIC = 'basic',
  /** 高级调试信息 */
  ADVANCED = 'advanced',
}

// 页面预设类型枚举
export enum EPagePreset {
  /** 默认预设 */
  DEFAULT = 'default',
  /** 布局预设 */
  LAYOUT = 'layout',
  /** 表单预设 */
  FORM = 'form',
}

// 加载状态枚举
export enum ELoadingState {
  /** 加载中 */
  LOADING = 'loading',
  /** 加载成功 */
  SUCCESS = 'success',
  /** 加载失败 */
  ERROR = 'error',
  /** 空闲状态 */
  IDLE = 'idle',
}

// 组件渲染状态枚举
export enum ERenderState {
  /** 未渲染 */
  NOT_RENDERED = 'not-rendered',
  /** 渲染中 */
  RENDERING = 'rendering',
  /** 渲染完成 */
  RENDERED = 'rendered',
  /** 渲染错误 */
  ERROR = 'error',
}

// 导出所有枚举的联合类型
export type TEventExecutionMode = EEventExecutionMode;
export type TValueMode = EValueMode;
export type TEventAction = EEventAction;
export type TButtonType = EButtonType;
export type TButtonSize = EButtonSize;
export type TInputType = EInputType;
export type TDebugStyle = EDebugStyle;
export type TPagePreset = EPagePreset;
export type TLoadingState = ELoadingState;
export type TRenderState = ERenderState;
