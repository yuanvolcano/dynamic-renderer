<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch')
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style>
/* 注意：App.vue 中的样式为全局样式，作用于每一个页面 */
page {
  background-color: #f8f8f8;
}

/* 全局字体设置 */
.uni-app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 通用样式 */
.container {
  padding: 20rpx;
}

.text-center {
  text-align: center;
}

.text-primary {
  color: #3cc51f;
}

.text-secondary {
  color: #999;
}
</style>
