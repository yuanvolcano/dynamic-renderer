<template>
  <input
    class="base-input"
    :style="inputStyle"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :type="inputType"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { IBaseComponentProps } from '@/types/component';

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

const emit = defineEmits<{
  'update:modelValue': [value: string];
  focus: [];
  blur: [];
}>();

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
  return {
    padding: '20rpx',
    borderRadius: '8rpx',
    border: '2rpx solid #e5e5e5',
    fontSize: '28rpx',
    backgroundColor: props.disabled ? '#f5f5f5' : '#fff',
    color: props.disabled ? '#999' : '#333',
    ...props.style,
  };
});

const handleInput = (event: any) => {
  const value = event.target.value || event.detail.value;
  emit('update:modelValue', value);
};

const handleFocus = () => {
  emit('focus');
};

const handleBlur = () => {
  emit('blur');
};
</script>

<style scoped>
.base-input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  outline: none;
}

.base-input:focus {
  border-color: #007aff;
}
</style>