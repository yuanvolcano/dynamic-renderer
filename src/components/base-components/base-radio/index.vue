<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'BaseRadio' });

interface IProps {
  modelValue: string | number;
  label: string | number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
});

const emits = defineEmits(['update:modelValue']);

const checked = computed(() => props.modelValue === props.label);

const handleChange = (e: any) => {
  emits('update:modelValue', props.label);
};
</script>
<template>
  <label>
    <radio :value="label" :checked="checked" :disabled="disabled" @change="handleChange" />
    <slot>{{ label }}</slot>
  </label>
</template>
