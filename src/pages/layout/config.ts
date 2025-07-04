import { EValueMode, IComponentConfig } from '@/types/component';

/**
 * 布局页面的配置对象
 * 演示了基于JSON配置的复杂页面布局结构
 */
export const layoutConfig: IComponentConfig[] = [
  {
    id: 'main_layout',
    componentName: 'BaseContainer',
    props: {
      class: 'w-full h-full flex flex-col bg-gray-100',
    },
    children: [
      // 头部区域
      {
        id: 'header',
        componentName: 'BaseContainer',
        props: {
          class: 'w-full h-[60px] flex items-center justify-between px-4 py-2 bg-gray-800 text-white',
        },
        children: [
          {
            id: 'header_title',
            componentName: 'BaseText',
            props: {
              content: '配置化布局系统',
              class: 'text-2xl font-bold text-white',
            },
          },
        ],
      },
      // 主体区域（包含侧边栏和内容）
      {
        id: 'main_body',
        componentName: 'BaseContainer',
        props: {
          class: 'flex flex-1 overflow-hidden',
          direction: 'row',
        },
        children: [
          // 侧边栏
          {
            id: 'sidebar',
            componentName: 'BaseContainer',
            props: {
              class: 'w-[120px] bg-blue-600 text-white p-4',
            },
            children: [
              {
                id: 'menu_title',
                componentName: 'BaseText',
                props: {
                  content: '导航菜单',
                  class: 'text-lg font-bold mb-4 text-white',
                },
              },
              {
                id: 'menu_item_1',
                componentName: 'BaseContainer',
                props: {
                  class: 'p-3 mb-2 bg-blue-700 rounded-lg cursor-pointer',
                },
                children: [
                  {
                    id: 'menu_text_1',
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
                id: 'menu_item_2',
                componentName: 'BaseContainer',
                props: {
                  class: 'p-3 mb-2 bg-blue-700 rounded-lg cursor-pointer',
                },
                children: [
                  {
                    id: 'menu_text_2',
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
                id: 'menu_item_3',
                componentName: 'BaseContainer',
                props: {
                  class: 'p-3 mb-2 bg-blue-700 rounded-lg cursor-pointer',
                },
                children: [
                  {
                    id: 'menu_text_3',
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
          // 主内容区域
          {
            id: 'content',
            componentName: 'BaseContainer',
            props: {
              class: 'flex-1 bg-white p-6 overflow-auto',
            },
            children: [
              {
                id: 'content_title',
                componentName: 'BaseText',
                props: {
                  content: '欢迎使用配置化布局系统',
                  class: 'text-2xl font-bold text-gray-800 mb-6',
                },
              },
              {
                id: 'feature_list',
                componentName: 'BaseContainer',
                props: {
                  class: 'bg-gray-50 p-4 rounded-lg mb-6',
                },
                children: [
                  {
                    id: 'feature_title',
                    componentName: 'BaseText',
                    props: {
                      content: '系统特性',
                      class: 'text-lg font-bold text-gray-800 mb-4',
                    },
                  },
                  {
                    id: 'feature_1',
                    componentName: 'BaseText',
                    props: {
                      content: '• 响应式布局设计',
                      class: 'text-gray-700 text-base mb-2',
                    },
                  },
                  {
                    id: 'feature_2',
                    componentName: 'BaseText',
                    props: {
                      content: '• 动态状态绑定',
                      class: 'text-gray-700 text-base mb-2',
                    },
                  },
                  {
                    id: 'feature_3',
                    componentName: 'BaseText',
                    props: {
                      content: '• 事件处理系统',
                      class: 'text-gray-700 text-base mb-2',
                    },
                  },
                  {
                    id: 'feature_4',
                    componentName: 'BaseText',
                    props: {
                      content: '• 组件化架构',
                      class: 'text-gray-700 text-base',
                    },
                  },
                ],
              },
              {
                id: 'demo_section',
                componentName: 'BaseContainer',
                props: {
                  class: 'bg-white border border-gray-200 rounded-lg p-4 mb-6',
                },
                children: [
                  {
                    id: 'demo_title',
                    componentName: 'BaseText',
                    props: {
                      content: '组件演示',
                      class: 'text-lg font-bold text-gray-800 mb-4',
                    },
                  },
                  {
                    id: 'img_desc',
                    componentName: 'BaseText',
                    props: {
                      content: 'Base Image 组件展示：',
                      class: 'text-gray-700 text-base mb-2',
                    },
                  },
                  {
                    id: 'img_1',
                    componentName: 'BaseImage',
                    props: {
                      class: 'w-60 h-60 rounded-lg mb-4',
                      src: 'https://xmp.mobvista.com/static/media/gamehaus-image.81ac38f4784e749e2374.jpg',
                    },
                  },
                  {
                    id: 'input_desc',
                    componentName: 'BaseText',
                    props: {
                      content: 'Base Input 组件展示：',
                      class: 'text-gray-700 text-base mb-2',
                    },
                  },
                  {
                    id: 'input_1',
                    componentName: 'BaseInput',
                    props: {
                      placeholder: '请输入内容',
                      class: 'w-full h-12 px-3 py-2 border border-gray-300 rounded-lg mb-4',
                    },
                    defaultValue: '示例文本',
                  },
                  {
                    id: 'input_display',
                    componentName: 'BaseText',
                    props: {
                      class: 'text-lg font-medium text-blue-600 mb-4',
                    },
                    bindings: {
                      content: {
                        mode: EValueMode.PARSE,
                        condition: '输入内容：$.input_1',
                      },
                    },
                  },
                ],
              },
              {
                id: 'action_section',
                componentName: 'BaseContainer',
                props: {
                  class: 'flex flex-wrap gap-4',
                },
                children: [
                  {
                    id: 'back_button',
                    componentName: 'BaseButton',
                    props: {
                      text: '返回演示页面',
                      class: 'bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium',
                    },
                    events: {
                      click: {
                        type: 'click',
                        action: 'navigateBack',
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
