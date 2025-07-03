<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';

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

<style>
/* 注意：App.vue 中的样式为全局样式，作用于每一个页面 */
page {
  @apply bg-gray-50 font-sans;
}

/* uniapp 全局字体设置（Tailwind 在小程序中的备用方案） */
.uni-app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 自定义全局工具类 */
.container-page {
  @apply p-5;
}

/* 兼容原有样式的过渡类 */
.text-center {
  @apply text-center;
}

.text-primary {
  @apply text-success;
}

.text-secondary {
  @apply text-gray-500;
}
</style>
