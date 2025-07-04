import { EValueMode, IComponentConfig } from '@/types/component';

/**
 * 表单演示页面的配置对象
 * 演示了基于JSON配置的各种表单组件
 */
export const formDemoConfig: IComponentConfig[] = [
  // 主容器
  {
    id: 'main_container',
    componentName: 'BaseContainer',
    props: {
      class: 'w-full min-h-screen bg-gray-50 p-4',
    },
    children: [
      // 表单卡片容器
      {
        id: 'form_card',
        componentName: 'BaseContainer',
        props: {
          class: 'bg-white rounded-2xl shadow-lg p-6',
        },
        children: [
          // 基础输入组
          {
            id: 'basic_inputs_section',
            componentName: 'BaseContainer',
            props: {
              class: 'mb-6',
            },
            children: [
              {
                id: 'basic_section_title',
                componentName: 'BaseText',
                props: {
                  content: '基础输入',
                  class: 'text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200',
                },
              },
              // 单行输入框
              {
                id: 'input_group',
                componentName: 'BaseContainer',
                props: {
                  class: 'mb-6',
                },
                children: [
                  {
                    id: 'input_label',
                    componentName: 'BaseText',
                    props: {
                      content: '您的姓名',
                      class: 'block text-sm font-medium text-gray-700 mb-2',
                    },
                  },
                  {
                    id: 'input_field',
                    componentName: 'BaseInput',
                    props: {
                      placeholder: '请输入您的姓名',
                      class:
                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                    },
                    defaultValue: '',
                  },
                ],
              },
              // 密码输入框
              {
                id: 'password_group',
                componentName: 'BaseContainer',
                props: {
                  class: 'mb-6',
                },
                visibleOption: {
                  mode: EValueMode.PARSE,
                  condition: '!!$.input_field?.length',
                },
                children: [
                  {
                    id: 'password_label',
                    componentName: 'BaseText',
                    props: {
                      content: '登录密码',
                      class: 'block text-sm font-medium text-gray-700 mb-2',
                    },
                  },
                  {
                    id: 'password_field',
                    componentName: 'BaseInput',
                    props: {
                      type: 'password',
                      placeholder: '请输入密码',
                      class:
                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                    },
                    defaultValue: '',
                  },
                ],
              },
              // 确认密码输入框
              {
                id: 'confirm_password_group',
                componentName: 'BaseContainer',
                props: {
                  class: 'mb-6',
                },
                visibleOption: {
                  mode: EValueMode.PARSE,
                  condition: '!!$.input_field?.length',
                },
                children: [
                  {
                    id: 'confirm_password_label',
                    componentName: 'BaseText',
                    props: {
                      content: '确认密码',
                      class: 'block text-sm font-medium text-gray-700 mb-2',
                    },
                  },
                  {
                    id: 'confirm_password_field',
                    componentName: 'BaseInput',
                    props: {
                      type: 'password',
                      placeholder: '请再次输入密码',
                      class:
                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                    },
                    defaultValue: '',
                  },
                ],
              },

              // 邮箱和验证码
              {
                id: 'email_group',
                componentName: 'BaseContainer',
                props: {
                  class: 'mb-6',
                },
                children: [
                  {
                    id: 'email_label',
                    componentName: 'BaseText',
                    props: {
                      content: '邮箱',
                      class: 'block text-sm font-medium text-gray-700 mb-2',
                    },
                  },
                  {
                    id: 'email_input_container',
                    componentName: 'BaseContainer',
                    props: {
                      class: 'flex gap-3',
                      direction: 'row',
                    },
                    children: [
                      {
                        id: 'email_field',
                        componentName: 'BaseInput',
                        props: {
                          type: 'email',
                          placeholder: '请输入邮箱',
                          class:
                            'flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                        },
                        defaultValue: '',
                      },
                      {
                        id: 'send_code_button',
                        componentName: 'BaseButton',
                        props: {
                          type: 'primary',
                          size: 'medium',
                          text: '发送验证码',
                        },
                        bindings: {
                          disabled: {
                            mode: EValueMode.PARSE,
                            condition: '!($.email_field?.length && $.email_field.includes("@"))',
                          },
                        },
                        events: {
                          click: {
                            type: 'click',
                            action: 'showToast',
                            payload: {
                              title: '发送验证码成功',
                              icon: 'success',
                              duration: 2000,
                            },
                          },
                        },
                      },
                    ],
                  },
                ],
              },

              // 邮箱验证码
              {
                id: 'verification_code_group',
                componentName: 'BaseContainer',
                props: {
                  class: 'mb-6',
                },
                visibleOption: {
                  mode: EValueMode.PARSE,
                  condition: '!!$.email_field?.length && $.email_field.includes("@")',
                },
                children: [
                  {
                    id: 'verification_code_label',
                    componentName: 'BaseText',
                    props: {
                      content: '邮箱验证码',
                      class: 'block text-sm font-medium text-gray-700 mb-2',
                    },
                  },
                  {
                    id: 'verification_code_field',
                    componentName: 'BaseInput',
                    props: {
                      placeholder: '请输入6位验证码',
                      maxlength: 6,
                      class:
                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                    },
                    defaultValue: '',
                  },
                ],
              },

              // 多行输入框
              {
                id: 'textarea_group',
                componentName: 'BaseContainer',
                props: {
                  class: 'mb-4',
                },
                children: [
                  {
                    id: 'textarea_label',
                    componentName: 'BaseText',
                    props: {
                      content: '个人简介',
                      class: 'block text-sm font-medium text-gray-700 mb-2',
                    },
                  },
                  {
                    id: 'textarea_field',
                    componentName: 'BaseTextarea',
                    props: {
                      placeholder: '请输入个人简介...',
                      class:
                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors min-h-24',
                    },
                    defaultValue: '',
                  },
                ],
              },
            ],
          },
          // 选择组件组
          {
            id: 'selection_section',
            componentName: 'BaseContainer',
            props: {
              class: 'mb-6',
            },
            children: [
              {
                id: 'selection_section_title',
                componentName: 'BaseText',
                props: {
                  content: '选择组件',
                  class: 'text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200',
                },
              },

              // 单选框组
              {
                id: 'radio_group_container',
                componentName: 'BaseContainer',
                props: {
                  class: 'mb-6',
                },
                children: [
                  {
                    id: 'radio_label',
                    componentName: 'BaseText',
                    props: {
                      content: '性别',
                      class: 'block text-sm font-medium text-gray-700 mb-3',
                    },
                  },
                  {
                    id: 'radio_group',
                    componentName: 'BaseRadioGroup',
                    props: {
                      options: [
                        { label: '男', value: 'male' },
                        { label: '女', value: 'female' },
                        { label: '其他', value: 'other' },
                      ],
                      class: 'flex gap-6',
                    },
                    defaultValue: 'male',
                  },
                ],
              },

              // 下拉选择
              {
                id: 'select_group',
                componentName: 'BaseContainer',
                props: {
                  class: 'mb-6',
                },
                children: [
                  {
                    id: 'select_label',
                    componentName: 'BaseText',
                    props: {
                      content: '城市',
                      class: 'block text-sm font-medium text-gray-700 mb-2',
                    },
                  },
                  {
                    id: 'select_field',
                    componentName: 'BaseSelect',
                    props: {
                      options: [
                        { label: '北京', value: 'beijing' },
                        { label: '上海', value: 'shanghai' },
                        { label: '广州', value: 'guangzhou' },
                        { label: '深圳', value: 'shenzhen' },
                        { label: '杭州', value: 'hangzhou' },
                      ],
                      class:
                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                    },
                    defaultValue: 'beijing',
                  },
                ],
              },
            ],
          },

          // 开关组件组
          {
            id: 'toggle_section',
            componentName: 'BaseContainer',
            props: {
              class: 'mb-6',
            },
            children: [
              {
                id: 'toggle_section_title',
                componentName: 'BaseText',
                props: {
                  content: '开关控制',
                  class: 'text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200',
                },
              },

              // 复选框
              {
                id: 'checkbox_group',
                componentName: 'BaseContainer',
                props: {
                  class: 'mb-6',
                },
                children: [
                  {
                    id: 'checkbox_field',
                    componentName: 'BaseCheckbox',
                    props: {
                      label: '我已阅读并同意服务条款',
                    },
                    defaultValue: false,
                  },
                ],
              },

              // 开关
              {
                id: 'switch_group',
                componentName: 'BaseContainer',
                props: {
                  class: 'mb-6',
                },
                children: [
                  {
                    id: 'switch_container',
                    componentName: 'BaseContainer',
                    props: {
                      class: 'flex items-center justify-between',
                    },
                    children: [
                      {
                        id: 'switch_label',
                        componentName: 'BaseText',
                        props: {
                          content: '接收邮件通知',
                          class: 'text-sm font-medium text-gray-700',
                        },
                      },
                      {
                        id: 'switch_field',
                        componentName: 'BaseSwitch',
                        bindings: {
                          disabled: {
                            mode: EValueMode.PARSE,
                            condition: '!($.email_field?.length && $.email_field.includes("@"))',
                          },
                        },
                        defaultValue: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // 操作按钮组
          {
            id: 'action_section',
            componentName: 'BaseContainer',
            props: {
              class: 'pt-6 border-t border-gray-200',
            },
            children: [
              {
                id: 'button_group',
                componentName: 'BaseContainer',
                props: {
                  useFlex: false,
                  class: 'text-center',
                },
                children: [
                  {
                    id: 'submit_button',
                    componentName: 'BaseButton',
                    props: {
                      type: 'primary',
                      size: 'medium',
                      text: '提交表单',
                      class: 'mr-4',
                    },
                    events: {
                      click: [
                        {
                          type: 'click',
                          action: 'showToast',
                          payload: {
                            title: '提交表单成功',
                            icon: 'success',
                            duration: 2000,
                          },
                        },
                      ],
                    },
                  },
                  {
                    id: 'reset_button',
                    componentName: 'BaseButton',
                    props: {
                      type: 'default',
                      size: 'medium',
                      text: '重置',
                      class: 'mr-4',
                    },
                    events: {
                      click: {
                        type: 'click',
                        action: 'custom',
                        payload: {
                          mode: EValueMode.PARSE,
                          condition: '$$$.context?.utils?.resetState?.()',
                        },
                      },
                    },
                  },
                  {
                    id: 'back_button',
                    componentName: 'BaseButton',
                    props: {
                      type: 'default',
                      size: 'medium',
                      text: '返回',
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
