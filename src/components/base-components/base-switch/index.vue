<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'BaseSwitch' });

interface IProps {
  modelValue: boolean;
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

const switchStyle = computed(() => {
  return {
    ...(props.cssStyle || {}),
  };
});

const handleChange = (e: any) => {
  emits('update:modelValue', e.detail.value);
};
</script>

<template>
  <switch
    :checked="modelValue"
    :disabled="disabled"
    :class="['base-switch', cssClass || '']"
    :style="switchStyle"
    @change="handleChange"
  />
</template>

<style lang="scss" scoped>
.base-switch {
  /* 基础样式可以在这里定义 */
}
</style>
