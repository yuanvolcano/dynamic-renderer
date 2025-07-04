<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { layoutConfig as staticLayoutConfig } from './config';

import { ConfigLoaderResponse, loadConfigFromLocal, loadConfigFromNetwork } from '@/api/config-loader';
import DynamicRenderer from '@/components/dynamic-renderer/index.vue';
import { IComponentConfig } from '@/types/component';
import { isDevelopment } from '@/utils/common';

// 配置加载状态
const loading = ref(false);
const error = ref<string>('');
const layoutConfig = ref<IComponentConfig[]>([]);

// 环境检查
const isDevelopmentBol = isDevelopment();

/**
 * 从网络加载配置
 */
async function loadRemoteConfig(): Promise<void> {
  loading.value = true;
  error.value = '';

  try {
    // 尝试从网络加载配置
    const result: ConfigLoaderResponse<IComponentConfig[]> = await loadConfigFromNetwork(
      'https://api.example.com/layout-config', // 实际的配置API地址
      {
        timeout: 5000,
        retries: 2,
        cache: true,
        cacheTime: 10 * 60 * 1000, // 10分钟缓存
      }
    );

    if (result.success && result.data) {
      console.log('成功从网络加载配置');
      layoutConfig.value = result.data;
    } else {
      throw new Error(result.message || '网络配置加载失败');
    }
  } catch (networkError: any) {
    console.warn('网络配置加载失败，使用本地配置:', networkError.message);
    error.value = `网络加载失败: ${networkError.message}`;

    // 网络加载失败时，使用本地配置作为fallback
    await loadLocalConfig();
  } finally {
    loading.value = false;
  }
}

/**
 * 加载本地配置（作为fallback或开发模式使用）
 */
async function loadLocalConfig(): Promise<void> {
  try {
    console.log('使用本地配置');
    const result = await loadConfigFromLocal(staticLayoutConfig, 500); // 模拟500ms网络延迟

    if (result.success && result.data) {
      layoutConfig.value = result.data;
      if (!error.value) {
        error.value = ''; // 清空错误信息
      }
    } else {
      throw new Error(result.message || '本地配置加载失败');
    }
  } catch (localError: any) {
    console.error('本地配置加载失败:', localError.message);
    error.value = `配置加载失败: ${localError.message}`;

    // 作为最后的fallback，直接使用静态配置
    layoutConfig.value = staticLayoutConfig;
  }
}

/**
 * 重新加载配置
 */
async function reloadConfig(): Promise<void> {
  await loadRemoteConfig();
}

/**
 * 强制使用本地配置
 */
async function useLocalConfig(): Promise<void> {
  loading.value = true;
  error.value = '';

  try {
    await loadLocalConfig();
  } finally {
    loading.value = false;
  }
}

// 页面挂载时加载配置
onMounted(async () => {
  // 开发环境优先使用本地配置，生产环境优先使用网络配置
  if (isDevelopmentBol) {
    console.log('开发模式：使用本地配置');
    await useLocalConfig();
  } else {
    console.log('生产模式：尝试网络配置');
    await loadRemoteConfig();
  }
});
</script>

<template>
  <view class="layout-page">
    <!-- 加载状态 -->
    <view v-if="loading" class="loading-overlay">
      <view class="loading-content">
        <text class="loading-text">配置加载中...</text>
      </view>
    </view>

    <!-- 错误状态 -->
    <view v-else-if="error && layoutConfig.length === 0" class="error-overlay">
      <view class="error-content">
        <text class="error-title">配置加载失败</text>
        <text class="error-message">{{ error }}</text>
        <view class="error-actions">
          <button class="retry-btn" @click="reloadConfig">重新加载</button>
          <button class="local-btn" @click="useLocalConfig">使用本地配置</button>
        </view>
      </view>
    </view>

    <!-- 正常渲染 -->
    <template v-else>
      <!-- 错误提示（有配置但存在错误） -->
      <view v-if="error" class="error-banner">
        <text class="error-banner-text">{{ error }}</text>
        <button class="error-banner-close" @click="error = ''">×</button>
      </view>

      <!-- 配置化布局渲染 -->
      <DynamicRenderer :config="layoutConfig" />

      <!-- 开发调试工具 -->
      <view v-if="isDevelopmentBol" class="debug-tools">
        <button class="debug-btn" @click="reloadConfig">🔄 重新加载</button>
        <button class="debug-btn" @click="useLocalConfig">📁 本地配置</button>
        <text class="debug-info">配置项: {{ layoutConfig.length }}</text>
      </view>
    </template>
  </view>
</template>

<style lang="scss" scoped>
.layout-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  background: white;
  border-radius: 12rpx;
  padding: 60rpx 80rpx;
  text-align: center;
}

.loading-text {
  font-size: 32rpx;
  color: #333;
}

.error-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.error-content {
  background: white;
  border-radius: 16rpx;
  padding: 80rpx 60rpx;
  text-align: center;
  max-width: 600rpx;
  margin: 0 40rpx;
}

.error-title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 20rpx;
}

.error-message {
  display: block;
  font-size: 28rpx;
  color: #666;
  margin-bottom: 40rpx;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 20rpx;
  justify-content: center;
}

.retry-btn,
.local-btn {
  flex: 1;
  padding: 20rpx 40rpx;
  border: none;
  border-radius: 8rpx;
  font-size: 28rpx;
  cursor: pointer;
}

.retry-btn {
  background-color: #3498db;
  color: white;

  &:active {
    background-color: #2980b9;
  }
}

.local-btn {
  background-color: #95a5a6;
  color: white;

  &:active {
    background-color: #7f8c8d;
  }
}

.error-banner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ffc107;
  color: #856404;
  padding: 20rpx 40rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
}

.error-banner-text {
  flex: 1;
  font-size: 24rpx;
}

.error-banner-close {
  background: none;
  border: none;
  font-size: 36rpx;
  color: #856404;
  cursor: pointer;
  padding: 0;
  margin-left: 20rpx;
}

.debug-tools {
  position: fixed;
  bottom: 20rpx;
  right: 20rpx;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12rpx;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
  z-index: 1000;
}

.debug-btn {
  background: #007aff;
  color: white;
  border: none;
  border-radius: 6rpx;
  padding: 10rpx 20rpx;
  font-size: 24rpx;
  cursor: pointer;

  &:active {
    background: #0051d5;
  }
}

.debug-info {
  font-size: 20rpx;
  color: white;
  text-align: center;
}
</style>
