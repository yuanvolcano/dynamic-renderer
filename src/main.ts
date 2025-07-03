import { createSSRApp } from 'vue';

import App from './App.vue';
// 引入统一的样式入口文件
import './styles/index.scss';

export function createApp() {
  const app = createSSRApp(App);

  // 可以在这里添加全局配置、插件等

  return {
    app,
  };
}
