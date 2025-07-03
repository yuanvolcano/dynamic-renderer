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

<style>
/* 注意：App.vue 中的样式为全局样式，作用于每一个页面 */
page {
  @apply bg-gray-50 font-sans;
}

/* uniapp 全局字体设置（Tailwind 在小程序中的备用方案） */
.uni-app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
