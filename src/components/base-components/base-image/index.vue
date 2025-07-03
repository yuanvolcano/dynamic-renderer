<script setup lang="ts">
import { IBaseComponentProps } from '@/types/component';

defineOptions({
  name: 'BaseImage',
});

// 图片组件属性
export interface IProps extends IBaseComponentProps {
  src: string;
  alt?: string;
  mode?: string;
}

withDefaults(defineProps<IProps>(), {
  src: '',
  alt: '',
  mode: 'aspectFit',
});

const emit = defineEmits<{
  load: [];
  error: [];
}>();

const handleLoad = () => {
  emit('load');
};

const handleError = () => {
  emit('error');
};
</script>

<template>
  <image class="base-image" :src="src" :mode="mode" @load="handleLoad" @error="handleError" />
</template>

<style lang="scss" scoped>
.base-image {
  border-radius: 4rpx;
}
</style>
