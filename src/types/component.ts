// 组件配置接口
export interface ComponentConfig {
  id: string
  type: string
  props?: Record<string, any>
  children?: ComponentConfig[]
}

// 基础组件属性接口
export interface BaseComponentProps {
  style?: Record<string, any>
  onClick?: () => void
}

// 文本组件属性
export interface TextProps extends BaseComponentProps {
  content: string
  fontSize?: string
  color?: string
}

// 按钮组件属性
export interface ButtonProps extends BaseComponentProps {
  text: string
  disabled?: boolean
  loading?: boolean
}

// 输入框组件属性
export interface InputProps extends BaseComponentProps {
  value?: string
  placeholder?: string
  disabled?: boolean
  type?: 'text' | 'number' | 'password'
}

// 图片组件属性
export interface ImageProps extends BaseComponentProps {
  src: string
  alt?: string
  mode?: string
}

// 容器组件属性
export interface ContainerProps extends BaseComponentProps {
  direction?: 'row' | 'column'
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch'
}

// 组件类型枚举
export enum ComponentType {
  CONTAINER = 'container',
  TEXT = 'text',
  BUTTON = 'button',
  INPUT = 'input',
  IMAGE = 'image'
}

// 动态UI数据结构
export interface DynamicUISchema {
  version: string
  components: ComponentConfig[]
  metadata?: {
    title?: string
    description?: string
    author?: string
    createTime?: string
    updateTime?: string
  }
}
