<script setup lang="ts">
const goToLayout = () => {
  console.log('~~ goToLayout');
  uni.navigateTo({
    url: '/pages/layout/layout',
  });
};
</script>

<template>
  <view class="container">
    <view class="actions">
      <button class="action-btn layout" @click="goToLayout">布局展示</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  padding: 40rpx;
}

.header {
  text-align: center;
  margin-bottom: 30rpx;
}

.title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.subtitle {
  display: block;
  font-size: 28rpx;
  color: #666;
}

.state-display {
  padding: 20rpx;
  background-color: #e8f4fd;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}

.demo-section {
  margin-bottom: 60rpx;
}

.actions {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  flex: 1;
  font-size: 32rpx;
  border-radius: 12rpx;
  padding: 20rpx;
  border: none;

  &.primary {
    background-color: #007aff;
    color: #fff;
  }

  &.default {
    background-color: #f8f8f8;
    color: #333;
    border: 1rpx solid #e5e5e5;
  }

  &.layout {
    background-color: #28a745;
    color: #fff;
  }
}
</style>
