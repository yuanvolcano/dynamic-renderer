<script setup lang="ts">
import { ref } from 'vue';

import pngNotPic from '@/assets/images/not-pic.png';
import { IBaseComponentProps } from '@/types/component';

defineOptions({
  name: 'BaseImage',
});

// 图片组件属性
interface IProps extends IBaseComponentProps {
  src: string;
  alt?: string;
  mode?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  src: '',
  alt: '',
  mode: 'aspectFit',
});

const isLoading = ref(true);

const innerSrc = ref(props.src);

const emits = defineEmits<{
  load: [];
  error: [];
}>();

const handleLoad = () => {
  isLoading.value = false;
  emits('load');
};

const handleError = (e: any) => {
  // 加一个时间戳，解决缓存导致的图片加载失败问题
  if (innerSrc.value.includes('try_again')) {
    innerSrc.value = pngNotPic;
  } else {
    innerSrc.value = `${innerSrc.value}?try_again=${Date.now()}`;
  }
  isLoading.value = false;
  emits('error');
};
</script>

<template>
  <image
    v-loading="isLoading"
    class="base-image"
    :src="innerSrc"
    :mode="mode"
    @load="handleLoad"
    @error="handleError"
  />
</template>

<style lang="scss" scoped>
.base-image {
  border-radius: 4rpx;
}
</style>
