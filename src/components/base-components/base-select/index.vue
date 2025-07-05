<script setup lang="ts">
import { computed, ref, watch } from 'vue';

defineOptions({ name: 'BaseSelect' });

interface Option {
  label: string;
  value: string | number;
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

const selectedIndex = ref(0);

watch(
  () => props.modelValue,
  val => {
    const idx = props.options.findIndex(item => item.value === val);
    selectedIndex.value = idx === -1 ? 0 : idx;
  },
  { immediate: true }
);

const selectStyle = computed(() => {
  return {
    ...(props.cssStyle || {}),
  };
});

const handleChange = (e: any) => {
  const idx = e.detail.value;
  emits('update:modelValue', props.options[idx]?.value);
};
</script>

<template>
  <picker
    range-key="label"
    :value="selectedIndex"
    :range="options"
    :disabled="disabled"
    :class="['base-select', cssClass || '']"
    :style="selectStyle"
    @change="handleChange"
  >
    <slot>
      <view>{{ options[selectedIndex]?.label || '请选择' }}</view>
    </slot>
  </picker>
</template>

<style lang="scss" scoped>
.base-select {
  /* 基础样式可以在这里定义 */
}
</style>
