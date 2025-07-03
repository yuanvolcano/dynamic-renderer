<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue';

import { BaseContainer } from '@/components/base-components';
import { useDynamicUIContext } from '@/hooks/use-dynamic-ui';
import useInstallCom from '@/hooks/use-install-com';
import { IComponentConfig, IModeCondition } from '@/types/component';

defineOptions({
  name: 'DynamicRenderer',
});

interface IProps {
  config: IComponentConfig[] | IComponentConfig;
}

const props = defineProps<IProps>();

const { installCom } = useInstallCom();
const dynamicContext = useDynamicUIContext();

const componentMap = shallowRef<Record<string, any>>({});

const getCurrentComponent = (componentName: string) => {
  return componentMap.value[componentName] || BaseContainer;
};

// 深度遍历收集componentName并去重
const collectComponentNames = (config: IComponentConfig[] | IComponentConfig): string[] => {
  const componentNames = new Set<string>();

  const traverse = (item: IComponentConfig) => {
    if (item.componentName && !componentNames.has(item.componentName)) {
      componentNames.add(item.componentName);
    }

    if (item.children && item.children.length > 0) {
      item.children.forEach(child => traverse(child));
    }
  };

  if (Array.isArray(config)) {
    config.forEach(item => traverse(item));
  } else {
    traverse(config);
  }

  return Array.from(componentNames);
};

// 处理数据绑定
const getBindingValue = (binding: IModeCondition | string, componentId: string) => {
  // 如果是字符串类型的简单绑定
  if (typeof binding === 'string') {
    if (binding.startsWith('$$.')) {
      return dynamicContext.getStateValue(binding.replace('$$.', ''));
    } else if (binding.startsWith('$.')) {
      return dynamicContext.getStateValue(binding.replace('$.', ''), componentId);
    }
    return binding;
  }

  // 如果是 IModeCondition 类型的复杂绑定
  const condition = binding.condition;
  if (typeof condition === 'string') {
    if (condition.startsWith('$$.')) {
      return dynamicContext.getStateValue(condition.replace('$$.', ''));
    } else if (condition.startsWith('$.')) {
      return dynamicContext.getStateValue(condition.replace('$.', ''), componentId);
    }
  }
  return condition;
};

// 构建组件属性
const buildComponentProps = (config: IComponentConfig) => {
  const props = { ...config.props };

  // 处理数据绑定
  if (config.bindings) {
    Object.entries(config.bindings).forEach(([propName, binding]) => {
      props[propName] = getBindingValue(binding, config.id);
    });
  }

  return props;
};

// 合并样式
const mergedStyle = computed(() => {
  if (Array.isArray(props.config)) {
    return {};
  }
  const baseStyle = {};
  const configStyle = props.config.props?.style || {};
  return { ...baseStyle, ...configStyle };
});

// 处理事件
const handleEvent = (eventType: string, $event: any, config: IComponentConfig) => {
  if (!config.events || !config.events[eventType]) {
    return;
  }

  const handlers = Array.isArray(config.events[eventType])
    ? (config.events[eventType] as any[])
    : [config.events[eventType]];

  handlers.forEach(handler => {
    dynamicContext.handleEvent(eventType, handler, config.id);
  });
};

// 处理点击事件
const handleClick = (event: any, config: IComponentConfig) => {
  // 处理原有的onClick
  if (!Array.isArray(props.config) && config.props?.onClick) {
    config.props.onClick();
  }

  // 处理新的事件系统
  handleEvent('click', event, config);
};

// 监听config变化，收集 componentName 和初始化状态
watch(
  () => props.config,
  newConfig => {
    const componentNames = collectComponentNames(newConfig);
    console.log('收集到的组件名称:', componentNames);

    // 初始化配置（状态和事件）
    dynamicContext.initializeConfig(newConfig);

    // 动态加载组件
    if (componentNames.length > 0) {
      const result = installCom(componentNames);
      componentMap.value = result.dynamicComponents;
      if (result.loadFailedList.length > 0) {
        console.warn('加载失败的组件:', result.loadFailedList);
      }
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <!-- 支持数组和单个配置 -->
  <template v-if="Array.isArray(config)">
    <DynamicRenderer v-for="item in config" :key="item.id" :config="item" />
  </template>
  <component
    v-else
    :is="getCurrentComponent(config.componentName)"
    v-bind="buildComponentProps(config)"
    :style="mergedStyle"
    @click="($event: any) => handleClick($event, config)"
    @update:modelValue="$event => handleEvent('update:modelValue', $event, config)"
    @change="$event => handleEvent('change', $event, config)"
    @focus="$event => handleEvent('focus', $event, config)"
    @blur="$event => handleEvent('blur', $event, config)"
  >
    <template v-if="config.children">
      <DynamicRenderer v-for="child in config.children" :key="child.id" :config="child" />
    </template>
  </component>
</template>

<style scoped>
/* 动态渲染器本身不需要特殊样式 */
</style>
