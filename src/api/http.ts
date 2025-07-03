/**
 * HTTP 请求配置接口
 */
export interface HttpRequestConfig {
  /** 请求URL */
  url: string;
  /** 请求方法 */
  method?: 'GET' | 'POST' | 'HEAD';
  /** 请求数据 */
  data?: any;
  /** 请求头 */
  headers?: Record<string, string>;
  /** 超时时间（毫秒） */
  timeout?: number;
  /** 数据类型 */
  dataType?: 'json' | 'text';
  /** 响应类型 */
  responseType?: 'text' | 'arraybuffer';
}

/**
 * HTTP 响应接口
 */
export interface HttpResponse<T = any> {
  /** 响应数据 */
  data: T;
  /** 状态码 */
  statusCode: number;
  /** 响应头 */
  header: Record<string, string>;
  /** 错误信息 */
  errMsg?: string;
}

/**
 * HTTP 客户端配置
 */
export interface HttpClientConfig {
  /** 基础URL */
  baseURL?: string;
  /** 默认超时时间 */
  timeout?: number;
  /** 默认请求头 */
  headers?: Record<string, string>;
  /** 重试次数 */
  retries?: number;
  /** 重试间隔（毫秒） */
  retryDelay?: number;
  /** 是否启用日志 */
  enableLog?: boolean;
}

/**
 * 拦截器函数类型
 */
export type RequestInterceptor = (config: HttpRequestConfig) => HttpRequestConfig;
export type ResponseInterceptor<T = any> = (response: HttpResponse<T>) => HttpResponse<T>;
export type ErrorInterceptor = (error: Error) => Error;

/**
 * HTTP 客户端类
 */
export class HttpClient {
  private config: HttpClientConfig;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  constructor(config: HttpClientConfig = {}) {
    this.config = {
      timeout: 10000,
      retries: 0,
      retryDelay: 1000,
      enableLog: true,
      ...config,
    };
  }

  /**
   * 添加请求拦截器
   */
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * 添加响应拦截器
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * 添加错误拦截器
   */
  addErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.errorInterceptors.push(interceptor);
  }

  /**
   * 处理请求配置
   */
  private processRequestConfig(config: HttpRequestConfig): HttpRequestConfig {
    let processedConfig = { ...config };

    // 处理基础URL
    if (this.config.baseURL && !processedConfig.url.startsWith('http')) {
      processedConfig.url = `${this.config.baseURL.replace(/\/$/, '')}/${processedConfig.url.replace(/^\//, '')}`;
    }

    // 合并默认配置
    processedConfig = {
      method: 'GET',
      timeout: this.config.timeout,
      dataType: 'json',
      ...processedConfig,
      headers: { ...this.config.headers, ...processedConfig.headers },
    };

    // 执行请求拦截器
    for (const interceptor of this.requestInterceptors) {
      processedConfig = interceptor(processedConfig);
    }

    return processedConfig;
  }

  /**
   * 处理响应数据
   */
  private processResponse<T>(response: HttpResponse<T>): HttpResponse<T> {
    let processedResponse = { ...response };

    // 执行响应拦截器
    for (const interceptor of this.responseInterceptors) {
      processedResponse = interceptor(processedResponse);
    }

    return processedResponse;
  }

  /**
   * 处理错误
   */
  private async processError(error: Error): Promise<Error> {
    let processedError = error;

    // 执行错误拦截器
    for (const interceptor of this.errorInterceptors) {
      processedError = await interceptor(processedError);
    }

    return processedError;
  }

  /**
   * 发送请求
   */
  private async sendRequest<T = any>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    const processedConfig = this.processRequestConfig(config);

    if (this.config.enableLog) {
      console.log(`[HttpClient] 发送请求: ${processedConfig.method} ${processedConfig.url}`);
    }

    return new Promise((resolve, reject) => {
      uni.request({
        ...processedConfig,
        success: (response: any) => {
          try {
            const processedResponse = this.processResponse<T>(response);
            if (this.config.enableLog) {
              console.log(
                `[HttpClient] 请求成功: ${processedConfig.method} ${processedConfig.url} - ${response.statusCode}`
              );
            }
            resolve(processedResponse);
          } catch (error) {
            reject(error);
          }
        },
        fail: async (error: any) => {
          const processedError = await this.processError(new Error(error.errMsg || '请求失败'));
          if (this.config.enableLog) {
            console.error(
              `[HttpClient] 请求失败: ${processedConfig.method} ${processedConfig.url} - ${processedError.message}`
            );
          }
          reject(processedError);
        },
      });
    });
  }

  /**
   * 带重试的请求
   */
  async request<T = any>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    let lastError: Error;
    const retries = config.timeout !== undefined ? 0 : this.config.retries || 0;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await this.sendRequest<T>(config);
      } catch (error: any) {
        lastError = error;

        if (attempt < retries) {
          const delay = this.config.retryDelay! * (attempt + 1);
          if (this.config.enableLog) {
            console.warn(`[HttpClient] 请求失败，${delay}ms后重试 (${attempt + 1}/${retries}): ${error.message}`);
          }
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError!;
  }

  /**
   * GET 请求
   */
  async get<T = any>(url: string, config: Omit<HttpRequestConfig, 'url' | 'method'> = {}): Promise<HttpResponse<T>> {
    return this.request<T>({
      ...config,
      url,
      method: 'GET',
    });
  }

  /**
   * POST 请求
   */
  async post<T = any>(
    url: string,
    data?: any,
    config: Omit<HttpRequestConfig, 'url' | 'method' | 'data'> = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>({
      ...config,
      url,
      method: 'POST',
      data,
    });
  }

  /**
   * 设置基础URL
   */
  setBaseURL(baseURL: string): void {
    this.config.baseURL = baseURL;
  }

  /**
   * 设置默认请求头
   */
  setDefaultHeaders(headers: Record<string, string>): void {
    this.config.headers = { ...this.config.headers, ...headers };
  }

  /**
   * 设置超时时间
   */
  setTimeout(timeout: number): void {
    this.config.timeout = timeout;
  }

  /**
   * 获取当前配置
   */
  getConfig(): HttpClientConfig {
    return { ...this.config };
  }
}

/**
 * 创建默认的 HTTP 客户端实例
 */
export const httpClient = new HttpClient({
  timeout: 10000,
  retries: 2,
  retryDelay: 1000,
  enableLog: true,
});

/**
 * 创建自定义 HTTP 客户端
 */
export function createHttpClient(config: HttpClientConfig = {}): HttpClient {
  return new HttpClient(config);
}

/**
 * 默认导出的便捷方法
 */
export default {
  get: <T = any>(url: string, config?: Omit<HttpRequestConfig, 'url' | 'method'>) => httpClient.get<T>(url, config),
  post: <T = any>(url: string, data?: any, config?: Omit<HttpRequestConfig, 'url' | 'method' | 'data'>) =>
    httpClient.post<T>(url, data, config),
  request: <T = any>(config: HttpRequestConfig) => httpClient.request<T>(config),
  createClient: createHttpClient,
  client: httpClient,
};
