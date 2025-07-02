<template>
  <view class="env-info">
    <view class="env-info__title">🔧 环境配置信息</view>
    <view class="env-info__content">
      <view class="env-item">
        <text class="env-label">应用环境:</text>
        <text class="env-value" :class="`env-${envConfig.appEnv}`">
          {{ envConfig.appEnv }}
        </text>
      </view>
      <view class="env-item">
        <text class="env-label">应用标题:</text>
        <text class="env-value">{{ envConfig.appTitle }}</text>
      </view>
      <view class="env-item">
        <text class="env-label">应用版本:</text>
        <text class="env-value">{{ envConfig.appVersion }}</text>
      </view>
      <view class="env-item">
        <text class="env-label">API地址:</text>
        <text class="env-value">{{ envConfig.apiBaseUrl }}</text>
      </view>
      <view class="env-item">
        <text class="env-label">调试模式:</text>
        <text class="env-value" :class="envConfig.isDebugMode ? 'env-enabled' : 'env-disabled'">
          {{ envConfig.isDebugMode ? '开启' : '关闭' }}
        </text>
      </view>
      <view class="env-item">
        <text class="env-label">日志级别:</text>
        <text class="env-value">{{ envConfig.logLevel }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { envConfig } from '@/utils/env'

// 在开发环境下显示详细信息
if (envConfig.isDev) {
  console.log('📊 Environment Details:', {
    ...envConfig,
    buildTime: new Date().toISOString(),
  })
}
</script>

<style scoped>
.env-info {
  padding: 20rpx;
  margin: 20rpx;
  background: #f8f9fa;
  border-radius: 16rpx;
  border: 2rpx solid #e9ecef;
}

.env-info__title {
  font-size: 32rpx;
  font-weight: bold;
  color: #495057;
  margin-bottom: 20rpx;
  text-align: center;
}

.env-info__content {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.env-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx;
  background: white;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.env-label {
  font-size: 28rpx;
  color: #6c757d;
  font-weight: 500;
}

.env-value {
  font-size: 28rpx;
  color: #212529;
  font-weight: 600;
}

.env-development {
  color: #28a745;
  background: #d4edda;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
}

.env-test {
  color: #ffc107;
  background: #fff3cd;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
}

.env-production {
  color: #dc3545;
  background: #f8d7da;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
}

.env-enabled {
  color: #28a745;
}

.env-disabled {
  color: #6c757d;
}
</style>
