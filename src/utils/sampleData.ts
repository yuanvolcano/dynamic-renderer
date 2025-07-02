import type { DynamicUISchema, ComponentConfig } from '@/types/component'

/**
 * 简单文本展示示例
 */
export const simpleTextExample: DynamicUISchema = {
  version: '1.0.0',
  metadata: {
    title: '简单文本示例',
    description: '展示基础文本组件的动态渲染',
    author: 'Dynamic UI',
    createTime: new Date().toISOString()
  },
  components: [
    {
      id: 'welcome-container',
      type: 'container',
      props: {
        style: {
          padding: '30rpx',
          backgroundColor: '#f8f9fa',
          borderRadius: '16rpx',
          marginBottom: '20rpx'
        }
      },
      children: [
        {
          id: 'welcome-title',
          type: 'text',
          props: {
            content: '欢迎使用动态UI',
            style: {
              fontSize: '40rpx',
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
              marginBottom: '20rpx'
            }
          }
        },
        {
          id: 'welcome-desc',
          type: 'text',
          props: {
            content: '这是一个由JSON配置生成的界面',
            style: {
              fontSize: '28rpx',
              color: '#666',
              textAlign: 'center'
            }
          }
        }
      ]
    }
  ]
}

/**
 * 表单输入示例
 */
export const formExample: DynamicUISchema = {
  version: '1.0.0',
  metadata: {
    title: '表单示例',
    description: '展示输入框、按钮等交互组件',
    author: 'Dynamic UI',
    createTime: new Date().toISOString()
  },
  components: [
    {
      id: 'form-container',
      type: 'container',
      props: {
        style: {
          padding: '40rpx',
          backgroundColor: '#fff',
          borderRadius: '16rpx',
          boxShadow: '0 4rpx 20rpx rgba(0,0,0,0.1)'
        }
      },
      children: [
        {
          id: 'form-title',
          type: 'text',
          props: {
            content: '用户信息填写',
            style: {
              fontSize: '36rpx',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '30rpx'
            }
          }
        },
        {
          id: 'name-input',
          type: 'input',
          props: {
            placeholder: '请输入姓名',
            style: {
              marginBottom: '20rpx'
            }
          }
        },
        {
          id: 'email-input',
          type: 'input',
          props: {
            placeholder: '请输入邮箱',
            type: 'text',
            style: {
              marginBottom: '20rpx'
            }
          }
        },
        {
          id: 'age-input',
          type: 'input',
          props: {
            placeholder: '请输入年龄',
            type: 'number',
            style: {
              marginBottom: '30rpx'
            }
          }
        },
        {
          id: 'submit-btn',
          type: 'button',
          props: {
            text: '提交信息',
            onClick: () => {
              uni.showToast({
                title: '表单提交成功！',
                icon: 'success'
              })
            }
          }
        }
      ]
    }
  ]
}

/**
 * 复杂布局示例
 */
export const complexLayoutExample: DynamicUISchema = {
  version: '1.0.0',
  metadata: {
    title: '复杂布局示例',
    description: '展示嵌套容器和多种组件的组合使用',
    author: 'Dynamic UI',
    createTime: new Date().toISOString()
  },
  components: [
    {
      id: 'main-container',
      type: 'container',
      props: {
        direction: 'column',
        style: {
          padding: '20rpx'
        }
      },
      children: [
        {
          id: 'header-section',
          type: 'container',
          props: {
            style: {
              backgroundColor: '#007aff',
              borderRadius: '16rpx',
              padding: '30rpx',
              marginBottom: '20rpx'
            }
          },
          children: [
            {
              id: 'header-title',
              type: 'text',
              props: {
                content: '产品展示',
                style: {
                  fontSize: '42rpx',
                  fontWeight: 'bold',
                  color: '#fff',
                  textAlign: 'center'
                }
              }
            }
          ]
        },
        {
          id: 'content-section',
          type: 'container',
          props: {
            direction: 'row',
            style: {
              backgroundColor: '#fff',
              borderRadius: '16rpx',
              padding: '30rpx',
              marginBottom: '20rpx'
            }
          },
          children: [
            {
              id: 'product-image',
              type: 'image',
              props: {
                src: 'https://via.placeholder.com/200x200/007aff/ffffff?text=Product',
                mode: 'aspectFit',
                style: {
                  width: '200rpx',
                  height: '200rpx',
                  marginRight: '20rpx',
                  borderRadius: '12rpx'
                }
              }
            },
            {
              id: 'product-info',
              type: 'container',
              props: {
                direction: 'column',
                style: {
                  flex: 1
                }
              },
              children: [
                {
                  id: 'product-name',
                  type: 'text',
                  props: {
                    content: '智能手机',
                    style: {
                      fontSize: '32rpx',
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: '10rpx'
                    }
                  }
                },
                {
                  id: 'product-price',
                  type: 'text',
                  props: {
                    content: '￥2999',
                    style: {
                      fontSize: '28rpx',
                      color: '#ff4444',
                      marginBottom: '10rpx'
                    }
                  }
                },
                {
                  id: 'product-desc',
                  type: 'text',
                  props: {
                    content: '高性能处理器，超长续航，拍照清晰',
                    style: {
                      fontSize: '24rpx',
                      color: '#666',
                      lineHeight: '1.5'
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'action-section',
          type: 'container',
          props: {
            direction: 'row',
            justify: 'space-between',
            style: {
              backgroundColor: '#fff',
              borderRadius: '16rpx',
              padding: '30rpx'
            }
          },
          children: [
            {
              id: 'add-cart-btn',
              type: 'button',
              props: {
                text: '加入购物车',
                onClick: () => {
                  uni.showToast({
                    title: '已加入购物车',
                    icon: 'success'
                  })
                },
                style: {
                  flex: 1,
                  marginRight: '10rpx',
                  backgroundColor: '#f8f9fa',
                  color: '#333'
                }
              }
            },
            {
              id: 'buy-now-btn',
              type: 'button',
              props: {
                text: '立即购买',
                onClick: () => {
                  uni.showToast({
                    title: '跳转到支付页面',
                    icon: 'none'
                  })
                },
                style: {
                  flex: 1,
                  marginLeft: '10rpx'
                }
              }
            }
          ]
        }
      ]
    }
  ]
}

/**
 * 获取所有示例数据
 */
export const getAllExamples = () => [
  { name: '简单文本', data: simpleTextExample },
  { name: '表单输入', data: formExample },
  { name: '复杂布局', data: complexLayoutExample }
]

/**
 * 生成唯一ID
 */
export const generateId = (): string => {
  return `component_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 创建基础组件配置
 */
export const createBasicComponent = (type: string, content?: string): ComponentConfig => {
  const baseConfig: ComponentConfig = {
    id: generateId(),
    type,
    props: {}
  }

  switch (type) {
    case 'text':
      baseConfig.props = {
        content: content || '新建文本',
        style: {
          fontSize: '28rpx',
          color: '#333'
        }
      }
      break
    case 'button':
      baseConfig.props = {
        text: content || '新建按钮',
        onClick: () => {
          uni.showToast({
            title: '按钮被点击',
            icon: 'success'
          })
        }
      }
      break
    case 'input':
      baseConfig.props = {
        placeholder: content || '请输入内容'
      }
      break
    case 'container':
      baseConfig.props = {
        style: {
          padding: '20rpx',
          backgroundColor: '#f8f9fa',
          borderRadius: '8rpx'
        }
      }
      baseConfig.children = []
      break
    case 'image':
      baseConfig.props = {
        src: 'https://via.placeholder.com/200x200/007aff/ffffff?text=Image',
        mode: 'aspectFit',
        style: {
          width: '200rpx',
          height: '200rpx'
        }
      }
      break
  }

  return baseConfig
}
