<script setup lang="ts">
defineOptions({ name: 'BaseTextarea' });

interface IProps {
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  placeholder: '请输入',
  disabled: false,
});

const emits = defineEmits(['update:modelValue']);

const handleInput = (e: any) => {
  emits('update:modelValue', e.detail.value);
};
</script>
<template>
  <textarea
    class="base-textarea"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="handleInput"
  />
</template>
<style scoped>
.base-textarea {
  width: 100%;
  min-height: 80rpx;
  border: 2rpx solid #e5e5e5;
  border-radius: 8rpx;
  padding: 20rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}
</style>
