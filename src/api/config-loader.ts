import { createHttpClient } from './http';

import { IComponentConfig } from '@/types/component';

/**
 * 配置加载器响应接口
 */
export interface ConfigLoaderResponse<T = IComponentConfig[]> {
  /** 是否成功 */
  success: boolean;
  /** 响应数据 */
  data?: T;
  /** 响应消息 */
  message?: string;
  /** 状态码 */
  code?: number;
}

/**
 * 配置加载选项
 */
export interface ConfigLoaderOptions {
  /** 请求超时时间（毫秒），默认 10000 */
  timeout?: number;
  /** 重试次数，默认 0 */
  retries?: number;
  /** 是否缓存结果，默认 false */
  cache?: boolean;
  /** 缓存时间（毫秒），默认 5 分钟 */
  cacheTime?: number;
}

/**
 * 默认配置选项
 */
const DEFAULT_OPTIONS: ConfigLoaderOptions = {
  timeout: 10000,
  retries: 0,
  cache: false,
  cacheTime: 5 * 60 * 1000, // 5分钟
};

/**
 * 缓存存储
 */
const configCache = new Map<string, { data: any; timestamp: number }>();

/**
 * 清理过期缓存
 */
function clearExpiredCache(cacheTime: number): void {
  const now = Date.now();
  for (const [key, value] of configCache.entries()) {
    if (now - value.timestamp > cacheTime) {
      configCache.delete(key);
    }
  }
}

/**
 * 通过网络请求加载配置
 * @param url 配置的URL地址
 * @param options 加载选项
 * @returns Promise<ConfigLoaderResponse<T>>
 */
export async function loadConfigFromNetwork<T = IComponentConfig[]>(
  url: string,
  options: ConfigLoaderOptions = {}
): Promise<ConfigLoaderResponse<T>> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // 检查缓存
  if (opts.cache) {
    clearExpiredCache(opts.cacheTime!);
    const cached = configCache.get(url);
    if (cached && Date.now() - cached.timestamp < opts.cacheTime!) {
      console.log(`[ConfigLoader] 从缓存加载配置: ${url}`);
      return {
        success: true,
        data: cached.data,
        message: '从缓存加载成功',
      };
    }
  }

  // 创建专用的HTTP客户端
  const client = createHttpClient({
    timeout: opts.timeout,
    retries: opts.retries!,
    enableLog: true,
  });

  try {
    console.log(`[ConfigLoader] 开始加载配置: ${url}`);

    const response = await client.get<T>(url, {
      dataType: 'json',
    });

    // 检查响应状态
    if (response.statusCode !== 200) {
      throw new Error(`HTTP ${response.statusCode}: ${response.errMsg || '请求失败'}`);
    }

    // 检查数据结构
    let data = response.data;
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch {
        throw new Error('响应数据不是有效的JSON格式');
      }
    }

    console.log(`[ConfigLoader] 配置加载成功: ${url}`);

    // 缓存结果
    if (opts.cache) {
      configCache.set(url, {
        data,
        timestamp: Date.now(),
      });
    }

    return {
      success: true,
      data: data as T,
      message: '加载成功',
      code: response.statusCode,
    };
  } catch (error: any) {
    console.warn(`[ConfigLoader] 配置加载失败: ${error.message}`);
    return {
      success: false,
      message: error.message || '未知错误',
    };
  }
}

/**
 * 加载多个配置并合并
 * @param urls 配置URL数组
 * @param options 加载选项
 * @returns Promise<ConfigLoaderResponse<T[]>>
 */
export async function loadMultipleConfigs<T = IComponentConfig[]>(
  urls: string[],
  options: ConfigLoaderOptions = {}
): Promise<ConfigLoaderResponse<T[]>> {
  try {
    console.log(`[ConfigLoader] 开始加载多个配置: ${urls.join(', ')}`);

    const results = await Promise.allSettled(urls.map(url => loadConfigFromNetwork<T>(url, options)));

    const successResults: T[] = [];
    const failedUrls: string[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.success) {
        if (result.value.data) {
          successResults.push(result.value.data);
        }
      } else {
        failedUrls.push(urls[index]);
      }
    });

    if (failedUrls.length > 0) {
      console.warn(`[ConfigLoader] 部分配置加载失败: ${failedUrls.join(', ')}`);
    }

    return {
      success: successResults.length > 0,
      data: successResults,
      message: `成功加载 ${successResults.length}/${urls.length} 个配置`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || '批量加载配置失败',
    };
  }
}

/**
 * 模拟网络请求的本地配置加载器（用于开发测试）
 * @param config 本地配置对象
 * @param delay 模拟网络延迟（毫秒）
 * @returns Promise<ConfigLoaderResponse<T>>
 */
export async function loadConfigFromLocal<T = IComponentConfig[]>(
  config: T,
  delay: number = 1000
): Promise<ConfigLoaderResponse<T>> {
  try {
    console.log(`[ConfigLoader] 模拟加载本地配置，延迟 ${delay}ms`);

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, delay));

    // 深拷贝配置避免引用问题
    const configCopy = JSON.parse(JSON.stringify(config));

    console.log('[ConfigLoader] 本地配置加载成功');

    return {
      success: true,
      data: configCopy,
      message: '本地配置加载成功',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || '本地配置加载失败',
    };
  }
}

/**
 * 清空所有缓存
 */
export function clearConfigCache(): void {
  configCache.clear();
  console.log('[ConfigLoader] 已清空所有配置缓存');
}
