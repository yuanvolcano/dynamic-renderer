<script setup lang="ts">
import { demoAbstractConfig } from './config';

import { ConfigPageContainer, createConfigPageProps } from '@/pages/components';

defineOptions({
  name: 'DemoAbstractPage',
});

// 使用 default 预设创建配置
const configProps = createConfigPageProps(
  'default',
  demoAbstractConfig,
  undefined, // 不使用远程配置
  {
    // 自定义覆盖配置
    pageTitle: '抽象组件演示',
    pageBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    showLoadingSpinner: true,
    debugStyle: 'advanced',
    loadingText: '演示页面加载中...',
    localLoadDelay: 1000, // 1秒延迟，更好地展示加载效果
  }
);
</script>

<template>
  <ConfigPageContainer v-bind="configProps" />
</template>
