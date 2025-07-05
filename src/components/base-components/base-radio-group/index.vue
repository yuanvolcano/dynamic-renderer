<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'BaseRadioGroup' });

interface Option {
  label: string | number;
  value: string | number;
  disabled?: boolean;
}

interface IProps {
  modelValue: string | number;
  options: Option[];
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

const groupStyle = computed(() => {
  return {
    ...(props.cssStyle || {}),
  };
});

const handleChange = (e: any) => {
  emits('update:modelValue', e.detail.value);
};
</script>

<template>
  <radio-group
    :value="modelValue"
    :class="['base-radio-group', cssClass || '']"
    :style="groupStyle"
    @change="handleChange"
  >
    <label
      v-for="item in options"
      :key="item.value"
      class="radio-item"
      :class="{ disabled: item.disabled || disabled }"
    >
      <radio :value="item.value" :checked="modelValue === item.value" :disabled="item.disabled || disabled" />
      {{ item.label }}
    </label>
  </radio-group>
</template>

<style lang="scss" scoped>
.base-radio-group {
  display: flex;
  flex-direction: column;
  gap: 12rpx;

  .radio-item {
    display: flex;
    align-items: center;
    gap: 8rpx;
    cursor: pointer;

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
