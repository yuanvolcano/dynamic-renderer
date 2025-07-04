import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { presetWeapp } from 'unocss-preset-weapp';
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer';

const { presetWeappAttributify, transformerAttributify } = extractorAttributify();

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
    // attributify autocomplete
    presetWeappAttributify() as any,
    // https://unocss.dev/presets/icons
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: {
    // 边框
    'border-base': 'border border-gray-500_10',

    // 布局
    'center': 'flex justify-center items-center',
    'center-x': 'flex justify-center',
    'center-y': 'flex items-center',
    'full-center': 'w-full h-full flex items-center justify-center',

    // 按钮基础样式
    'btn-base': 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer select-none',
    'btn-sm': 'px-3 py-1.5 text-sm',
    'btn-lg': 'px-6 py-3 text-lg',

    // 卡片
    'card-base': 'bg-white rounded-lg shadow-sm border border-gray-100',
    'card-hover': 'hover:shadow-md transition-shadow duration-200',

    // 输入框
    'input-base': 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',

    // 文本
    'text-ellipsis': 'truncate',
    'text-muted': 'text-gray-500',
    'text-primary': 'text-blue-600',
    'text-success': 'text-green-600',
    'text-warning': 'text-yellow-600',
    'text-error': 'text-red-600',

    // 背景
    'bg-primary': 'bg-blue-500',
    'bg-success': 'bg-green-500',
    'bg-warning': 'bg-yellow-500',
    'bg-error': 'bg-red-500',

    // 安全区域
    'safe-top': 'pt-safe-top',
    'safe-bottom': 'pb-safe-bottom',
    'safe-area': 'pt-safe-top pb-safe-bottom',

    // 容器
    'container-base': 'max-w-screen-lg mx-auto px-4',
    'container-sm': 'max-w-screen-sm mx-auto px-4',
    'container-md': 'max-w-screen-md mx-auto px-4',
    'container-lg': 'max-w-screen-lg mx-auto px-4',
    'container-xl': 'max-w-screen-xl mx-auto px-4',

    // 动画
    'animate-fade-in': 'animate-in fade-in duration-300',
    'animate-fade-out': 'animate-out fade-out duration-300',
    'animate-slide-up': 'animate-in slide-in-from-bottom duration-300',
    'animate-slide-down': 'animate-in slide-in-from-top duration-300',
    'animate-scale-in': 'animate-in zoom-in duration-300',

    // 状态
    'loading': 'animate-pulse opacity-70',
    'disabled': 'opacity-50 cursor-not-allowed',
    'active': 'scale-95 transition-transform duration-75',

    // 分割线
    'divider-h': 'border-t border-gray-200',
    'divider-v': 'border-l border-gray-200',

    // 标签
    'tag-base': 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',

    // 链接
    'link-base': 'text-blue-600 hover:text-blue-800 underline',
    'link-muted': 'text-gray-600 hover:text-gray-800 no-underline hover:underline',

    // 表单
    'form-group': 'mb-4',
    'form-label': 'block text-sm font-medium text-gray-700 mb-1',
    'form-error': 'text-red-600 text-sm mt-1',
    'form-help': 'text-gray-500 text-sm mt-1',
  },
  transformers: [
    // 启用 @apply 功能
    transformerDirectives({
      enforce: 'pre',
    }),
    // https://unocss.dev/transformers/variant-group
    // 启用 () 分组功能
    transformerVariantGroup(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify() as any,
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
});
