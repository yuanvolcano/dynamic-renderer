<script setup lang="ts">
import { layoutConfig as staticLayoutConfig } from './config';

import { ConfigPageContainer, createConfigPageProps } from '@/pages/components';

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
  <ConfigPageContainer v-bind="configProps" />
</template>
