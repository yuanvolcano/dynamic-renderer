<script setup lang="ts">
import { ref, watch } from 'vue';

defineOptions({ name: 'BaseSelect' });

interface Option {
  label: string;
  value: string | number;
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

const selectedIndex = ref(0);

watch(
  () => props.modelValue,
  val => {
    const idx = props.options.findIndex(item => item.value === val);
    selectedIndex.value = idx === -1 ? 0 : idx;
  },
  { immediate: true }
);

const handleChange = (e: any) => {
  const idx = e.detail.value;
  emits('update:modelValue', props.options[idx]?.value);
};
</script>
<template>
  <picker range-key="label" :value="selectedIndex" :range="props.options" :disabled="disabled" @change="handleChange">
    <slot>
      <view>{{ props.options[selectedIndex]?.label || '请选择' }}</view>
    </slot>
  </picker>
</template>
