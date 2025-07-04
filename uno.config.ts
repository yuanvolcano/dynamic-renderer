import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetWeapp } from 'unocss-preset-weapp';
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer';

const { presetWeappAttributify, transformerAttributify } = extractorAttributify();

export default defineConfig({
  // 指定要扫描的文件路径
  content: {
    filesystem: [
      'src/**/*.{vue,ts,js}',
      'pages/**/*.{vue,ts,js}',
      'components/**/*.{vue,ts,js}',
      'src/pages/**/*.{vue,ts,js}',
      'src/components/**/*.{vue,ts,js}',
    ],
  },
  // 强制生成这些样式类（safelist）
  safelist: [
    // 布局类
    'w-full',
    'h-full',
    'w-48',
    'w-60',
    'h-32',
    'h-12',
    'h-60',
    'w-[120px]',
    'h-[60px]',
    'flex',
    'flex-1',
    'flex-col',
    'flex-wrap',
    'items-center',
    'justify-center',
    'justify-between',

    // 间距类
    'p-3',
    'p-4',
    'p-6',
    'px-3',
    'px-4',
    'px-6',
    'py-2',
    'py-3',
    'pb-20',
    'my-8',
    'mb-2',
    'mb-4',
    'mb-6',
    'mt-4',
    'ml-4',
    'mr-4',
    'mt-4',
    'mt-6',
    'mt-8',
    'gap-4',

    // 背景色
    'bg-white',
    'bg-gray-50',
    'bg-gray-100',
    'bg-gray-800',
    'bg-blue-500',
    'bg-blue-600',
    'bg-blue-700',
    'bg-pink-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-green-600',

    // 文字颜色
    'text-white',
    'text-gray-700',
    'text-gray-800',
    'text-blue-600',

    // 文字大小和字重
    'text-base',
    'text-lg',
    'text-xl',
    'text-2xl',
    'font-bold',
    'font-medium',

    // 边框和圆角
    'border',
    'border-gray-200',
    'border-gray-300',
    'rounded-lg',

    // 其他
    'overflow-hidden',
    'overflow-auto',
    'cursor-pointer',
    'shadow-lg',
    'text-center',
    'text-5xl',
    'text-6xl',
    'min-h-screen',
    'block',
  ],
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
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  theme: {
    colors: {
      primary: {
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      },
      success: '#10b981',
      warning: '#f59e0b',
      info: '#06b6d4',
      error: '#ef4444',
    },
    animation: {
      'fade-in': 'fadeIn 0.3s ease-in-out',
      'fade-out': 'fadeOut 0.3s ease-in-out',
      'slide-up': 'slideUp 0.3s ease-in-out',
      'slide-down': 'slideDown 0.3s ease-in-out',
      'scale-in': 'scaleIn 0.3s ease-in-out',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      fadeOut: {
        '0%': { opacity: '1' },
        '100%': { opacity: '0' },
      },
      slideUp: {
        '0%': { transform: 'translateY(100%)' },
        '100%': { transform: 'translateY(0)' },
      },
      slideDown: {
        '0%': { transform: 'translateY(-100%)' },
        '100%': { transform: 'translateY(0)' },
      },
      scaleIn: {
        '0%': { transform: 'scale(0.9)', opacity: '0' },
        '100%': { transform: 'scale(1)', opacity: '1' },
      },
    },
  },
  /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: {
    // 边框
    'border-base': 'border border-gray-500_10',

    // 布局
    center: 'flex justify-center items-center',
    'center-x': 'flex justify-center',
    'center-y': 'flex items-center',
    'full-center': 'w-full h-full flex items-center justify-center',

    // 按钮基础样式（整合原 tailwind.css 和现有样式）
    btn: 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer select-none',
    'btn-sm': 'px-3 py-1.5 text-sm',
    'btn-lg': 'px-6 py-3 text-lg',
    'btn-primary': 'btn bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
    'btn-secondary': 'btn bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700',
    'btn-success': 'btn bg-success text-white hover:opacity-80 active:opacity-70',
    'btn-warning': 'btn bg-warning text-white hover:opacity-80 active:opacity-70',
    'btn-info': 'btn bg-info text-white hover:opacity-80 active:opacity-70',
    'btn-outline': 'btn border-2 border-current bg-transparent hover:bg-current hover:text-white',

    // 兼容原有按钮样式（保持向后兼容）
    'btn-base': 'btn',

    // 卡片样式（整合原 tailwind.css 和现有样式）
    card: 'bg-white rounded-lg shadow-sm border border-gray-100',
    'card-base': 'card',
    'card-hover': 'card hover:shadow-md transition-shadow duration-200',

    // 输入框
    'input-base':
      'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',

    // 文本样式
    'text-ellipsis': 'truncate',
    'text-ellipsis-2': 'line-clamp-2',
    'text-ellipsis-3': 'line-clamp-3',
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
    'container-safe': 'px-4 pt-safe-top pb-safe-bottom',

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
    loading: 'animate-pulse opacity-70',
    disabled: 'opacity-50 cursor-not-allowed',
    active: 'scale-95 transition-transform duration-75',

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

    // 背景模糊特效
    'backdrop-blur-safe': 'backdrop-blur-10',
  },
  rules: [
    // 自定义规则用于实现复杂的样式
    [
      'text-ellipsis-2',
      {
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': '2',
        '-webkit-box-orient': 'vertical',
      },
    ],
    [
      'text-ellipsis-3',
      {
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': '3',
        '-webkit-box-orient': 'vertical',
      },
    ],
    [
      'backdrop-blur-safe',
      {
        'backdrop-filter': 'blur(10px)',
        '-webkit-backdrop-filter': 'blur(10px)',
      },
    ],
  ],
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
