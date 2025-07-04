import { IComponentConfig } from '@/types/component';

/**
 * 演示抽象组件的简单配置
 */
export const demoAbstractConfig: IComponentConfig[] = [
  {
    id: 'demo_container',
    componentName: 'BaseContainer',
    props: {
      class: 'w-full min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-6',
    },
    children: [
      {
        id: 'demo_card',
        componentName: 'BaseContainer',
        props: {
          class: 'bg-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto',
        },
        children: [
          {
            id: 'demo_title',
            componentName: 'BaseText',
            props: {
              content: '🎉 抽象组件演示页面',
              class: 'text-3xl font-bold text-gray-800 mb-4 text-center',
            },
          },
          {
            id: 'demo_description',
            componentName: 'BaseText',
            props: {
              content:
                '这个页面演示了使用 ConfigPageContainer 抽象组件创建的页面。所有的加载状态、错误处理、调试工具都由抽象组件自动提供。',
              class: 'text-lg text-gray-600 mb-6 leading-relaxed text-center',
            },
          },
          {
            id: 'features_section',
            componentName: 'BaseContainer',
            props: {
              class: 'space-y-4',
            },
            children: [
              {
                id: 'feature_1',
                componentName: 'BaseContainer',
                props: {
                  class: 'flex items-center p-4 bg-blue-50 rounded-xl',
                },
                children: [
                  {
                    id: 'feature_1_icon',
                    componentName: 'BaseText',
                    props: {
                      content: '⚡',
                      class: 'text-2xl mr-4',
                    },
                  },
                  {
                    id: 'feature_1_text',
                    componentName: 'BaseText',
                    props: {
                      content: '极简代码：从 200+ 行减少到 10 行',
                      class: 'text-gray-700 font-medium',
                    },
                  },
                ],
              },
              {
                id: 'feature_2',
                componentName: 'BaseContainer',
                props: {
                  class: 'flex items-center p-4 bg-green-50 rounded-xl',
                },
                children: [
                  {
                    id: 'feature_2_icon',
                    componentName: 'BaseText',
                    props: {
                      content: '🔧',
                      class: 'text-2xl mr-4',
                    },
                  },
                  {
                    id: 'feature_2_text',
                    componentName: 'BaseText',
                    props: {
                      content: '统一管理：配置加载、错误处理、调试工具',
                      class: 'text-gray-700 font-medium',
                    },
                  },
                ],
              },
              {
                id: 'feature_3',
                componentName: 'BaseContainer',
                props: {
                  class: 'flex items-center p-4 bg-purple-50 rounded-xl',
                },
                children: [
                  {
                    id: 'feature_3_icon',
                    componentName: 'BaseText',
                    props: {
                      content: '🎨',
                      class: 'text-2xl mr-4',
                    },
                  },
                  {
                    id: 'feature_3_text',
                    componentName: 'BaseText',
                    props: {
                      content: '预设样式：支持 layout、form、default 等预设',
                      class: 'text-gray-700 font-medium',
                    },
                  },
                ],
              },
              {
                id: 'feature_4',
                componentName: 'BaseContainer',
                props: {
                  class: 'flex items-center p-4 bg-yellow-50 rounded-xl',
                },
                children: [
                  {
                    id: 'feature_4_icon',
                    componentName: 'BaseText',
                    props: {
                      content: '🚀',
                      class: 'text-2xl mr-4',
                    },
                  },
                  {
                    id: 'feature_4_text',
                    componentName: 'BaseText',
                    props: {
                      content: '开箱即用：自动适配开发/生产环境',
                      class: 'text-gray-700 font-medium',
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'demo_footer',
            componentName: 'BaseText',
            props: {
              content: '右下角的调试工具由抽象组件自动提供 →',
              class: 'text-sm text-gray-500 mt-8 text-center italic',
            },
          },
        ],
      },
    ],
  },
];
