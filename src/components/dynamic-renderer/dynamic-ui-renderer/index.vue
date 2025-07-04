<script setup lang="ts">
import { computed, watch } from 'vue';

import { IDynamicContextReturn } from '@/hooks/use-dynamic-context';
import { IComponentConfig, TValueCondition } from '@/types/component';
import { parseModeValue } from '@/utils/parse-expression';

defineOptions({
  name: 'DynamicUIRenderer',
});

interface IProps {
  config: IComponentConfig;
  getCurrentComponent: (componentName: string) => string;
  dynamicContext: IDynamicContextReturn;
}

const props = defineProps<IProps>();

// 处理数据绑定
const getBindingValue = (binding: TValueCondition) => {
  return parseModeValue(
    binding,
    props.dynamicContext.componentStates,
    props.dynamicContext.globalState,
    props.dynamicContext.utils.createParseContext()
  );
};

// 构建组件属性
const buildComponentProps = (config: IComponentConfig) => {
  const componentProps = { ...config.props };

  // 移除 class 和 style 属性，单独处理
  Reflect.deleteProperty(componentProps, 'class');
  Reflect.deleteProperty(componentProps, 'style');

  // 处理数据绑定
  if (config.bindings) {
    Object.entries(config.bindings).forEach(([propName, binding]) => {
      // 跳过 class 和 style 的绑定，单独处理
      if (propName !== 'class' && propName !== 'style') {
        componentProps[propName] = getBindingValue(binding);
      }
    });
  }

  return componentProps;
};

// 处理 class 属性
const mergedClass = computed(() => {
  let classNames = '';

  // 处理静态 class
  if (props.config.props?.class) {
    classNames += props.config.props.class;
  }

  // 处理绑定的 class
  if (props.config.bindings?.class) {
    const boundClass = getBindingValue(props.config.bindings.class);
    if (boundClass) {
      classNames += (classNames ? ' ' : '') + boundClass;
    }
  }

  return classNames;
});

// 合并样式
const mergedStyle = computed(() => {
  let styles = {};

  // 处理静态 style
  if (props.config.props?.style) {
    styles = { ...styles, ...props.config.props.style };
  }

  // 处理绑定的 style
  if (props.config?.bindings?.style) {
    const boundStyle = getBindingValue(props.config.bindings.style);
    if (boundStyle && typeof boundStyle === 'object') {
      styles = { ...styles, ...boundStyle };
    }
  }

  return styles;
});

// 获取当前组件的模型值
const modelValue = computed(() => {
  return props.dynamicContext.componentStates[props.config.id];
});

// 处理事件
const handleEvent = (eventType: string, $event: any, config: IComponentConfig) => {
  console.log('~~ handleEvent', eventType, $event, config);
  if (!config.events || !config.events[eventType]) {
    return;
  }

  const handlers = Array.isArray(config.events[eventType])
    ? (config.events[eventType] as any[])
    : [config.events[eventType]];

  handlers.forEach(handler => {
    props.dynamicContext.utils.handleEvent(handler, config.id);
  });
};

// 处理点击事件
const handleClick = (event: any, config: IComponentConfig) => {
  // 处理原有的onClick
  if (config.props?.onClick) {
    config.props.onClick();
  }

  // 处理新的事件系统
  handleEvent('click', event, config);
};

// 处理模型值更新
const handleUpdateModelValue = (event: any, config: IComponentConfig) => {
  props.dynamicContext.utils.handleEvent(
    { action: 'update:modelValue', payload: { path: config.id, value: event } },
    config.id
  );
};

// 判断组件是否可见
const isVisible = computed(() => {
  if (props.config.visibleOption === void 0) {
    return true;
  }

  return props.dynamicContext.utils.isComponentVisible(props.config);
});

// 监听显隐变化，处理默认值重置
watch(
  () => isVisible.value,
  (newVisible: boolean, oldVisible: boolean) => {
    // 只有从显示变为隐藏时才处理默认值重置
    if (oldVisible === true && newVisible === false) {
      props.dynamicContext.utils.handleVisibilityChange(props.config, newVisible);
    }
  },
  { immediate: false } // 不立即执行，避免初始化时误触发
);
</script>

<template>
  <!-- 根据 visibleOption 控制组件显隐 -->
  <component
    v-if="isVisible"
    :is="getCurrentComponent(config.componentName)"
    v-bind="buildComponentProps(config)"
    :modelValue="modelValue"
    :style="mergedStyle"
    :class="mergedClass"
    @click="($event: any) => handleClick($event, config)"
    @update:modelValue="($event: any) => handleUpdateModelValue($event, config)"
    @change="($event: any) => handleEvent('change', $event, config)"
    @focus="($event: any) => handleEvent('focus', $event, config)"
    @blur="($event: any) => handleEvent('blur', $event, config)"
  >
    <!-- 递归渲染子组件 -->
    <template v-if="config.children">
      <DynamicUIRenderer
        v-for="child in config.children"
        :key="child.id"
        :config="child"
        :getCurrentComponent="getCurrentComponent"
        :dynamic-context="dynamicContext"
      />
    </template>
  </component>
</template>

<style lang="scss" scoped>
/* 底层UI渲染器不需要特殊样式 */
</style>
