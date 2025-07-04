<script setup lang="ts">
import { formDemoConfig as staticFormConfig } from './config';

import { ConfigPageContainer, createConfigPageProps } from '@/pages/components';

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
  <ConfigPageContainer v-bind="configProps" />
</template>
