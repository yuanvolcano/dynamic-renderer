<script setup lang="ts">
import { computed, CSSProperties } from 'vue';

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
  cssClass?: string;
  cssStyle?: CSSProperties;
}

const props = withDefaults(defineProps<IProps>(), {
  useFlex: true,
  direction: 'column',
  justify: 'flex-start',
  align: 'stretch',
  cssClass: '',
  cssStyle: () => ({}),
});

const containerStyle = computed(() => {
  console.log('~~ BaseContainer containerStyle', {
    useFlex: props.useFlex,
    cssStyle: props.cssStyle,
    cssClass: props.cssClass,
  });
  if (props.useFlex) {
    return {
      display: 'flex',
      flexDirection: props.direction,
      justifyContent: props.justify,
      alignItems: props.align,
      ...props.cssStyle,
    };
  }
  if (props.cssStyle) {
    return {
      ...props.cssStyle,
    };
  }

  return {};
});

console.log('~~ BaseContainer', {
  containerStyle: containerStyle.value,
  cssClass: props.cssClass,
});
</script>

<template>
  <view :class="cssClass ? cssClass : ''" :style="containerStyle">
    <slot />
  </view>
</template>

<style lang="scss" scoped></style>
