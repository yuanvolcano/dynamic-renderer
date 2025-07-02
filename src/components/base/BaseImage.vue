<template>
  <image
    class="base-image"
    :style="imageStyle"
    :src="src"
    :mode="mode"
    @load="handleLoad"
    @error="handleError"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ImageProps } from '@/types/component'

interface Props extends ImageProps {}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  alt: '',
  mode: 'aspectFit'
})

const emit = defineEmits<{
  load: []
  error: []
}>()

const imageStyle = computed(() => {
  return {
    display: 'block',
    width: '100%',
    height: 'auto',
    ...props.style
  }
})

const handleLoad = () => {
  emit('load')
}

const handleError = () => {
  emit('error')
}
</script>

<style scoped>
.base-image {
  border-radius: 4rpx;
}
</style>
