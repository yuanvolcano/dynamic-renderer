<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'BaseRadio' });

interface IProps {
  modelValue: string | number;
  label: string | number;
  disabled?: boolean;
  cssClass?: string;
  cssStyle?: Record<string, any>;
}

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  cssClass: '',
  cssStyle: () => ({}),
});

const emits = defineEmits(['update:modelValue']);

const checked = computed(() => props.modelValue === props.label);

const radioStyle = computed(() => {
  return {
    ...(props.cssStyle || {}),
  };
});

const handleChange = (e: any) => {
  emits('update:modelValue', props.label);
};
</script>

<template>
  <label :class="['base-radio', { disabled }, cssClass || '']" :style="radioStyle">
    <radio :value="label" :checked="checked" :disabled="disabled" @change="handleChange" />
    <slot>{{ label }}</slot>
  </label>
</template>

<style lang="scss" scoped>
.base-radio {
  display: flex;
  align-items: center;
  gap: 8rpx;
  cursor: pointer;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
