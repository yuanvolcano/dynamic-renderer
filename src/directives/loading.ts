import type { Directive, DirectiveBinding } from 'vue';

interface LoadingElement extends HTMLElement {
  _loadingWrapper?: HTMLElement;
  _originalPosition?: string;
  _originalOverflow?: string;
}

// 创建加载中的 DOM 结构
const createLoadingElement = (): HTMLElement => {
  const wrapper = document.createElement('div');
  wrapper.className = 'v-loading-wrapper';
  wrapper.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(1px);
  `;

  const spinner = document.createElement('div');
  spinner.className = 'v-loading-spinner';
  spinner.style.cssText = `
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: v-loading-spin 1s linear infinite;
  `;

  // 添加旋转动画
  const style = document.createElement('style');
  style.textContent = `
    @keyframes v-loading-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  if (!document.head.querySelector('style[data-v-loading]')) {
    style.setAttribute('data-v-loading', '');
    document.head.appendChild(style);
  }

  wrapper.appendChild(spinner);
  return wrapper;
};

// 添加加载状态
const addLoading = (el: LoadingElement): void => {
  // 设置相对定位，确保加载层能正确覆盖
  const computed = getComputedStyle(el);
  if (computed.position === 'static') {
    el._originalPosition = el.style.position;
    el.style.position = 'relative';
  }

  // 防止滚动
  if (computed.overflow !== 'hidden') {
    el._originalOverflow = el.style.overflow;
    el.style.overflow = 'hidden';
  }

  // 创建并添加加载层
  const loadingWrapper = createLoadingElement();
  el._loadingWrapper = loadingWrapper;
  el.appendChild(loadingWrapper);
};

// 移除加载状态
const removeLoading = (el: LoadingElement): void => {
  if (el._loadingWrapper) {
    el.removeChild(el._loadingWrapper);
    el._loadingWrapper = undefined;
  }

  // 恢复原始样式
  if (el._originalPosition !== undefined) {
    el.style.position = el._originalPosition;
    el._originalPosition = undefined;
  }

  if (el._originalOverflow !== undefined) {
    el.style.overflow = el._originalOverflow;
    el._originalOverflow = undefined;
  }
};

const vLoading: Directive = {
  mounted(el: LoadingElement, binding: DirectiveBinding<boolean>) {
    if (binding.value) {
      addLoading(el);
    }
  },

  updated(el: LoadingElement, binding: DirectiveBinding<boolean>) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        addLoading(el);
      } else {
        removeLoading(el);
      }
    }
  },

  unmounted(el: LoadingElement) {
    removeLoading(el);
  },
};

export default vLoading;
