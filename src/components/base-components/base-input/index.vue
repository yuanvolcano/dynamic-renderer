<script setup lang="ts">
import { computed } from 'vue';

import { IBaseComponentProps } from '@/types/component';

defineOptions({
  name: 'BaseInput',
});

// 输入框组件属性
export interface IInputProps extends IBaseComponentProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'number' | 'password';
  cssClass?: string;
  cssStyle?: Record<string, any>;
}

interface IProps extends IInputProps {
  modelValue?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  placeholder: '请输入',
  disabled: false,
  type: 'text',
  cssClass: '',
  cssStyle: () => ({}),
});

const emits = defineEmits<{
  'update:modelValue': [value: string];
  focus: [value: string];
  blur: [value: string];
}>();

const innerValue = defineModel<string>('modelValue');

const inputType = computed(() => {
  // uniapp 中的 input type 映射
  const typeMap = {
    text: 'text',
    number: 'number',
    password: 'password',
  };
  return typeMap[props.type] || 'text';
});

const inputStyle = computed(() => {
  const baseStyle = {
    boxSizing: 'border-box',
    height: '80rpx',
    padding: '20rpx',
    borderRadius: '8rpx',
    border: '2rpx solid #e5e5e5',
    fontSize: '28rpx',
    backgroundColor: props.disabled ? '#f5f5f5' : '#fff',
    color: props.disabled ? '#999' : '#333',
  };

  return {
    ...baseStyle,
    ...(props.cssStyle || {}),
  };
});

const handleValueUpdate = (event: any) => {
  console.log('handleValueUpdate', event, innerValue.value);
  emits('update:modelValue', event.target.value || event.detail.value);
};

const handleFocus = () => {
  emits('focus', innerValue.value || '');
};

const handleBlur = () => {
  emits('blur', innerValue.value || '');
};
</script>

<template>
  <input
    v-model="innerValue"
    :class="['base-input', { disabled: disabled }, cssClass || '']"
    :style="inputStyle"
    :placeholder="placeholder"
    :disabled="disabled"
    :type="inputType"
    @input="handleValueUpdate"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<style lang="scss" scoped>
.base-input {
  display: block;
  outline: none;

  &.disabled {
    cursor: not-allowed;
  }

  &:focus {
    border-color: #007aff;
  }
}
</style>
