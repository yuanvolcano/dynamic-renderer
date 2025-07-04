import { EEventAction } from '@/constants/enums';
import { IComponentConfig } from '@/types/component';

/**
 * Demo 首页配置
 * 使用 TailwindCSS 类优化 UI 设计
 */
export const demoConfig: IComponentConfig[] = [
  {
    id: 'main_container',
    componentName: 'BaseContainer',
    props: {
      class: 'min-h-screen bg-blue-500 pb-20',
    },
    children: [
      // 主要功能卡片
      {
        id: 'main_features',
        componentName: 'BaseContainer',
        props: {
          class: 'px-4 py-6 mt-8',
        },
        children: [
          // 布局展示卡片
          {
            id: 'layout_card',
            componentName: 'BaseContainer',
            props: {
              class: 'bg-white rounded-lg p-6 mx-4 mb-6 shadow-lg',
            },
            children: [
              {
                id: 'layout_title',
                componentName: 'BaseText',
                props: {
                  content: '🏗️ 布局展示',
                  class: 'text-2xl font-bold text-gray-800 mb-3 text-center',
                },
              },
              {
                id: 'layout_desc',
                componentName: 'BaseText',
                props: {
                  content: '展示复杂的布局结构设计和响应式组件排列',
                  class: 'text-gray-600 text-center mb-6',
                },
              },
              {
                id: 'layout_button',
                componentName: 'BaseButton',
                props: {
                  text: '立即体验',
                  class: 'w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg',
                },
                events: {
                  click: [
                    {
                      action: EEventAction.SHOW_TOAST,
                      payload: {
                        title: '正在跳转到布局展示...',
                        icon: 'loading',
                        duration: 1000,
                      },
                    },
                    {
                      action: EEventAction.NAVIGATE,
                      payload: { url: '/pages/layout/index' },
                      delay: 500,
                    },
                  ],
                },
              },
            ],
          },

          // 表单演示卡片
          {
            id: 'form_card',
            componentName: 'BaseContainer',
            props: {
              class: 'bg-white rounded-lg p-6 mx-4 mb-6 shadow-lg',
            },
            children: [
              {
                id: 'form_title',
                componentName: 'BaseText',
                props: {
                  content: '📝 表单演示',
                  class: 'text-2xl font-bold text-gray-800 mb-3 text-center',
                },
              },
              {
                id: 'form_desc',
                componentName: 'BaseText',
                props: {
                  content: '动态表单组件展示、数据绑定和表单验证功能',
                  class: 'text-gray-600 text-center mb-6',
                },
              },
              {
                id: 'form_button',
                componentName: 'BaseButton',
                props: {
                  text: '立即体验',
                  class: 'w-full bg-pink-500 text-white font-bold py-3 px-6 rounded-lg',
                },
                events: {
                  click: [
                    {
                      action: EEventAction.SHOW_TOAST,
                      payload: {
                        title: '正在跳转到表单演示...',
                        icon: 'loading',
                        duration: 1000,
                      },
                    },
                    {
                      action: EEventAction.NAVIGATE,
                      payload: { url: '/pages/form/index' },
                      delay: 500,
                    },
                  ],
                },
              },
            ],
          },
        ],
      },

      // 其他功能卡片
      {
        id: 'other_features',
        componentName: 'BaseContainer',
        props: {
          class: 'px-4 mb-8',
        },
        children: [
          // 异步事件卡片
          {
            id: 'async_card',
            componentName: 'BaseContainer',
            props: {
              class: 'bg-white rounded-lg p-6 mx-4 mb-6 shadow-lg',
            },
            children: [
              {
                id: 'async_title',
                componentName: 'BaseText',
                props: {
                  content: '⚡ 异步事件',
                  class: 'text-xl font-bold text-gray-800 mb-2 text-center',
                },
              },
              {
                id: 'async_desc',
                componentName: 'BaseText',
                props: {
                  content: '并行和顺序事件处理机制',
                  class: 'text-gray-600 text-center mb-4',
                },
              },
              {
                id: 'async_button',
                componentName: 'BaseButton',
                props: {
                  text: '立即体验',
                  class: 'w-full bg-purple-500 text-white font-bold py-3 px-6 rounded-lg',
                },
                events: {
                  click: [
                    {
                      action: EEventAction.SHOW_TOAST,
                      payload: {
                        title: '正在跳转到异步事件测试...',
                        icon: 'loading',
                        duration: 1000,
                      },
                    },
                    {
                      action: EEventAction.NAVIGATE,
                      payload: { url: '/pages/demo-async-events/index' },
                      delay: 500,
                    },
                  ],
                },
              },
            ],
          },
          // 底部信息区域
          {
            id: 'footer_info',
            componentName: 'BaseContainer',
            props: {
              class: 'bg-white px-4 mb-12 rounded-lg p-6 shadow-lg text-center',
            },
            children: [
              {
                id: 'tech_title',
                componentName: 'BaseText',
                props: {
                  content: '🔧 技术栈',
                  class: 'text-lg font-semibold text-gray-800 mb-3',
                },
              },
              {
                id: 'tech_stack',
                componentName: 'BaseText',
                props: {
                  content: 'Vue3 + UniApp + TypeScript + UnoCSS',
                  class: 'text-gray-600 mb-2',
                },
              },
              {
                id: 'platform_support',
                componentName: 'BaseText',
                props: {
                  content: '支持 H5 / 小程序',
                  class: 'text-sm text-gray-500',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'button_test',
    componentName: 'BaseButton',
    props: {
      text: '测试按钮',
    },
  },
];
