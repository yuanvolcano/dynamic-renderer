<script setup lang="ts">
defineOptions({
  name: 'BaseInsComLoading',
});
</script>

<template>
  <view class="loading-container">
    <text class="loading-text">加载中...</text>
  </view>
</template>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx;
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 8rpx;
}

.loading-text {
  color: #586069;
  font-size: 24rpx;
}
</style>
