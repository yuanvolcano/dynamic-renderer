<script setup lang="ts">
import { ref } from 'vue';

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const features = ref<Feature[]>([
  {
    id: 1,
    icon: '🔧',
    title: '统一UI数据格式',
    description: '通用的JSON格式描述UI结构',
  },
  {
    id: 2,
    icon: '📱',
    title: '跨平台支持',
    description: '同时支持H5和微信小程序',
  },
  {
    id: 3,
    icon: '🔄',
    title: '动态渲染',
    description: '支持动态加载和实时更新UI',
  },
  {
    id: 4,
    icon: '🧩',
    title: '组件化架构',
    description: '可复用的预定义组件系统',
  },
]);

const navigateToDemo = () => {
  uni.navigateTo({
    url: '/pages/demo/demo',
  });
};

const loadDynamicUI = () => {
  uni.showToast({
    title: '功能开发中...',
    icon: 'none',
  });
};
</script>

<template>
  <view class="container">
    <view class="header">
      <text class="title">基于 Vue3 + uniapp 的跨平台动态UI解决方案</text>
    </view>

    <view class="features">
      <view v-for="feature in features" :key="feature.id" class="feature-item">
        <view class="feature-icon">{{ feature.icon }}</view>
        <view class="feature-content">
          <text class="feature-title">{{ feature.title }}</text>
          <text class="feature-desc">{{ feature.description }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  padding: 40rpx;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
}

.title {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.subtitle {
  display: block;
  font-size: 28rpx;
  color: #666;
}

.features {
  margin-bottom: 60rpx;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  padding: 30rpx;
  margin-bottom: 30rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 40rpx;
  margin-right: 30rpx;
  margin-top: 10rpx;
}

.feature-content {
  flex: 1;
}

.feature-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.feature-desc {
  display: block;
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.action-btn {
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
}
</style>
