<template>
  <view class="router-demo">
    <view class="router-demo__title">🧭 路由导航演示</view>
    <view class="router-demo__info">
      <view class="info-item">
        <text class="info-label">路由模式:</text>
        <text class="info-value">{{ routerMode }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">当前路径:</text>
        <text class="info-value">{{ currentRoute }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">浏览器URL:</text>
        <text class="info-value">{{ browserUrl }}</text>
      </view>
    </view>

    <view class="router-demo__buttons">
      <view class="button-group">
        <text class="group-title">Tab页面切换</text>
        <button class="nav-button primary" @click="goToHome">
          🏠 首页
        </button>
        <button class="nav-button primary" @click="goToDemo">
          🎨 演示页
        </button>
      </view>

      <view class="button-group">
        <text class="group-title">History 导航测试</text>
        <button class="nav-button secondary" @click="testHistoryPush">
          Push 导航
        </button>
        <button class="nav-button secondary" @click="testHistoryReplace">
          Replace 导航
        </button>
        <button class="nav-button warning" @click="goBack">
          ⬅️ 返回上页
        </button>
      </view>

      <view class="button-group">
        <text class="group-title">带参数导航</text>
        <button class="nav-button info" @click="navigateWithQuery">
          📝 带参数跳转
        </button>
        <button class="nav-button info" @click="showCurrentQuery">
          🔍 显示当前参数
        </button>
      </view>
    </view>

    <view v-if="showDebugInfo" class="debug-info">
      <view class="debug-title">🐛 调试信息</view>
      <view class="debug-content">
        <view class="debug-item">页面栈: {{ pageStack.length }} 层</view>
        <view class="debug-item">完整路径: {{ fullRoute }}</view>
        <view class="debug-item">URL参数: {{ JSON.stringify(urlParams) }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  navigateTo,
  navigateBack,
  switchTab,
  getCurrentRoute,
  getCurrentRouteWithQuery,
  parseUrlQuery,
  buildUrl,
  ROUTES,
  smartNavigate
} from '@/utils/router'
import { envConfig } from '@/utils/env'

const currentRoute = ref('')
const fullRoute = ref('')
const urlParams = ref({})
const pageStack = ref<any[]>([])
const browserUrl = ref('')

const routerMode = computed(() => {
  // #ifdef H5
  // 动态检测实际的路由模式
  const hasHash = window.location.href.includes('#/')
  return hasHash ? 'hash (检测到#/)' : 'history (无#/)'
  // #endif
  // #ifdef MP-WEIXIN
  return 'miniprogram'
  // #endif
  return 'unknown'
})

const showDebugInfo = computed(() => envConfig.isDev)

// 更新路由信息
const updateRouteInfo = () => {
  currentRoute.value = getCurrentRoute()
  fullRoute.value = getCurrentRouteWithQuery()
  urlParams.value = parseUrlQuery(fullRoute.value)
  pageStack.value = getCurrentPages()

  // #ifdef H5
  browserUrl.value = window.location.pathname + window.location.search
  // #endif
  // #ifndef H5
  browserUrl.value = fullRoute.value
  // #endif
}

// Tab页面导航
const goToHome = async () => {
  try {
    await switchTab(ROUTES.HOME)
    updateRouteInfo()
  } catch (error) {
    console.error('导航到首页失败:', error)
    uni.showToast({ title: '导航失败', icon: 'error' })
  }
}

const goToDemo = async () => {
  try {
    await switchTab(ROUTES.DEMO)
    updateRouteInfo()
  } catch (error) {
    console.error('导航到演示页失败:', error)
    uni.showToast({ title: '导航失败', icon: 'error' })
  }
}

// History 模式测试
const testHistoryPush = async () => {
  try {
    const url = buildUrl(ROUTES.DEMO, {
      test: 'push',
      timestamp: Date.now()
    })
    await navigateTo({ url, mode: 'push' })
    updateRouteInfo()
    uni.showToast({ title: 'Push 导航成功', icon: 'success' })
  } catch (error) {
    console.error('Push 导航失败:', error)
    uni.showToast({ title: 'Push 导航失败', icon: 'error' })
  }
}

const testHistoryReplace = async () => {
  try {
    const url = buildUrl(ROUTES.DEMO, {
      test: 'replace',
      timestamp: Date.now()
    })
    await navigateTo({ url, mode: 'replace' })
    updateRouteInfo()
    uni.showToast({ title: 'Replace 导航成功', icon: 'success' })
  } catch (error) {
    console.error('Replace 导航失败:', error)
    uni.showToast({ title: 'Replace 导航失败', icon: 'error' })
  }
}

// 返回上页
const goBack = async () => {
  try {
    await navigateBack()
    updateRouteInfo()
  } catch (error) {
    console.error('返回失败:', error)
    uni.showToast({ title: '返回失败', icon: 'error' })
  }
}

// 带参数导航
const navigateWithQuery = async () => {
  const params = {
    userId: 123,
    type: 'test',
    from: 'router-demo',
    timestamp: Date.now()
  }

  try {
    await smartNavigate(ROUTES.DEMO, params)
    updateRouteInfo()
    uni.showToast({ title: '带参数导航成功', icon: 'success' })
  } catch (error) {
    console.error('带参数导航失败:', error)
    uni.showToast({ title: '导航失败', icon: 'error' })
  }
}

// 显示当前参数
const showCurrentQuery = () => {
  const params = parseUrlQuery(fullRoute.value)
  if (Object.keys(params).length > 0) {
    uni.showModal({
      title: '当前URL参数',
      content: JSON.stringify(params, null, 2),
      showCancel: false
    })
  } else {
    uni.showToast({ title: '当前无URL参数', icon: 'none' })
  }
}

onMounted(() => {
  updateRouteInfo()

  // 监听路由变化（仅H5）
  // #ifdef H5
  window.addEventListener('popstate', updateRouteInfo)
  // #endif
})

// 页面显示时更新信息
uni.$on('onShow', updateRouteInfo)
</script>

<style scoped>
.router-demo {
  padding: 20rpx;
  background: white;
  border-radius: 16rpx;
  margin: 20rpx;
}

.router-demo__title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 30rpx;
}

.router-demo__info {
  background: #f8f9fa;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
}

.info-item {
  display: flex;
  margin-bottom: 12rpx;
  align-items: flex-start;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  font-size: 28rpx;
  color: #666;
  width: 160rpx;
  flex-shrink: 0;
}

.info-value {
  font-size: 28rpx;
  color: #333;
  word-break: break-all;
  flex: 1;
}

.router-demo__buttons {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.group-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #555;
  margin-bottom: 8rpx;
}

.nav-button {
  padding: 24rpx 32rpx;
  border-radius: 12rpx;
  font-size: 28rpx;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-button.primary {
  background: #007aff;
  color: white;
}

.nav-button.primary:hover {
  background: #0056cc;
}

.nav-button.secondary {
  background: #6c757d;
  color: white;
}

.nav-button.secondary:hover {
  background: #545b62;
}

.nav-button.warning {
  background: #ff9500;
  color: white;
}

.nav-button.warning:hover {
  background: #cc7700;
}

.nav-button.info {
  background: #5ac8fa;
  color: white;
}

.nav-button.info:hover {
  background: #32a0db;
}

.debug-info {
  margin-top: 30rpx;
  padding: 20rpx;
  background: #f0f0f0;
  border-radius: 12rpx;
  border-left: 6rpx solid #ff9500;
}

.debug-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
}

.debug-content {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.debug-item {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}
</style>
