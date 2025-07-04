<script setup lang="ts">
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
}

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
});

const emits = defineEmits(['update:modelValue']);

const handleChange = (e: any) => {
  emits('update:modelValue', e.detail.value);
};
</script>
<template>
  <radio-group :value="modelValue" @change="handleChange">
    <label v-for="item in options" :key="item.value">
      <radio :value="item.value" :checked="modelValue === item.value" :disabled="item.disabled || disabled" />
      {{ item.label }}
    </label>
  </radio-group>
</template>
