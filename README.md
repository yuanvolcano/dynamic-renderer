# 跨平台动态UI构建平台

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![uniapp](https://img.shields.io/badge/uniapp-2B2B2B?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02NCA2NEw5NiAzMkwxMjggNjRMOTYgOTZMNjQgNjRaIiBmaWxsPSIjNDI4NUY0Ii8+CjxwYXRoIGQ9Ik02NCA2NEwzMiAzMkwwIDY0TDMyIDk2TDY0IDY0WiIgZmlsbD0iIzM0QTg1MyIvPgo8L3N2Zz4K)](https://uniapp.dcloud.net.cn/)

> 基于 TypeScript + Vite + pnpm + Vue3 + uniapp 的跨平台动态UI构建平台

## ✨ 项目特色

- 🚀 **现代化技术栈** - TypeScript + Vue3 + Vite + uniapp
- 📱 **跨平台支持** - 一套代码，同时支持H5和微信小程序
- 🔄 **动态渲染** - 基于JSON配置动态生成UI界面
- 🧩 **组件化架构** - 高度模块化，易于扩展
- 🎯 **类型安全** - 完整的TypeScript类型定义
- ⚡ **开发体验** - 热重载、代码检查、自动格式化

## 🎯 核心功能

### 统一UI数据格式

设计了通用的JSON格式来描述UI结构、组件和属性，实现跨平台的配置统一。

### 动态渲染引擎

- **DynamicRenderer** - 核心动态渲染组件
- **UIRenderer** - 渲染器逻辑类
- 支持组件的动态加载、更新和删除

### 基础组件库

- **base-container** - 布局容器，支持flex布局
- **base-text** - 文本展示组件
- **base-button** - 交互按钮组件
- **base-input** - 输入框组件
- **base-image** - 图片展示组件

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- pnpm >= 7

### 安装依赖

```bash
pnpm install
```

### 开发调试

```bash
# H5开发
pnpm dev:h5

# 微信小程序开发
pnpm dev:mp-weixin
```

### 生产构建

```bash
# 构建H5
pnpm build:h5

# 构建微信小程序
pnpm build:mp-weixin
```

### 代码质量

```bash
# TypeScript类型检查
pnpm type-check

# 代码格式化
pnpm format
```

## �� 项目结构

```
src/
├── api/                     # API接口相关
│   ├── config-loader.ts     # 配置加载器
│   └── http.ts             # HTTP请求封装
├── components/              # 组件目录
│   ├── base-components/     # 基础组件库
│   │   ├── base-button/     # 按钮组件
│   │   ├── base-checkbox/   # 复选框组件
│   │   ├── base-container/  # 容器组件
│   │   ├── base-image/      # 图片组件
│   │   ├── base-input/      # 输入框组件
│   │   ├── base-radio/      # 单选框组件
│   │   ├── base-select/     # 选择器组件
│   │   ├── base-switch/     # 开关组件
│   │   ├── base-text/       # 文本组件
│   │   ├── base-textarea/   # 文本域组件
│   │   └── ...             # 其他基础组件
│   ├── business-components/ # 业务组件
│   └── dynamic-renderer/    # 动态渲染器
│       ├── index.vue        # 主渲染器
│       └── dynamic-ui-renderer/ # UI渲染器
├── constants/               # 常量定义
│   ├── constants.ts         # 通用常量
│   └── enums.ts            # 枚举值
├── core/                   # 核心逻辑
├── directives/             # Vue指令
│   ├── index.ts            # 指令导出
│   └── loading.ts          # 加载指令
├── docs/                   # 文档目录
├── hooks/                  # Vue组合式API
│   ├── use-context-utils.ts
│   ├── use-dynamic-context.ts
│   └── use-install-com.ts
├── pages/                  # 页面目录
│   ├── demo/               # 演示页面
│   ├── demo-async-events/  # 异步事件演示
│   ├── form/               # 表单页面
│   ├── home/               # 首页
│   ├── layout/             # 布局页面
│   └── components/         # 页面级组件
├── static/                 # 静态资源
│   └── images/             # 图片资源
├── styles/                 # 样式文件
│   ├── index.scss          # 主样式
│   ├── reset.scss          # 重置样式
│   └── tailwind.css        # Tailwind样式
├── types/                  # 类型定义
│   ├── component.ts        # 组件类型
│   └── env.d.ts           # 环境类型
├── utils/                  # 工具函数
│   ├── common.ts           # 通用工具
│   ├── env.ts             # 环境工具
│   ├── parse-expression.ts # 表达式解析器
│   ├── router.ts          # 路由工具
│   └── sampleData.ts      # 示例数据
├── App.vue                 # 应用根组件
├── main.ts                 # 应用入口
├── manifest.json           # uniapp配置
└── pages.json             # 页面路由配置
```

## 🔧 技术栈

- **前端框架**: Vue3 + Composition API
- **开发语言**: TypeScript
- **构建工具**: Vite
- **包管理器**: pnpm
- **跨平台**: uniapp
- **代码规范**: ESLint + Prettier + EditorConfig

## 📱 平台支持

- ✅ H5 (Web应用)
- ✅ 微信小程序
- 🔄 支付宝小程序 (计划中)
- 🔄 抖音小程序 (计划中)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

[MIT License](LICENSE)
