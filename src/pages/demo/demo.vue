<script setup lang="ts">
import { ref } from 'vue';
import DynamicRenderer from '@/components/dynamic-renderer/index.vue';
import { IComponentConfig } from '@/types/component';
import { BaseContainer, BaseText, BaseButton, BaseInput, BaseImage } from '@/components/base-components';
import { provideDynamicUIContext, useGlobalState, useEventBus } from '@/hooks/use-dynamic-ui';

// 提供动态UI上下文
const context = provideDynamicUIContext({
  userInfo: {
    name: '',
    email: '',
    age: 0,
  },
  formData: {},
  counter: 0,
});

const { state: globalState, updateState, getState } = useGlobalState();
const eventBus = useEventBus();

// 监听全局事件
eventBus.on('formSubmit', (data) => {
  console.log('Form submitted:', data);
  uni.showToast({
    title: '表单提交成功！',
    icon: 'success',
  });
});

eventBus.on('counterChange', (value) => {
  updateState('counter', value);
});

const demoComponents = ref<IComponentConfig[]>([
  {
    id: 'state-demo',
    componentName: 'BaseContainer',
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
        id: 'counter-display',
        componentName: 'BaseText',
        props: {
          content: '计数器',
          style: { fontSize: '32rpx', marginBottom: '10rpx' },
        },
        bindings: {
          content: '$global.counter', // 绑定到全局状态
        },
      },
      {
        id: 'increment-btn',
        componentName: 'BaseButton',
        props: {
          text: '增加',
          style: { marginRight: '10rpx' },
        },
        events: {
          click: {
            action: 'updateState',
            payload: {
              path: 'counter',
              value: '{{$global.counter + 1}}', // 表达式
            },
          },
        },
      },
      {
        id: 'decrement-btn',
        componentName: 'BaseButton',
        props: {
          text: '减少',
        },
        events: {
          click: {
            action: 'custom',
            payload: (context, componentId) => {
              const currentValue = context.getStateValue('counter');
              context.updateState('counter', Math.max(0, currentValue - 1));
            },
          },
        },
      },
    ],
  },
  {
    id: 'form-demo',
    componentName: 'BaseContainer',
    props: {
      style: {
        padding: '20rpx',
        backgroundColor: '#f9f9f9',
        borderRadius: '16rpx',
      },
    },
    state: {
      name: '',
      email: '',
    },
    children: [
      {
        id: 'form-title',
        componentName: 'BaseText',
        props: {
          content: '用户信息表单',
          style: { fontSize: '36rpx', fontWeight: 'bold', marginBottom: '20rpx' },
        },
      },
      {
        id: 'name-input',
        componentName: 'BaseInput',
        props: {
          placeholder: '请输入姓名',
          style: { marginBottom: '15rpx' },
        },
        bindings: {
          modelValue: '$local.name',
        },
        events: {
          input: {
            action: 'updateState',
            payload: {
              path: 'name',
              value: '{{$event.target.value}}',
            },
            target: 'form-demo',
          },
        },
      },
      {
        id: 'email-input',
        componentName: 'BaseInput',
        props: {
          placeholder: '请输入邮箱',
          style: { marginBottom: '20rpx' },
        },
        bindings: {
          modelValue: '$local.email',
        },
        events: {
          input: {
            action: 'updateState',
            payload: {
              path: 'email',
              value: '{{$event.target.value}}',
            },
            target: 'form-demo',
          },
        },
      },
      {
        id: 'submit-btn',
        componentName: 'BaseButton',
        props: {
          text: '提交表单',
        },
        events: {
          click: [
            {
              action: 'emit',
              payload: {
                event: 'formSubmit',
                data: '{{$local}}',
              },
            },
            {
              action: 'showToast',
              payload: {
                title: '表单已提交',
                icon: 'success',
              },
            },
          ],
        },
      },
    ],
  },
]);

const addComponent = () => {
  const newComponent: IComponentConfig = {
    id: `demo-${Date.now()}`,
    componentName: 'BaseText',
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
  const preset: IComponentConfig = {
    id: 'preset-form',
    componentName: 'BaseContainer',
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
        componentName: 'BaseText',
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
        componentName: 'BaseInput',
        props: {
          placeholder: '请输入内容',
          style: {
            marginBottom: '20rpx',
          },
        },
      },
      {
        id: 'form-button',
        componentName: 'BaseButton',
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

<template>
  <view class="container">
    <view class="header">
      <text class="title">状态管理和事件系统演示</text>
      <text class="subtitle">展示动态UI的状态绑定和事件处理</text>
    </view>

    <view class="demo-section">
      <!-- 显示全局状态 -->
      <view class="state-display">
        <text>全局计数器: {{ globalState.counter }}</text>
      </view>

      <!-- 动态渲染的组件区域 -->
      <DynamicRenderer v-for="component in demoComponents" :key="component.id" :config="component" />
    </view>

    <view class="actions">
      <button class="action-btn primary" @click="addComponent">添加组件</button>
      <button class="action-btn default" @click="loadPreset">加载预设</button>
    </view>
  </view>
</template>

<style scoped>
.container {
  padding: 40rpx;
}

.header {
  text-align: center;
  margin-bottom: 30rpx;
}

.title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.subtitle {
  display: block;
  font-size: 28rpx;
  color: #666;
}

.state-display {
  padding: 20rpx;
  background-color: #e8f4fd;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}

.demo-section {
  margin-bottom: 60rpx;
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
