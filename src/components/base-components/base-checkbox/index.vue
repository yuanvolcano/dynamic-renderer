<script setup lang="ts">
defineOptions({ name: 'BaseCheckbox' });

interface IProps {
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
}

withDefaults(defineProps<IProps>(), {
  label: '',
  disabled: false,
});

const emits = defineEmits(['update:modelValue']);

const handleChange = (e: any) => {
  emits('update:modelValue', e.detail.value.includes('checked'));
};
</script>
<template>
  <label>
    <checkbox :value="'checked'" :checked="modelValue" :disabled="disabled" @change="handleChange" />
    <slot>{{ label }}</slot>
  </label>
</template>
