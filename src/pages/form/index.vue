<script setup lang="ts">
import { formDemoConfig as staticFormConfig } from './config';

import { ConfigPageContainer, createConfigPageProps } from '@/components/dynamic-renderer/config-page-container';
import DynamicRenderer from '@/components/dynamic-renderer/index.vue';

defineOptions({
  name: 'FormPage',
});

// 使用工具函数创建配置
const configProps = createConfigPageProps(
  'form',
  staticFormConfig,
  'https://api.example.com/form-config' // 可选的远程配置URL
);
</script>

<template>
  <!-- #ifdef MP-WEIXIN -->
  <DynamicRenderer :config="staticFormConfig" />
  <!-- #endif -->

  <!-- #ifdef H5 -->
  <ConfigPageContainer v-bind="configProps" />
  <!-- #endif -->
</template>
