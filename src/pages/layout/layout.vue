<script setup lang="ts">
import { ref } from 'vue';

import DynamicRenderer from '@/components/dynamic-renderer/index.vue';
import { provideDynamicUIContext } from '@/hooks/use-dynamic-ui';
import { EValueMode, IComponentConfig } from '@/types/component';

// 提供动态UI上下文 - 初始化状态
provideDynamicUIContext({
  user: {
    name: 'John Doe',
    avatar: '/static/avatar.png',
  },
  menu: {
    activeItem: 'dashboard',
  },
  content: {
    title: '仪表板',
    data: '这里是主要内容区域，展示了配置化布局的强大功能。',
  },
});

// 配置化的布局结构
const layoutConfig = ref<IComponentConfig[]>([
  {
    id: 'main-layout',
    componentName: 'BaseContainer',
    props: {
      style: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5f5f5',
      },
    },
    children: [
      // 红色头部区域
      {
        id: 'header',
        componentName: 'BaseContainer',
        props: {
          class: 'flex items-center justify-between px-8 py-4 bg-red-500 text-white',
          style: {
            width: '100%',
            height: '120rpx',
          },
        },
        children: [
          {
            id: 'header-title',
            componentName: 'BaseText',
            props: {
              content: '配置化布局系统',
              class: 'text-2xl font-bold',
            },
          },
          {
            id: 'user-info',
            componentName: 'BaseText',
            props: {
              class: 'text-lg',
            },
            bindings: {
              content: {
                mode: EValueMode.READ,
                condition: '$$.user.name',
              },
            },
          },
        ],
      },
      // 主体区域（包含侧边栏和内容）
      {
        id: 'main-body',
        componentName: 'BaseContainer',
        props: {
          class: 'flex flex-1 overflow-hidden',
        },
        children: [
          // 蓝色侧边栏
          {
            id: 'sidebar',
            componentName: 'BaseContainer',
            props: {
              class: 'w-48 bg-blue-600 text-white p-4',
            },
            children: [
              {
                id: 'menu-title',
                componentName: 'BaseText',
                props: {
                  content: '导航菜单',
                  class: 'text-xl font-bold mb-6',
                },
              },
              {
                id: 'menu-item-1',
                componentName: 'BaseContainer',
                props: {
                  class:
                    'p-4 mb-2 bg-white bg-opacity-10 rounded-lg cursor-pointer hover:bg-opacity-20 transition-colors',
                },
                children: [
                  {
                    id: 'menu-text-1',
                    componentName: 'BaseText',
                    props: {
                      content: '仪表板',
                      class: 'text-white text-base',
                    },
                  },
                ],
                events: {
                  click: {
                    type: 'click',
                    action: 'updateState',
                    payload: {
                      path: 'content.title',
                      value: '仪表板',
                    },
                  },
                },
              },
              {
                id: 'menu-item-2',
                componentName: 'BaseContainer',
                props: {
                  class:
                    'p-4 mb-2 bg-white bg-opacity-10 rounded-lg cursor-pointer hover:bg-opacity-20 transition-colors',
                },
                children: [
                  {
                    id: 'menu-text-2',
                    componentName: 'BaseText',
                    props: {
                      content: '用户管理',
                      class: 'text-white text-base',
                    },
                  },
                ],
                events: {
                  click: {
                    type: 'click',
                    action: 'updateState',
                    payload: {
                      path: 'content.title',
                      value: '用户管理',
                    },
                  },
                },
              },
              {
                id: 'menu-item-3',
                componentName: 'BaseContainer',
                props: {
                  class:
                    'p-4 mb-2 bg-white bg-opacity-10 rounded-lg cursor-pointer hover:bg-opacity-20 transition-colors',
                },
                children: [
                  {
                    id: 'menu-text-3',
                    componentName: 'BaseText',
                    props: {
                      content: '系统设置',
                      class: 'text-white text-base',
                    },
                  },
                ],
                events: {
                  click: {
                    type: 'click',
                    action: 'updateState',
                    payload: {
                      path: 'content.title',
                      value: '系统设置',
                    },
                  },
                },
              },
            ],
          },
          // 灰色主内容区域
          {
            id: 'content',
            componentName: 'BaseContainer',
            props: {
              class: 'flex-1 bg-gray-600 text-white p-8 overflow-auto',
            },
            children: [
              {
                id: 'content-title',
                componentName: 'BaseText',
                props: {
                  class: 'text-4xl font-bold mb-6',
                },
                bindings: {
                  content: {
                    mode: EValueMode.READ,
                    condition: '$$.content.title',
                  },
                },
              },
              {
                id: 'content-description',
                componentName: 'BaseText',
                props: {
                  content: '这是一个完全基于配置的页面布局示例。通过JSON配置可以轻松创建复杂的页面结构，包括：',
                  class: 'text-lg leading-relaxed mb-6',
                },
              },
              {
                id: 'feature-list',
                componentName: 'BaseContainer',
                props: {
                  class: 'bg-white bg-opacity-10 p-6 rounded-xl mb-6',
                },
                children: [
                  {
                    id: 'feature-1',
                    componentName: 'BaseText',
                    props: {
                      content: '• 响应式布局设计',
                      class: 'text-white text-base mb-3',
                    },
                  },
                  {
                    id: 'feature-2',
                    componentName: 'BaseText',
                    props: {
                      content: '• 动态状态绑定',
                      class: 'text-white text-base mb-3',
                    },
                  },
                  {
                    id: 'feature-3',
                    componentName: 'BaseText',
                    props: {
                      content: '• 事件处理系统',
                      class: 'text-white text-base mb-3',
                    },
                  },
                  {
                    id: 'feature-4',
                    componentName: 'BaseText',
                    props: {
                      content: '• 组件化架构',
                      class: 'text-white text-base',
                    },
                  },
                ],
              },
              {
                id: 'back-button',
                componentName: 'BaseButton',
                props: {
                  text: '返回演示页面',
                  class: 'bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg text-lg transition-colors',
                },
                events: {
                  click: {
                    type: 'click',
                    action: 'navigateBack',
                    payload: {},
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
]);

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};
</script>

<template>
  <view class="layout-page">
    <DynamicRenderer :config="layoutConfig" />
  </view>
</template>

<style scoped>
.layout-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
