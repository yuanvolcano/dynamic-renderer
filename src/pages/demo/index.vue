<script setup lang="ts">
import { demoConfig } from './config';

import { ConfigPageContainer, createConfigPageProps } from '@/components/dynamic-renderer/config-page-container';

defineOptions({
  name: 'DemoPage',
});

// 使用工具函数创建配置
const configProps = createConfigPageProps(
  'default',
  demoConfig,
  undefined, // 暂无远程配置
  {
    pageTitle: '动态UI渲染系统演示',
    loadingText: '系统初始化中...',
    debugStyle: 'simple',
    localLoadDelay: 100,
  }
);

console.log('~~ configProps', configProps);
</script>

<template>
  <ConfigPageContainer v-bind="configProps" />
</template>

<style lang="scss" scoped></style>
