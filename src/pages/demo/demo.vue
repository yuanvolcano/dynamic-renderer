<template>
  <view class="container">
    <view class="header">
      <text class="title">组件演示</text>
      <text class="subtitle">展示跨平台动态UI组件</text>
    </view>

    <view class="demo-section">
      <text class="section-title">基础组件</text>

      <!-- 动态渲染的组件区域 -->
      <view class="component-container">
        <DynamicRenderer
          v-for="component in demoComponents"
          :key="component.id"
          :config="component"
        />
      </view>
    </view>

    <view class="actions">
      <button class="action-btn primary" @click="addComponent">添加组件</button>
      <button class="action-btn default" @click="loadPreset">加载预设</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DynamicRenderer from '@/components/DynamicRenderer.vue';

interface ComponentConfig {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: ComponentConfig[];
}

const demoComponents = ref<ComponentConfig[]>([
  {
    id: 'demo-1',
    type: 'container',
    props: {
      style: {
        padding: '20rpx',
        backgroundColor: '#fff',
        borderRadius: '16rpx',
        marginBottom: '20rpx',
      },
    },
    children: [
      {
        id: 'demo-1-text',
        type: 'text',
        props: {
          content: '这是一个动态渲染的文本组件',
          style: {
            fontSize: '32rpx',
            color: '#333',
          },
        },
      },
    ],
  },
  {
    id: 'demo-2',
    type: 'button',
    props: {
      text: '动态按钮',
      onClick: () => {
        uni.showToast({
          title: '按钮被点击了！',
          icon: 'success',
        });
      },
      style: {
        marginBottom: '20rpx',
      },
    },
  },
]);

const addComponent = () => {
  const newComponent: ComponentConfig = {
    id: `demo-${Date.now()}`,
    type: 'text',
    props: {
      content: `新组件 ${new Date().toLocaleTimeString()}`,
      style: {
        fontSize: '28rpx',
        color: '#666',
        marginBottom: '10rpx',
      },
    },
  };
  demoComponents.value.push(newComponent);
};

const loadPreset = () => {
  // 加载预设的复杂UI结构
  const preset: ComponentConfig = {
    id: 'preset-form',
    type: 'container',
    props: {
      style: {
        padding: '30rpx',
        backgroundColor: '#fff',
        borderRadius: '16rpx',
        marginBottom: '20rpx',
      },
    },
    children: [
      {
        id: 'form-title',
        type: 'text',
        props: {
          content: '动态表单示例',
          style: {
            fontSize: '36rpx',
            fontWeight: 'bold',
            marginBottom: '20rpx',
          },
        },
      },
      {
        id: 'form-input',
        type: 'input',
        props: {
          placeholder: '请输入内容',
          style: {
            marginBottom: '20rpx',
          },
        },
      },
      {
        id: 'form-button',
        type: 'button',
        props: {
          text: '提交',
          onClick: () => {
            uni.showToast({
              title: '表单提交成功！',
              icon: 'success',
            });
          },
        },
      },
    ],
  };

  demoComponents.value.push(preset);
};
</script>

<style scoped>
.container {
  padding: 40rpx;
}

.header {
  text-align: center;
  margin-bottom: 40rpx;
}

.title {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.subtitle {
  display: block;
  font-size: 28rpx;
  color: #666;
}

.demo-section {
  margin-bottom: 60rpx;
}

.section-title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
}

.component-container {
  min-height: 200rpx;
}

.actions {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  flex: 1;
  font-size: 32rpx;
  border-radius: 12rpx;
  padding: 20rpx;
  border: none;
}

.action-btn.primary {
  background-color: #007aff;
  color: #fff;
}

.action-btn.default {
  background-color: #f8f8f8;
  color: #333;
  border: 1rpx solid #e5e5e5;
}
</style>
