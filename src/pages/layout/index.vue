<script setup lang="ts">
import { layoutConfig as staticLayoutConfig } from './config';

import { ConfigPageContainer, createConfigPageProps } from '@/components/dynamic-renderer/config-page-container';
import DynamicRenderer from '@/components/dynamic-renderer/index.vue';

defineOptions({
  name: 'LayoutPage',
});

// 使用工具函数创建配置
const configProps = createConfigPageProps(
  'layout',
  staticLayoutConfig,
  'https://api.example.com/layout-config' // 可选的远程配置URL
);
</script>

<template>
  <!-- #ifdef MP-WEIXIN -->
  <DynamicRenderer :config="staticLayoutConfig" />
  <!-- #endif -->

  <!-- #ifdef H5 -->
  <ConfigPageContainer v-bind="configProps" />
  <!-- #endif -->
</template>
