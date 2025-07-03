<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue';
import { IComponentConfig } from '@/types/component';
import { BaseContainer } from '@/components/base-components';

import useInstallCom from '@/hooks/use-install-com';

defineOptions({
  name: 'DynamicRenderer',
});

interface IProps {
  config: IComponentConfig[] | IComponentConfig;
  getComponentMap?: (componentName: string) => any;
}

const props = defineProps<IProps>();

const { installCom } = useInstallCom();

const componentMap = shallowRef<Record<string, any>>({});

const getCurrentComponent = (componentName: string) => {
  // 优先使用外部传入的组件映射函数
  if (props.getComponentMap) {
    return props.getComponentMap(componentName);
  }
  // 否则使用内部动态加载的组件
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

// 合并样式
const mergedStyle = computed(() => {
  if (Array.isArray(props.config)) {
    return {};
  }
  const baseStyle = {};
  const configStyle = props.config.props?.style || {};
  return { ...baseStyle, ...configStyle };
});

// 处理点击事件
const handleClick = () => {
  if (!Array.isArray(props.config) && props.config.props?.onClick) {
    props.config.props.onClick();
  }
};

// 监听config变化，收集 componentName
watch(() => props.config, (newConfig) => {
  const componentNames = collectComponentNames(newConfig);
  console.log('收集到的组件名称:', componentNames);

  // 这里可以根据需要处理收集到的组件名称
  // 比如动态加载这些组件
  if (componentNames.length > 0) {
    const result = installCom(componentNames);
    componentMap.value = result.dynamicComponents;
    if (result.loadFailedList.length > 0) {
      console.warn('加载失败的组件:', result.loadFailedList);
    }
  }
}, { immediate: true, deep: true });
</script>

<template>
  <!-- 支持数组和单个配置 -->
  <template v-if="Array.isArray(config)">
    <DynamicRenderer
      v-for="item in config"
      :key="item.id"
      :config="item"
      :getComponentMap="getComponentMap"
    />
  </template>
  <component
    v-else
    :is="getCurrentComponent(config.componentName)"
    v-bind="config.props"
    :style="mergedStyle"
    @click="handleClick"
  >
    <template v-if="config.children">
      <DynamicRenderer
        v-for="child in config.children"
        :key="child.id"
        :config="child"
        :getComponentMap="getComponentMap"
      />
    </template>
  </component>
</template>

<style scoped>
/* 动态渲染器本身不需要特殊样式 */
</style>
