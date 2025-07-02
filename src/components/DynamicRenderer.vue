<template>
  <component :is="renderComponent" v-bind="config.props" :style="mergedStyle" @click="handleClick">
    <template v-if="config.children">
      <DynamicRenderer v-for="child in config.children" :key="child.id" :config="child" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, defineComponent, h } from 'vue';
import { ComponentConfig } from '@/types/component';

// 导入基础组件
import BaseContainer from './base/BaseContainer.vue';
import BaseText from './base/BaseText.vue';
import BaseButton from './base/BaseButton.vue';
import BaseInput from './base/BaseInput.vue';
import BaseImage from './base/BaseImage.vue';

interface Props {
  config: ComponentConfig;
}

const props = defineProps<Props>();

// 组件映射表
const componentMap = {
  container: BaseContainer,
  text: BaseText,
  button: BaseButton,
  input: BaseInput,
  image: BaseImage,
};

// 计算当前要渲染的组件
const renderComponent = computed(() => {
  const componentType = props.config.type as keyof typeof componentMap;
  return componentMap[componentType] || BaseContainer;
});

// 合并样式
const mergedStyle = computed(() => {
  const baseStyle = {};
  const configStyle = props.config.props?.style || {};
  return { ...baseStyle, ...configStyle };
});

// 处理点击事件
const handleClick = () => {
  if (props.config.props?.onClick) {
    props.config.props.onClick();
  }
};
</script>

<style scoped>
/* 动态渲染器本身不需要特殊样式 */
</style>
