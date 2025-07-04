<script setup lang="ts">
import { computed } from 'vue';

import { IBaseComponentProps } from '@/types/component';

defineOptions({
  name: 'BaseContainer',
});

// 容器组件属性
export interface IProps extends IBaseComponentProps {
  useFlex?: boolean;
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
}

const props = withDefaults(defineProps<IProps>(), {
  useFlex: true,
  direction: 'column',
  justify: 'flex-start',
  align: 'stretch',
});

const containerStyle = computed(() => {
  if (props.useFlex) {
    return {
      display: 'flex',
      flexDirection: props.direction,
      justifyContent: props.justify,
      alignItems: props.align,
      ...props.style,
    };
  }
  if (props.style) {
    return {
      ...props.style,
    };
  }

  return {};
});
</script>

<template>
  <view class="base-container" :style="containerStyle">
    <slot />
  </view>
</template>

<style lang="scss" scoped>
.base-container {
  box-sizing: border-box;
}
</style>
