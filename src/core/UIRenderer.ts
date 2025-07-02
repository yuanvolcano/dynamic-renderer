import type { ComponentConfig, DynamicUISchema } from '@/types/component';

/**
 * 动态UI渲染器核心类
 * 负责解析和管理动态UI配置
 */
export class UIRenderer {
  private components: Map<string, ComponentConfig> = new Map();
  private schema: DynamicUISchema | null = null;

  /**
   * 加载UI Schema
   * @param schema 动态UI配置数据
   */
  loadSchema(schema: DynamicUISchema): void {
    this.schema = schema;
    this.components.clear();

    // 预处理组件，建立组件映射
    this.preprocessComponents(schema.components);
  }

  /**
   * 预处理组件，建立ID映射关系
   * @param components 组件配置数组
   */
  private preprocessComponents(components: ComponentConfig[]): void {
    components.forEach(component => {
      this.components.set(component.id, component);

      // 递归处理子组件
      if (component.children) {
        this.preprocessComponents(component.children);
      }
    });
  }

  /**
   * 根据ID获取组件配置
   * @param id 组件ID
   * @returns 组件配置或undefined
   */
  getComponent(id: string): ComponentConfig | undefined {
    return this.components.get(id);
  }

  /**
   * 获取根组件列表
   * @returns 根组件配置数组
   */
  getRootComponents(): ComponentConfig[] {
    return this.schema?.components || [];
  }

  /**
   * 验证组件配置的有效性
   * @param config 组件配置
   * @returns 验证结果
   */
  validateComponent(config: ComponentConfig): boolean {
    // 基础验证
    if (!config.id || !config.type) {
      return false;
    }

    // 验证子组件
    if (config.children) {
      return config.children.every(child => this.validateComponent(child));
    }

    return true;
  }

  /**
   * 克隆组件配置（深拷贝）
   * @param config 原始组件配置
   * @returns 克隆的组件配置
   */
  cloneComponent(config: ComponentConfig): ComponentConfig {
    return JSON.parse(JSON.stringify(config));
  }

  /**
   * 更新组件配置
   * @param id 组件ID
   * @param updates 更新的属性
   */
  updateComponent(id: string, updates: Partial<ComponentConfig>): void {
    const component = this.components.get(id);
    if (component) {
      Object.assign(component, updates);
      this.components.set(id, component);
    }
  }

  /**
   * 添加新组件
   * @param component 组件配置
   * @param parentId 父组件ID（可选）
   */
  addComponent(component: ComponentConfig, parentId?: string): void {
    if (!this.validateComponent(component)) {
      throw new Error('Invalid component configuration');
    }

    this.components.set(component.id, component);

    if (parentId) {
      const parent = this.components.get(parentId);
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(component);
      }
    } else if (this.schema) {
      this.schema.components.push(component);
    }
  }

  /**
   * 删除组件
   * @param id 组件ID
   */
  removeComponent(id: string): void {
    const component = this.components.get(id);
    if (!component) return;

    // 从父组件的children中移除
    if (this.schema) {
      this.removeFromParent(this.schema.components, id);
    }

    // 递归删除子组件
    if (component.children) {
      component.children.forEach(child => {
        this.removeComponent(child.id);
      });
    }

    this.components.delete(id);
  }

  /**
   * 从父组件数组中移除指定ID的组件
   * @param components 组件数组
   * @param targetId 目标组件ID
   */
  private removeFromParent(components: ComponentConfig[], targetId: string): boolean {
    for (let i = 0; i < components.length; i++) {
      if (components[i].id === targetId) {
        components.splice(i, 1);
        return true;
      }

      if (components[i].children) {
        if (this.removeFromParent(components[i].children!, targetId)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * 导出当前UI配置
   * @returns 完整的UI Schema
   */
  exportSchema(): DynamicUISchema | null {
    return this.schema;
  }

  /**
   * 清空所有组件
   */
  clear(): void {
    this.components.clear();
    this.schema = null;
  }
}
