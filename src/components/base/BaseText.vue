<template>
  <text class="base-text" :style="textStyle">
    {{ content }}
  </text>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TextProps } from '@/types/component'

interface Props extends TextProps {}

const props = withDefaults(defineProps<Props>(), {
  content: '',
  fontSize: '28rpx',
  color: '#333'
})

const textStyle = computed(() => {
  return {
    fontSize: props.fontSize,
    color: props.color,
    ...props.style
  }
})
</script>

<style scoped>
.base-text {
  display: block;
  word-wrap: break-word;
}
</style>
