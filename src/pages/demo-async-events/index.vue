<script setup lang="ts">
import { asyncEventsTestConfig } from './config';

import { ConfigPageContainer, createConfigPageProps } from '@/pages/components';

defineOptions({
  name: 'AsyncEventsTestPage',
});

// 创建配置
const configProps = createConfigPageProps('default', asyncEventsTestConfig, undefined, {
  pageTitle: '异步事件处理测试',
  pageBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  loadingText: '加载异步事件测试...',
  debugStyle: 'advanced',
  localLoadDelay: 100,
});
</script>

<template>
  <ConfigPageContainer v-bind="configProps" />
</template>
