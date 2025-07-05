<script setup lang="ts">
import { computed, CSSProperties } from 'vue';

import { IBaseComponentProps } from '@/types/component';

defineOptions({
  name: 'BaseText',
});

// 文本组件属性
export interface IProps extends IBaseComponentProps {
  content: string;
  fontSize?: string;
  color?: string;
  cssClass?: string;
  cssStyle?: CSSProperties;
}

const props = withDefaults(defineProps<IProps>(), {
  content: '',
  fontSize: '28rpx',
  color: '#333',
  cssClass: '',
  cssStyle: () => ({}),
});

const textStyle = computed(() => {
  return {
    fontSize: props.fontSize,
    color: props.color,
    ...(props.cssStyle || {}),
  };
});

console.log('~~ BaseText', props.text)
</script>

<template>
  <text class="base-text" :class="cssClass" :style="textStyle">
    {{ content }}
  </text>
</template>

<style lang="scss" scoped>
.base-text {
  display: block;
  word-wrap: break-word;
}
</style>
