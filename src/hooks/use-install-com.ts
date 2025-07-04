import { defineAsyncComponent } from 'vue';

// #ifdef MP-WEIXIN
import BaseButton from '@/components/base-components/base-button/index.vue';
import BaseCheckbox from '@/components/base-components/base-checkbox/index.vue';
import BaseContainer from '@/components/base-components/base-container/index.vue';
import BaseImage from '@/components/base-components/base-image/index.vue';
import BaseInput from '@/components/base-components/base-input/index.vue';
import BaseInsComError from '@/components/base-components/base-ins-com-error/index.vue';
import BaseInsComLoading from '@/components/base-components/base-ins-com-loading/index.vue';
import BaseRadio from '@/components/base-components/base-radio/index.vue';
import BaseRadioGroup from '@/components/base-components/base-radio-group/index.vue';
import BaseSelect from '@/components/base-components/base-select/index.vue';
import BaseSwitch from '@/components/base-components/base-switch/index.vue';
import BaseText from '@/components/base-components/base-text/index.vue';
import BaseTextarea from '@/components/base-components/base-textarea/index.vue';
// #endif
import { getCamelToDashName } from '@/utils/common';

// #ifdef MP-WEIXIN
// 小程序平台直接导入组件，避免使用 defineAsyncComponent
function installComponentWeixin() {
  return {
    BaseButton,
    BaseCheckbox,
    BaseContainer,
    BaseImage,
    BaseInput,
    BaseInsComError,
    BaseInsComLoading,
    BaseRadio,
    BaseRadioGroup,
    BaseSelect,
    BaseSwitch,
    BaseText,
    BaseTextarea,
  };
}
// #endif

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
  let dynamicComponents: Record<string, any> = {};
  const loadFailedList: string[] = [];

  const installCom = (comList: string[]) => {
    // #ifdef H5
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
      // 这里可以通过 else-if 继续拓展 ，比如从三方 UI 库，或者自定义组件
      else if (formatName.startsWith('business-')) {
        // 业务组件
        const installResult = installBusinessComponent(componentName);
        if (!installResult) {
          return;
        }

        if (installResult?.isSuccess) {
          dynamicComponents[componentName] = installResult.com;
        } else {
          loadFailedList.push(componentName);
        }
      } else {
        // 使用 内置组件
        dynamicComponents[componentName] = formatName;
      }
    });
    // #endif

    // #ifdef MP-WEIXIN
    console.log('~~ installComponentWeixin');
    dynamicComponents = installComponentWeixin();
    // #endif

    return {
      dynamicComponents,
      loadFailedList,
    };
  };

  return {
    installCom,
  };
}
