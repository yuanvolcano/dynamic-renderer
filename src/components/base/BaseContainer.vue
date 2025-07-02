<template>
  <view class="base-container" :style="containerStyle">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ContainerProps } from '@/types/component'

interface Props extends ContainerProps {}

const props = withDefaults(defineProps<Props>(), {
  direction: 'column',
  justify: 'flex-start',
  align: 'stretch'
})

const containerStyle = computed(() => {
  return {
    display: 'flex',
    flexDirection: props.direction,
    justifyContent: props.justify,
    alignItems: props.align,
    ...props.style
  }
})
</script>

<style scoped>
.base-container {
  box-sizing: border-box;
}
</style>
