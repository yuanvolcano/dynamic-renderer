<template>
  <text class="base-text" :style="textStyle">
    {{ content }}
  </text>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IBaseComponentProps } from '@/types/component';

// 文本组件属性
export interface IProps extends IBaseComponentProps {
  content: string;
  fontSize?: string;
  color?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  content: '',
  fontSize: '28rpx',
  color: '#333',
});

const textStyle = computed(() => {
  return {
    fontSize: props.fontSize,
    color: props.color,
    ...props.style,
  };
});
</script>

<style scoped>
.base-text {
  display: block;
  word-wrap: break-word;
}
</style>