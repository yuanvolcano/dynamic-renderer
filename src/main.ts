import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)

  // 可以在这里添加全局配置、插件等

  return {
    app
  }
}
