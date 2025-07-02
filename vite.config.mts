import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const uni = require('@dcloudio/vite-plugin-uni').default;

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [uni()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    define: {
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      // 注入环境变量到客户端代码中
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION),
      // 强制使用 history 路由模式
      'process.env.UNI_ROUTER_MODE': '"history"',
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(env.VITE_DEV_PORT) || 3000,
      open: true,
      cors: true,
      // 配置 History API fallback 支持 history 路由模式
      historyApiFallback: {
        index: '/index.html',
        rewrites: [
          { from: /^\/pages\/.*$/, to: '/index.html' },
          { from: /^\/.*$/, to: '/index.html' },
        ],
      },
    },
    css: {
      postcss: './postcss.config.js',
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome61',
      // 根据环境变量控制代码压缩
      minify: env.VITE_APP_ENV === 'production' ? 'esbuild' : false,
      sourcemap: env.VITE_APP_ENV !== 'production',
      // 配置公共基础路径
      assetsDir: 'static',
    },
    // 配置基础路径，支持 history 模式
    base: env.VITE_H5_PUBLIC_PATH || '/',
  };
});
