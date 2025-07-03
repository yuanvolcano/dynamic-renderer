<script setup lang="ts">
import { ref } from 'vue';

import { provideDynamicUIContext } from '@/hooks/use-dynamic-ui';
import { EValueMode, IComponentConfig } from '@/types/component';

// 提供动态UI上下文
provideDynamicUIContext({
  userInfo: {
    name: '',
    email: '',
    age: 0,
  },
  formData: {},
  counter: 0,
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
          content: '$$.counter', // 绑定到全局状态
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
              value: '$$.counter + 1', // 表达式
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
            payload: {
              mode: EValueMode.PARSE,
              condition: '$$$.context.updateState("counter", Math.max(0, $$$.context.getStateValue("counter") - 1))',
            },
            type: 'click',
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
          modelValue: '$.name',
        },
        events: {
          input: {
            action: 'updateState',
            payload: {
              path: 'name',
              value: '$event.target.value',
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
          modelValue: '$.email',
        },
        events: {
          input: {
            action: 'updateState',
            payload: {
              path: 'email',
              value: '$event.target.value',
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
                data: '$local',
              },
              type: 'click',
            },
            {
              action: 'showToast',
              payload: {
                title: '表单已提交',
                icon: 'success',
              },
              type: 'click',
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

const goToLayout = () => {
  console.log('~~ goToLayout');
  uni.navigateTo({
    url: '/pages/layout/layout',
  });
};
</script>

<template>
  <view class="container">
    <!-- 测试 Tailwind CSS 的简单测试元素 -->
    <view class="bg-blue-500 text-white p-4 mb-4 rounded-lg">
      <text class="text-xl font-bold">Tailwind CSS 测试</text>
      <text class="block text-sm mt-2">如果你看到蓝色背景和白色文字，说明 Tailwind CSS 已生效！</text>
    </view>

    <view class="actions">
      <button class="action-btn primary" @click="addComponent">添加组件</button>
      <button class="action-btn default" @click="loadPreset">加载预设</button>
      <button class="action-btn layout" @click="goToLayout">布局展示</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
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

  &.primary {
    background-color: #007aff;
    color: #fff;
  }

  &.default {
    background-color: #f8f8f8;
    color: #333;
    border: 1rpx solid #e5e5e5;
  }

  &.layout {
    background-color: #28a745;
    color: #fff;
  }
}
</style>
