<script setup lang="ts">
defineOptions({ name: 'BaseSwitch' });

interface IProps {
  modelValue: boolean;
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
  <switch :checked="modelValue" :disabled="disabled" @change="handleChange" />
</template>
