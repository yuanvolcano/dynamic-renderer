import { EEventExecutionMode, IComponentConfig } from '@/types/component';

/**
 * 异步事件处理测试配置
 * 演示顺序执行、并行执行、延迟执行等场景
 */
export const asyncEventsTestConfig: IComponentConfig[] = [
  {
    id: 'main_container',
    componentName: 'BaseContainer',
    props: {
      class: 'w-full p-4',
    },
    children: [
      {
        id: 'title',
        componentName: 'BaseText',
        props: {
          content: '异步事件处理测试',
          class: 'text-2xl font-bold text-center mb-6 text-purple-600',
        },
      },

      // 并行执行示例（默认模式）
      {
        id: 'parallel_section',
        componentName: 'BaseContainer',
        props: {
          class: 'mb-6 p-4 bg-blue-50 rounded-lg',
        },
        children: [
          {
            id: 'parallel_title',
            componentName: 'BaseText',
            props: {
              content: '1. 并行执行模式（默认）',
              class: 'text-lg font-semibold mb-4 text-gray-800',
            },
          },
          {
            id: 'parallel_button',
            componentName: 'BaseButton',
            props: {
              text: '点击测试并行事件',
              type: 'primary',
              class: 'mb-4',
            },
            events: {
              click: [
                {
                  action: 'updateState',
                  payload: { path: 'log_1', value: '事件1: 立即执行' },
                },
                {
                  action: 'updateState',
                  payload: { path: 'log_2', value: '事件2: 500ms延迟' },
                  delay: 500,
                },
                {
                  action: 'updateState',
                  payload: { path: 'log_3', value: '事件3: 200ms延迟' },
                  delay: 200,
                },
                {
                  action: 'showToast',
                  payload: { title: '并行事件执行完成！', icon: 'success' },
                  delay: 800,
                },
              ],
            },
            eventExecutionMode: EEventExecutionMode.PARALLEL, // 使用枚举值
          },
          {
            id: 'parallel_description',
            componentName: 'BaseText',
            props: {
              content: '💡 并行模式：所有事件同时开始执行，不等待前一个完成',
              class: 'text-sm text-gray-600 mb-2',
            },
          },
        ],
      },

      // 顺序执行示例
      {
        id: 'sequential_section',
        componentName: 'BaseContainer',
        props: {
          class: 'mb-6 p-4 bg-green-50 rounded-lg',
        },
        children: [
          {
            id: 'sequential_title',
            componentName: 'BaseText',
            props: {
              content: '2. 顺序执行模式',
              class: 'text-lg font-semibold mb-4 text-gray-800',
            },
          },
          {
            id: 'sequential_button',
            componentName: 'BaseButton',
            props: {
              text: '点击测试顺序事件',
              type: 'primary',
              class: 'mb-4',
            },
            events: {
              click: [
                {
                  action: 'updateState',
                  payload: { path: 'seq_log_1', value: '步骤1: 开始执行' },
                },
                {
                  action: 'updateState',
                  payload: { path: 'seq_log_2', value: '步骤2: 等待1秒后执行' },
                  delay: 1000,
                  waitAfter: 500, // 执行后再等待500ms
                },
                {
                  action: 'updateState',
                  payload: { path: 'seq_log_3', value: '步骤3: 前面步骤完成后执行' },
                },
                {
                  action: 'showToast',
                  payload: { title: '顺序事件执行完成！', icon: 'success' },
                },
              ],
            },
            eventExecutionMode: EEventExecutionMode.SEQUENTIAL, // 使用枚举值
          },
          {
            id: 'sequential_description',
            componentName: 'BaseText',
            props: {
              content: '🔄 顺序模式：事件按顺序执行，等待前一个完成后再执行下一个',
              class: 'text-sm text-gray-600 mb-2',
            },
          },
        ],
      },

      // 日志显示区域
      {
        id: 'logs_section',
        componentName: 'BaseContainer',
        props: {
          class: 'p-4 bg-yellow-50 rounded-lg',
        },
        children: [
          {
            id: 'logs_title',
            componentName: 'BaseText',
            props: {
              content: '📋 执行日志',
              class: 'text-lg font-semibold mb-4 text-gray-800',
            },
          },

          // 并行执行日志
          {
            id: 'parallel_logs_title',
            componentName: 'BaseText',
            props: {
              content: '并行执行日志：',
              class: 'text-base font-medium mb-2 text-blue-600',
            },
          },
          {
            id: 'log_1_display',
            componentName: 'BaseText',
            props: {
              content: '{{log_1}}',
              class: 'text-sm text-gray-600 mb-1 pl-4',
            },
          },
          {
            id: 'log_2_display',
            componentName: 'BaseText',
            props: {
              content: '{{log_2}}',
              class: 'text-sm text-gray-600 mb-1 pl-4',
            },
          },
          {
            id: 'log_3_display',
            componentName: 'BaseText',
            props: {
              content: '{{log_3}}',
              class: 'text-sm text-gray-600 mb-4 pl-4',
            },
          },

          // 顺序执行日志
          {
            id: 'sequential_logs_title',
            componentName: 'BaseText',
            props: {
              content: '顺序执行日志：',
              class: 'text-base font-medium mb-2 text-green-600',
            },
          },
          {
            id: 'seq_log_1_display',
            componentName: 'BaseText',
            props: {
              content: '{{seq_log_1}}',
              class: 'text-sm text-gray-600 mb-1 pl-4',
            },
          },
          {
            id: 'seq_log_2_display',
            componentName: 'BaseText',
            props: {
              content: '{{seq_log_2}}',
              class: 'text-sm text-gray-600 mb-1 pl-4',
            },
          },
          {
            id: 'seq_log_3_display',
            componentName: 'BaseText',
            props: {
              content: '{{seq_log_3}}',
              class: 'text-sm text-gray-600 mb-4 pl-4',
            },
          },

          // 清除日志按钮
          {
            id: 'clear_logs_button',
            componentName: 'BaseButton',
            props: {
              text: '清除日志',
              type: 'default',
              size: 'small',
            },
            events: {
              click: [
                {
                  action: 'updateState',
                  payload: { path: 'log_1', value: '' },
                },
                {
                  action: 'updateState',
                  payload: { path: 'log_2', value: '' },
                },
                {
                  action: 'updateState',
                  payload: { path: 'log_3', value: '' },
                },
                {
                  action: 'updateState',
                  payload: { path: 'seq_log_1', value: '' },
                },
                {
                  action: 'updateState',
                  payload: { path: 'seq_log_2', value: '' },
                },
                {
                  action: 'updateState',
                  payload: { path: 'seq_log_3', value: '' },
                },
              ],
            },
            eventExecutionMode: EEventExecutionMode.PARALLEL, // 使用枚举值
          },
        ],
      },
    ],
  },
];
