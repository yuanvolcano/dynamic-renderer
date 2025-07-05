<script setup lang="ts">
import { computed, CSSProperties } from 'vue';

import { IBaseComponentProps } from '@/types/component';

defineOptions({
  name: 'BaseButton',
});

export interface IProps extends IBaseComponentProps {
  text: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'primary' | 'default' | 'warning' | 'success' | 'danger';
  size?: 'mini' | 'small' | 'medium' | 'large';
  cssClass?: string;
  cssStyle?: CSSProperties;
}

const props = withDefaults(defineProps<IProps>(), {
  text: '按钮',
  size: 'medium',
  disabled: false,
  loading: false,
  type: 'default',
  cssClass: '',
  cssStyle: () => ({}),
});

console.log('~~ BaseButton', props);

const emits = defineEmits<{
  click: [event: any];
}>();

// 尺寸配置
const sizeConfig = {
  mini: {
    padding: '8rpx 16rpx',
    fontSize: '22rpx',
    minHeight: '56rpx',
  },
  small: {
    padding: '12rpx 24rpx',
    fontSize: '24rpx',
    minHeight: '64rpx',
  },
  medium: {
    padding: '16rpx 32rpx',
    fontSize: '28rpx',
    minHeight: '72rpx',
  },
  large: {
    padding: '20rpx 40rpx',
    fontSize: '32rpx',
    minHeight: '80rpx',
  },
};

// 类型配置
const typeConfig = {
  default: {
    backgroundColor: '#ffffff',
    color: '#333333',
    border: '1rpx solid #d9d9d9',
    hoverBg: '#f5f5f5',
  },
  primary: {
    backgroundColor: '#1890ff',
    color: '#ffffff',
    border: 'none',
    hoverBg: '#40a9ff',
  },
  success: {
    backgroundColor: '#52c41a',
    color: '#ffffff',
    border: 'none',
    hoverBg: '#73d13d',
  },
  warning: {
    backgroundColor: '#faad14',
    color: '#ffffff',
    border: 'none',
    hoverBg: '#ffc53d',
  },
  danger: {
    backgroundColor: '#ff4d4f',
    color: '#ffffff',
    border: 'none',
    hoverBg: '#ff7875',
  },
};

const buttonStyle = computed(() => {
  const currentSize = sizeConfig[props.size];
  const currentType = typeConfig[props.type];

  return {
    ...currentSize,
    backgroundColor: props.disabled ? '#f5f5f5' : currentType.backgroundColor,
    color: props.disabled ? '#bfbfbf' : currentType.color,
    border: props.disabled ? '1rpx solid #d9d9d9' : currentType.border,
    borderRadius: '6rpx',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    opacity: props.disabled ? 0.6 : 1,
    transition: 'all 0.3s ease',
    ...props.cssStyle,
  };
});

const buttonClass = computed(() => {
  const classes = ['base-button'];
  if (props.disabled) classes.push('base-button--disabled');
  if (props.loading) classes.push('base-button--loading');
  classes.push(`base-button--${props.type}`);
  classes.push(`base-button--${props.size}`);
  return classes.join(' ');
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
  <button
    :class="[buttonClass, cssClass ? cssClass : '']"
    :style="buttonStyle"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <view v-if="loading" class="button-loading">
      <text class="loading-text">加载中...</text>
    </view>
    <text v-else class="button-text">{{ text }}</text>
  </button>
</template>

<style lang="scss" scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  outline: none;
  user-select: none;
  position: relative;
  overflow: hidden;

  &:active:not(.base-button--disabled) {
    transform: translateY(1rpx);
  }

  &--disabled {
    cursor: not-allowed !important;
    pointer-events: none;
  }

  &--loading {
    pointer-events: none;
  }

  // 类型样式
  &--primary {
    &:hover:not(.base-button--disabled):not(.base-button--loading) {
      background-color: #40a9ff;
    }
  }

  &--success {
    &:hover:not(.base-button--disabled):not(.base-button--loading) {
      background-color: #73d13d;
    }
  }

  &--warning {
    &:hover:not(.base-button--disabled):not(.base-button--loading) {
      background-color: #ffc53d;
    }
  }

  &--danger {
    &:hover:not(.base-button--disabled):not(.base-button--loading) {
      background-color: #ff7875;
    }
  }

  &--default {
    &:hover:not(.base-button--disabled):not(.base-button--loading) {
      background-color: #f5f5f5;
      border-color: #40a9ff;
    }
  }
}

.button-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
}

.loading-text,
.button-text {
  line-height: 1;
  font-weight: 500;
}

// 响应式设计
@media (max-width: 768px) {
  .base-button {
    &--large {
      min-height: 88rpx;
      padding: 24rpx 48rpx;
    }

    &--medium {
      min-height: 80rpx;
      padding: 20rpx 40rpx;
    }
  }
}
</style>
