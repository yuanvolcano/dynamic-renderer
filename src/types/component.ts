// 组件配置接口
export interface IComponentConfig {
  id: string;
  componentName: string;
  props?: Record<string, any>;
  style?: Record<string, any>;
  class?: string;
  children?: IComponentConfig[];
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
