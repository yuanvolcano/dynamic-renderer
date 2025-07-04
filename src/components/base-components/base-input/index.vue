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
}

interface IProps extends IInputProps {
  modelValue?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  placeholder: '请输入',
  disabled: false,
  type: 'text',
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
    class="base-input"
    :class="{ disabled: disabled }"
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
  box-sizing: border-box;
  outline: none;
  height: 80rpx;
  padding: 20rpx;
  border-radius: 8rpx;
  border: 2rpx solid #e5e5e5;
  font-size: 28rpx;
  background-color: #fff;
  color: #333;

  &.disabled {
    background-color: #f5f5f5;
    color: #999;
  }

  &:focus {
    border-color: #007aff;
  }
}
</style>
