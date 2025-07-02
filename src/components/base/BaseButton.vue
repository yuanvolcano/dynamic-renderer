<template>
  <button
    class="base-button"
    :style="buttonStyle"
    :disabled="disabled"
    @click="handleClick"
  >
    <text v-if="loading">加载中...</text>
    <text v-else>{{ text }}</text>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from '@/types/component'

interface Props extends ButtonProps {}

const props = withDefaults(defineProps<Props>(), {
  text: '按钮',
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  click: []
}>()

const buttonStyle = computed(() => {
  return {
    padding: '20rpx 40rpx',
    borderRadius: '8rpx',
    border: 'none',
    backgroundColor: props.disabled ? '#f5f5f5' : '#007aff',
    color: props.disabled ? '#999' : '#fff',
    fontSize: '28rpx',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    ...props.style
  }
})

const handleClick = () => {
  if (!props.disabled && !props.loading) {
    emit('click')
    if (props.onClick) {
      props.onClick()
    }
  }
}
</script>

<style scoped>
.base-button {
  display: inline-block;
  text-align: center;
  transition: all 0.3s ease;
}

.base-button:active {
  opacity: 0.8;
}
</style>
