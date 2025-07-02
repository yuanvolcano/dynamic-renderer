/// <reference types="vite/client" />

// 扩展 ImportMetaEnv 接口，添加自定义环境变量类型
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_ENV: 'development' | 'test' | 'production';
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_APP_DEBUG: string;
  readonly VITE_APP_LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
  readonly VITE_MP_WEIXIN_APP_ID: string;
  readonly VITE_H5_ROUTER_BASE: string;
  readonly VITE_H5_PUBLIC_PATH: string;
  readonly VITE_DROP_CONSOLE: string;
  readonly VITE_DROP_DEBUGGER: string;
  readonly VITE_DEV_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// 声明全局环境变量
declare const __APP_ENV__: string;
declare const __APP_VERSION__: string;
