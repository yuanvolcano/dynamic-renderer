<script setup lang="ts">
import { computed } from 'vue';
import { IBaseComponentProps } from '@/types/component';

// 容器组件属性
export interface IProps extends IBaseComponentProps {
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
}

const props = withDefaults(defineProps<IProps>(), {
  direction: 'column',
  justify: 'flex-start',
  align: 'stretch',
});

const containerStyle = computed(() => {
  return {
    display: 'flex',
    flexDirection: props.direction,
    justifyContent: props.justify,
    alignItems: props.align,
    ...props.style,
  };
});
</script>

<template>
  <view class="base-container" :style="containerStyle">
    <slot />
  </view>
</template>

<style scoped>
.base-container {
  box-sizing: border-box;
}
</style>