<script setup lang="ts">
import { computed, onBeforeMount, shallowRef } from 'vue';

import DynamicUIRenderer from './ui-renderer/index.vue';

import { useDynamicContext } from '@/hooks/use-dynamic-context';
import useInstallCom from '@/hooks/use-install-com';
import { IComponentConfig } from '@/types/component';

defineOptions({
  name: 'DynamicRenderer',
});

interface IProps {
  config: IComponentConfig[] | IComponentConfig;
}

const props = defineProps<IProps>();

const { installCom } = useInstallCom();
const dynamicContext = useDynamicContext();
const { utils: dynamicContextUtils } = dynamicContext;

const componentMap = shallowRef<Record<string, any>>({});

const getCurrentComponent = (componentName: string) => {
  return componentMap.value[componentName] || 'text';
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

// 规范化配置数据为数组格式
const normalizedConfigs = computed(() => {
  return Array.isArray(props.config) ? props.config : [props.config];
});

function init() {
  const componentNames = collectComponentNames(props.config);
  console.log('收集到的组件名称:', componentNames);

  // 初始化配置（状态和事件）
  dynamicContextUtils.init(props.config);

  console.log('~~ componentStates', dynamicContext.componentStates);

  // 动态加载组件
  if (componentNames.length > 0) {
    const result = installCom(componentNames);
    componentMap.value = result.dynamicComponents;
    if (result.loadFailedList.length > 0) {
      console.warn('加载失败的组件:', result.loadFailedList);
    }
  }
}

onBeforeMount(() => {
  init();
});
</script>

<template>
  <template v-for="config in normalizedConfigs" :key="config.id">
    <DynamicUIRenderer :config="config" :getCurrentComponent="getCurrentComponent" :dynamic-context="dynamicContext" />
  </template>
</template>

<style lang="scss" scoped>
/* 上层组件不需要特殊样式 */
</style>
