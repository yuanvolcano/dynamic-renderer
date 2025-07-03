import { defineAsyncComponent } from 'vue';

import { getCamelToDashName } from '@/utils/common';

/* 加载基础组件 */
function installBaseComponent(componentName: string) {
  const formatName = getCamelToDashName(componentName);
  // 如果不是 base 组件，则直接 return
  if (!formatName.startsWith('base-')) return;
  let isSuccess = true;

  const com = defineAsyncComponent({
    loader: () => import(`../components/base-components/${formatName}/index.vue`),
    onError: (error, retry, fail, attempts) => {
      if (error.message.includes('fetch') && attempts <= 3) {
        // 如果错误信息包含 'fetch'，则重试加载最多 3 次
        retry();
      } else {
        isSuccess = false;
        // 如果重试 3 次后仍然失败，那么调用 `fail` 函数
        fail();
      }
    },
    loadingComponent: () => import('@/components/base-components/base-ins-com-loading/index.vue'),
    errorComponent: () => import('@/components/base-components/base-ins-com-error/index.vue'),
  });

  return {
    isSuccess,
    com,
  };
}

/* 加载业务组件 */
function installBusinessComponent(componentName: string) {
  const formatName = getCamelToDashName(componentName);
  // 如果不是 business 组件，则直接 return
  if (!formatName.startsWith('business-')) return;
  let isSuccess = true;

  const com = defineAsyncComponent({
    loader: () => import(`../components/business-components/${formatName}/index.vue`),
    onError: (error, retry, fail, attempts) => {
      if (error.message.includes('fetch') && attempts <= 3) {
        // 如果错误信息包含 'fetch'，则重试加载最多 3 次
        retry();
      } else {
        isSuccess = false;
        // 如果重试 3 次后仍然失败，那么调用 `fail` 函数
        fail();
      }
    },
    loadingComponent: () => import('@/components/base-components/base-ins-com-loading/index.vue'),
    errorComponent: () => import('@/components/base-components/base-ins-com-error/index.vue'),
  });

  return {
    isSuccess,
    com,
  };
}

export default function useInstallCom() {
  const dynamicComponents: Record<string, any> = {};
  const loadFailedList: string[] = [];

  const installCom = (comList: string[]) => {
    comList.forEach(componentName => {
      const formatName = getCamelToDashName(componentName);
      // 基础组件
      if (formatName.startsWith('base-')) {
        const installResult = installBaseComponent(componentName);
        if (!installResult) {
          return;
        }

        if (installResult?.isSuccess) {
          dynamicComponents[componentName] = installResult.com;
        } else {
          loadFailedList.push(componentName);
        }
      }
      // 这里可以继续拓展 else-if，比如从三方 UI 库，或者自定义组件
      else {
        const installResult = installBusinessComponent(componentName);
        if (!installResult) {
          return;
        }

        if (installResult?.isSuccess) {
          dynamicComponents[componentName] = installResult.com;
        } else {
          loadFailedList.push(componentName);
        }
      }
    });

    return {
      dynamicComponents,
      loadFailedList,
    };
  };

  return {
    installCom,
  };
}
