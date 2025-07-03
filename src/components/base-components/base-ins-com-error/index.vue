<script setup lang="ts">
defineOptions({
  name: 'BaseInsComError',
});
</script>

<template>
  <view class="error-container">
    <text class="error-text">组件加载失败</text>
  </view>
</template>

<style scoped>
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx;
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 8rpx;
}

.error-text {
  color: #ff4d4f;
  font-size: 24rpx;
}
</style>
