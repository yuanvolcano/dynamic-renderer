import { createSSRApp } from 'vue';

import App from './App.vue';
// 引入 UnoCSS 样式
import 'uno.css';
// 引入统一的样式入口文件
import './styles/index.scss';
// 引入全局指令
// import setupDirectives from './directives';

export function createApp() {
  const app = createSSRApp(App);

  // 注册全局指令
  // setupDirectives(app);

  // 可以在这里添加全局配置、插件等

  return {
    app,
  };
}
