<script setup lang="ts">
import { computed } from 'vue';

import { IBaseComponentProps } from '@/types/component';

defineOptions({
  name: 'BaseButton',
});

export interface IProps extends IBaseComponentProps {
  text: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'primary' | 'default' | 'warn';
  size?: 'mini' | 'default';
}

const props = withDefaults(defineProps<IProps>(), {
  text: '按钮',
  size: 'default',
  disabled: false,
  loading: false,
  type: 'primary',
});

const emits = defineEmits<{
  click: [event: any];
}>();

const buttonStyle = computed(() => {
  return {
    padding: '20rpx 40rpx',
    borderRadius: '8rpx',
    border: 'none',
    backgroundColor: props.disabled ? '#f5f5f5' : '#007aff',
    color: props.disabled ? '#999' : '#fff',
    fontSize: '28rpx',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    ...props.style,
  };
});

const handleClick = (event: any) => {
  if (props.disabled || props.loading) {
    return;
  }

  if (props.onClick) {
    props.onClick?.(event);
  } else {
    emits('click', event);
  }
};
</script>

<template>
  <button class="base-button" :style="buttonStyle" :disabled="disabled" @click="handleClick">
    <text v-if="loading">加载中...</text>
    <text v-else>{{ text }}</text>
  </button>
</template>

<style lang="scss" scoped>
.base-button {
  display: inline-block;
  text-align: center;
  transition: all 0.3s ease;

  &:active {
    opacity: 0.8;
  }
}
</style>
