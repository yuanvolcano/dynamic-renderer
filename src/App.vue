<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';

onLaunch(() => {
  console.log('App Launch');
});

onShow(() => {
  console.log('App Show');
});

onHide(() => {
  console.log('App Hide');
});
</script>

<style lang="scss">
/* App.vue 中的样式为全局样式，作用于每一个页面 */
/* 测试sass-embedded是否正常工作 */

/* 使用 CSS 变量定义的全局样式 */
page {
  background-color: var(--color-background);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  line-height: 1.6;
}

/* uni-app 全局字体设置 */
.uni-app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 页面级布局样式 */
.page-wrapper {
  min-height: 100vh;
  background-color: var(--color-background);
}

.page-content {
  padding: var(--spacing-base);
}

/* 安全区域适配 */
.safe-area-wrapper {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
</style>
