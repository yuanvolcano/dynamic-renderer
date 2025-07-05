<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'BaseTextarea' });

interface IProps {
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
  cssClass?: string;
  cssStyle?: Record<string, any>;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  placeholder: '请输入',
  disabled: false,
  cssClass: '',
  cssStyle: () => ({}),
});

const emits = defineEmits(['update:modelValue']);

const textareaStyle = computed(() => {
  return {
    width: '100%',
    minHeight: '80rpx',
    border: '2rpx solid #e5e5e5',
    borderRadius: '8rpx',
    padding: '20rpx',
    fontSize: '28rpx',
    boxSizing: 'border-box',
    backgroundColor: props.disabled ? '#f5f5f5' : '#fff',
    color: props.disabled ? '#999' : '#333',
    ...(props.cssStyle || {}),
  };
});

const handleInput = (e: any) => {
  emits('update:modelValue', e.detail.value);
};
</script>

<template>
  <textarea
    :class="['base-textarea', { disabled: disabled }, cssClass || '']"
    :style="textareaStyle"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="handleInput"
  />
</template>

<style lang="scss" scoped>
.base-textarea {
  outline: none;

  &.disabled {
    cursor: not-allowed;
  }

  &:focus {
    border-color: #007aff;
  }
}
</style>
