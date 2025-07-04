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
      class: 'min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8',
    },
    children: [
      // 页面标题区域
      {
        id: 'header_section',
        componentName: 'BaseContainer',
        props: {
          class: 'text-center mb-12 bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20',
        },
        children: [
          {
            id: 'page_title',
            componentName: 'BaseText',
            props: {
              content: '🚀 组件演示',
              class:
                'text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4',
            },
          },
          {
            id: 'page_subtitle',
            componentName: 'BaseText',
            props: {
              content: '探索动态UI渲染系统的强大功能',
              class: 'text-xl text-gray-600 leading-relaxed',
            },
          },
        ],
      },

      // 主要功能卡片
      {
        id: 'main_features',
        componentName: 'BaseContainer',
        props: {
          class: 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-8',
        },
        children: [
          // 布局展示卡片
          {
            id: 'layout_card',
            componentName: 'BaseContainer',
            props: {
              class:
                'group bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20',
            },
            children: [
              {
                id: 'layout_icon',
                componentName: 'BaseText',
                props: {
                  content: '🏗️',
                  class: 'text-6xl mb-4 block text-center group-hover:scale-110 transition-transform duration-300',
                },
              },
              {
                id: 'layout_title',
                componentName: 'BaseText',
                props: {
                  content: '布局展示',
                  class: 'text-2xl font-bold text-gray-800 mb-3 text-center',
                },
              },
              {
                id: 'layout_desc',
                componentName: 'BaseText',
                props: {
                  content: '展示复杂的布局结构设计和响应式组件排列',
                  class: 'text-gray-600 text-center mb-6 leading-relaxed',
                },
              },
              {
                id: 'layout_button',
                componentName: 'BaseButton',
                props: {
                  text: '立即体验',
                  class:
                    'w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105',
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
              class:
                'group bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20',
            },
            children: [
              {
                id: 'form_icon',
                componentName: 'BaseText',
                props: {
                  content: '📝',
                  class: 'text-6xl mb-4 block text-center group-hover:scale-110 transition-transform duration-300',
                },
              },
              {
                id: 'form_title',
                componentName: 'BaseText',
                props: {
                  content: '表单演示',
                  class: 'text-2xl font-bold text-gray-800 mb-3 text-center',
                },
              },
              {
                id: 'form_desc',
                componentName: 'BaseText',
                props: {
                  content: '动态表单组件展示、数据绑定和表单验证功能',
                  class: 'text-gray-600 text-center mb-6 leading-relaxed',
                },
              },
              {
                id: 'form_button',
                componentName: 'BaseButton',
                props: {
                  text: '立即体验',
                  class:
                    'w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105',
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
          class: 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-8',
        },
        children: [
          // 异步事件卡片
          {
            id: 'async_card',
            componentName: 'BaseContainer',
            props: {
              class:
                'group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20',
            },
            children: [
              {
                id: 'async_icon',
                componentName: 'BaseText',
                props: {
                  content: '⚡',
                  class: 'text-5xl mb-3 block text-center group-hover:scale-110 transition-transform duration-300',
                },
              },
              {
                id: 'async_title',
                componentName: 'BaseText',
                props: {
                  content: '异步事件',
                  class: 'text-xl font-semibold text-gray-800 mb-2 text-center',
                },
              },
              {
                id: 'async_desc',
                componentName: 'BaseText',
                props: {
                  content: '并行和顺序事件处理机制',
                  class: 'text-gray-600 text-center mb-4 text-sm',
                },
              },
              {
                id: 'async_button',
                componentName: 'BaseButton',
                props: {
                  text: '立即体验',
                  class:
                    'w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300',
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
        ],
      },

      // 底部信息区域
      {
        id: 'footer_info',
        componentName: 'BaseContainer',
        props: {
          class: 'bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center border border-white/20',
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
              content: 'Vue3 + UniApp + TypeScript + TailwindCSS',
              class: 'text-gray-600 mb-2',
            },
          },
          {
            id: 'platform_support',
            componentName: 'BaseText',
            props: {
              content: '支持 H5 / 小程序 / App 多端运行',
              class: 'text-sm text-gray-500',
            },
          },
        ],
      },
    ],
  },
];
