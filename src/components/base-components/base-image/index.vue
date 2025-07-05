<script setup lang="ts">
import { computed, ref } from 'vue';

import pngNotPic from '@/static/images/not-pic.png';
import { IBaseComponentProps } from '@/types/component';

defineOptions({
  name: 'BaseImage',
});

// 图片组件属性
interface IProps extends IBaseComponentProps {
  src: string;
  alt?: string;
  mode?: string;
  cssClass?: string;
  cssStyle?: Record<string, any>;
}

const props = withDefaults(defineProps<IProps>(), {
  src: '',
  alt: '',
  mode: 'aspectFit',
  cssClass: '',
  cssStyle: () => ({}),
});

const isLoading = ref(true);

const innerSrc = ref(props.src);

const emits = defineEmits<{
  load: [];
  error: [];
}>();

const imageStyle = computed(() => {
  return {
    borderRadius: '4rpx',
    ...(props.cssStyle || {}),
  };
});

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
    :class="['base-image', cssClass || '']"
    :style="imageStyle"
    :src="innerSrc"
    :mode="mode"
    @load="handleLoad"
    @error="handleError"
  />
</template>

<style lang="scss" scoped>
.base-image {
  /* 基本样式移至计算属性中 */
}
</style>
