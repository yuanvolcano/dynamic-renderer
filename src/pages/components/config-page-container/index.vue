<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { IConfigPageProps } from '../types';

import { ConfigLoaderResponse, loadConfigFromLocal, loadConfigFromNetwork } from '@/api/config-loader';
import DynamicRenderer from '@/components/dynamic-renderer/index.vue';
import { IComponentConfig } from '@/types/component';
import { isDevelopment } from '@/utils/common';

const props = withDefaults(defineProps<IConfigPageProps>(), {
  remoteConfigUrl: '',
  localLoadDelay: 500,
  pageClass: 'config-page',
  pageBackground: '',
  loadingText: '配置加载中...',
  showLoadingSpinner: false,
  debugStyle: 'simple',
});

// 状态管理
const loading = ref(false);
const error = ref<string>('');
const config = ref<IComponentConfig[]>([]);

// 环境检查
const isDevelopmentBol = isDevelopment();

// 计算样式
const pageStyle = computed(() => {
  const baseStyle: Record<string, any> = {
    width: '100%',
    height: '100%',
    position: 'relative',
  };

  if (props.pageBackground) {
    baseStyle.background = props.pageBackground;
  }

  return baseStyle;
});

/**
 * 从网络加载配置
 */
async function loadRemoteConfig(): Promise<void> {
  if (!props.remoteConfigUrl) {
    console.warn(`${props.pageId}: 未提供远程配置 URL，跳过网络加载`);
    await loadLocalConfig();
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const result: ConfigLoaderResponse<IComponentConfig[]> = await loadConfigFromNetwork(props.remoteConfigUrl, {
      timeout: 5000,
      retries: 2,
      cache: true,
      cacheTime: 10 * 60 * 1000, // 10分钟缓存
    });

    if (result.success && result.data) {
      console.log(`${props.pageId}: 成功从网络加载配置`);
      config.value = result.data;
    } else {
      throw new Error(result.message || '网络配置加载失败');
    }
  } catch (networkError: any) {
    console.warn(`${props.pageId}: 网络配置加载失败，使用本地配置:`, networkError.message);
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
    console.log(`${props.pageId}: 使用本地配置`);
    const result = await loadConfigFromLocal(props.staticConfig, props.localLoadDelay);

    if (result.success && result.data) {
      config.value = result.data;
      if (!error.value) {
        error.value = ''; // 清空错误信息
      }
    } else {
      throw new Error(result.message || '本地配置加载失败');
    }
  } catch (localError: any) {
    console.error(`${props.pageId}: 本地配置加载失败:`, localError.message);
    error.value = `配置加载失败: ${localError.message}`;

    // 作为最后的fallback，直接使用静态配置
    config.value = props.staticConfig;
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

// 清除错误信息
const clearError = () => {
  error.value = '';
};

// 页面挂载时加载配置
onMounted(async () => {
  if (isDevelopmentBol) {
    console.log(`${props.pageId}: 开发模式 - 使用本地配置`);
    await useLocalConfig();
  } else {
    console.log(`${props.pageId}: 生产模式 - 尝试网络配置`);
    await loadRemoteConfig();
  }
});

// 暴露方法给父组件
defineExpose({
  reloadConfig,
  useLocalConfig,
  clearError,
  config,
  loading,
  error,
});
</script>

<template>
  <view class="config-page" :class="pageClass" :style="pageStyle">
    <!-- 加载状态 -->
    <view v-if="loading" class="loading-overlay">
      <view class="loading-content">
        <view v-if="showLoadingSpinner" class="loading-spinner"></view>
        <text class="loading-text">{{ loadingText }}</text>
      </view>
    </view>

    <!-- 错误状态 -->
    <view v-else-if="error && config.length === 0" class="error-overlay">
      <view class="error-content">
        <view class="error-icon">⚠️</view>
        <text class="error-title">{{ pageTitle }}配置加载失败</text>
        <text class="error-message">{{ error }}</text>
        <view class="error-actions">
          <button class="retry-btn" @click="reloadConfig">
            <text class="btn-icon">🔄</text>
            <text>重新加载</text>
          </button>
          <button class="local-btn" @click="useLocalConfig">
            <text class="btn-icon">📁</text>
            <text>使用本地配置</text>
          </button>
        </view>
      </view>
    </view>

    <!-- 正常渲染 -->
    <template v-else>
      <!-- 错误提示横幅（有配置但存在错误） -->
      <view v-if="error" class="error-banner">
        <view class="error-banner-content">
          <text class="error-banner-icon">⚠️</text>
          <text class="error-banner-text">{{ error }}</text>
        </view>
        <button class="error-banner-close" @click="clearError">×</button>
      </view>

      <!-- 配置化内容渲染 -->
      <DynamicRenderer :config="config" />

      <!-- 开发调试工具 -->
      <view v-if="isDevelopmentBol" :class="['debug-tools', `debug-tools--${debugStyle}`]">
        <view v-if="debugStyle === 'advanced'" class="debug-tools-title">开发工具</view>

        <view class="debug-buttons" :class="{ 'debug-buttons--advanced': debugStyle === 'advanced' }">
          <button class="debug-btn reload-btn" @click="reloadConfig">
            <text class="debug-btn-icon">🔄</text>
            <text v-if="debugStyle === 'advanced'" class="debug-btn-text">重新加载</text>
          </button>
          <button class="debug-btn local-btn" @click="useLocalConfig">
            <text class="debug-btn-icon">📁</text>
            <text v-if="debugStyle === 'advanced'" class="debug-btn-text">本地配置</text>
          </button>
        </view>

        <text class="debug-info">配置项: {{ config.length }}</text>
      </view>
    </template>

    <!-- 自定义插槽 -->
    <slot name="custom-content" :config="config" :loading="loading" :error="error"></slot>
  </view>
</template>

<style lang="scss" scoped>
.config-page {
  width: 100%;
  height: 100%;
  position: relative;
}

/* ===== 加载状态样式 ===== */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  background: white;
  border-radius: 24rpx;
  padding: 80rpx 100rpx;
  text-align: center;
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.2);

  .loading-spinner {
    width: 80rpx;
    height: 80rpx;
    border: 6rpx solid #f3f3f3;
    border-top: 6rpx solid #1890ff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 40rpx;
  }

  .loading-text {
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* ===== 错误状态样式 ===== */
.error-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 40rpx;
}

.error-content {
  background: white;
  border-radius: 32rpx;
  padding: 80rpx 60rpx;
  text-align: center;
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.2);
  max-width: 600rpx;

  .error-icon {
    font-size: 120rpx;
    margin-bottom: 40rpx;
  }

  .error-title {
    font-size: 48rpx;
    color: #333;
    font-weight: bold;
    margin-bottom: 20rpx;
    display: block;
  }

  .error-message {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 60rpx;
    display: block;
    line-height: 1.5;
  }
}

.error-actions {
  display: flex;
  gap: 30rpx;
  justify-content: center;

  button {
    padding: 24rpx 48rpx;
    border-radius: 16rpx;
    border: none;
    font-size: 28rpx;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 16rpx;
    transition: all 0.3s ease;

    .btn-icon {
      font-size: 32rpx;
    }
  }

  .retry-btn {
    background: #1890ff;
    color: white;

    &:hover {
      background: #40a9ff;
      transform: translateY(-2rpx);
    }
  }

  .local-btn {
    background: #52c41a;
    color: white;

    &:hover {
      background: #73d13d;
      transform: translateY(-2rpx);
    }
  }
}

/* ===== 错误横幅样式 ===== */
.error-banner {
  position: sticky;
  top: 0;
  background: linear-gradient(90deg, #ff6b6b, #feca57);
  color: white;
  padding: 24rpx 40rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.error-banner-content {
  display: flex;
  align-items: center;
  gap: 20rpx;

  .error-banner-icon {
    font-size: 32rpx;
  }

  .error-banner-text {
    font-size: 28rpx;
    font-weight: 500;
  }
}

.error-banner-close {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  font-size: 40rpx;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

/* ===== 调试工具样式 ===== */
.debug-tools {
  position: fixed;
  bottom: 40rpx;
  right: 40rpx;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10rpx);
  border-radius: 24rpx;
  padding: 32rpx;
  z-index: 1000;

  &--simple {
    min-width: 200rpx;

    .debug-buttons {
      display: flex;
      gap: 16rpx;
      margin-bottom: 16rpx;
    }

    .debug-btn {
      padding: 12rpx 16rpx;
      font-size: 24rpx;
    }
  }

  &--advanced {
    min-width: 300rpx;

    .debug-tools-title {
      color: white;
      font-size: 24rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
      text-align: center;
    }

    .debug-buttons--advanced {
      display: flex;
      gap: 20rpx;
      margin-bottom: 20rpx;
    }

    .debug-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8rpx;
      padding: 16rpx 20rpx;

      .debug-btn-text {
        font-size: 18rpx;
      }
    }
  }
}

.debug-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 12rpx;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2rpx);
  }

  .debug-btn-icon {
    font-size: 24rpx;
  }
}

.debug-info {
  color: rgba(255, 255, 255, 0.7);
  font-size: 20rpx;
  text-align: center;
  display: block;
}

/* ===== 响应式设计 ===== */
@media (max-width: 768px) {
  .debug-tools {
    right: 20rpx;
    bottom: 20rpx;
    padding: 24rpx;

    &--simple {
      min-width: 180rpx;
    }

    &--advanced {
      min-width: 250rpx;
    }
  }

  .error-content {
    padding: 60rpx 40rpx;
    margin: 0 20rpx;
  }

  .loading-content {
    padding: 60rpx 80rpx;
    margin: 0 40rpx;
  }
}
</style>
