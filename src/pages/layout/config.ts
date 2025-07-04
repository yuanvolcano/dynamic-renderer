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
      style: {
        width: '100%',
        height: '100%',
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
            id: 'header_title',
            componentName: 'BaseText',
            props: {
              content: '配置化布局系统',
              class: 'text-2xl font-bold',
            },
          },
        ],
      },
      // 主体区域（包含侧边栏和内容）
      {
        id: 'main_body',
        componentName: 'BaseContainer',
        props: {
          direction: 'row',
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
                id: 'menu_title',
                componentName: 'BaseText',
                props: {
                  content: '导航菜单',
                  class: 'text-xl font-bold mb-6',
                },
              },
              {
                id: 'menu_item_1',
                componentName: 'BaseContainer',
                props: {
                  class:
                    'p-4 mb-2 bg-white bg-opacity-10 rounded-lg cursor-pointer hover:bg-opacity-20 transition-colors',
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
                  class:
                    'p-4 mb-2 bg-white bg-opacity-10 rounded-lg cursor-pointer hover:bg-opacity-20 transition-colors',
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
                  class:
                    'p-4 mb-2 bg-white bg-opacity-10 rounded-lg cursor-pointer hover:bg-opacity-20 transition-colors',
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
          // 灰色主内容区域
          {
            id: 'content',
            componentName: 'BaseContainer',
            props: {
              class: 'flex-1 bg-gray-200 text-white p-8 overflow-auto',
            },
            children: [
              {
                id: 'feature_list',
                componentName: 'BaseContainer',
                props: {
                  class: 'bg-white bg-opacity-10 p-6 rounded-xl mb-6',
                },
                children: [
                  {
                    id: 'feature_1',
                    componentName: 'BaseText',
                    props: {
                      content: '• 响应式布局设计',
                      class: 'text-white text-base mb-3',
                    },
                  },
                  {
                    id: 'feature_2',
                    componentName: 'BaseText',
                    props: {
                      content: '• 动态状态绑定',
                      class: 'text-white text-base mb-3',
                    },
                  },
                  {
                    id: 'feature_3',
                    componentName: 'BaseText',
                    props: {
                      content: '• 事件处理系统',
                      class: 'text-white text-base mb-3',
                    },
                  },
                  {
                    id: 'feature_4',
                    componentName: 'BaseText',
                    props: {
                      content: '• 组件化架构',
                      class: 'text-white text-base',
                    },
                  },
                ],
              },
              {
                id: 'img_desc',
                componentName: 'BaseText',
                props: {
                  content: 'Base Image 组件',
                  class: 'text-white text-base',
                },
              },
              {
                id: 'img_1',
                componentName: 'BaseImage',
                props: {
                  class: 'w-[300rpx] h-[300rpx]',
                  src: 'https://xmp.mobvista.com/static/media/gamehaus-image.81ac38f4784e749e2374.jpg',
                },
              },
              {
                id: 'input_desc',
                componentName: 'BaseText',
                props: {
                  content: 'Base Input 组件',
                  class: 'text-white text-base',
                },
              },
              {
                id: 'input_1',
                componentName: 'BaseInput',
                props: {
                  placeholder: '请输入',
                  class: 'w-[600rpx] h-[80rpx] mt-4',
                },
                defaultValue: '123',
              },
              {
                id: 'text_1',
                componentName: 'BaseText',
                props: {
                  class: 'text-2xl font-bold',
                },
                bindings: {
                  content: {
                    mode: EValueMode.PARSE,
                    condition: '$.input_1',
                  },
                },
              },
              {
                id: 'back_button',
                componentName: 'BaseButton',
                props: {
                  text: '返回演示页面',
                  class: 'bg-blue-600 hover:bg-blue-700 text-white mt-4 py-4 px-8 rounded-lg text-lg transition-colors',
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
];
