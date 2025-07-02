<template>
    <view class="tailwind-demo">
        <view class="mb-6">
            <text class="text-2xl font-bold text-gray-800 mb-4 block">🎨 Tailwind CSS 样式演示</text>
            <text class="text-gray-600 text-sm block mb-4">展示在 uniapp 中使用 Tailwind CSS 的各种样式效果</text>
        </view>

        <!-- 按钮样式演示 -->
        <view class="card p-4 mb-6">
            <text class="text-lg font-semibold text-gray-700 mb-3 block">按钮样式</text>
            <view class="flex flex-wrap gap-3">
                <button class="btn btn-primary">主要按钮</button>
                <button class="btn btn-secondary">次要按钮</button>
                <button class="btn btn-success">成功按钮</button>
                <button class="btn btn-warning">警告按钮</button>
                <button class="btn btn-info">信息按钮</button>
            </view>

            <view class="mt-4">
                <text class="text-sm text-gray-500 block mb-2">轮廓按钮：</text>
                <view class="flex flex-wrap gap-3">
                    <button class="btn btn-outline text-primary-500 border-primary-500">主要轮廓</button>
                    <button class="btn btn-outline text-gray-500 border-gray-500">次要轮廓</button>
                </view>
            </view>
        </view>

        <!-- 颜色演示 -->
        <view class="card p-4 mb-6">
            <text class="text-lg font-semibold text-gray-700 mb-3 block">颜色系统</text>
            <view class="grid grid-cols-2 gap-3">
                <view class="bg-primary-500 text-white p-3 rounded text-center text-sm">Primary 500</view>
                <view class="bg-success text-white p-3 rounded text-center text-sm">Success</view>
                <view class="bg-warning text-white p-3 rounded text-center text-sm">Warning</view>
                <view class="bg-info text-white p-3 rounded text-center text-sm">Info</view>
            </view>

            <text class="text-sm text-gray-500 block mt-3 mb-2">灰度色阶：</text>
            <view class="flex">
                <view class="bg-gray-100 p-2 flex-1 text-center text-xs text-gray-600">100</view>
                <view class="bg-gray-300 p-2 flex-1 text-center text-xs text-gray-700">300</view>
                <view class="bg-gray-500 p-2 flex-1 text-center text-xs text-white">500</view>
                <view class="bg-gray-700 p-2 flex-1 text-center text-xs text-white">700</view>
                <view class="bg-gray-900 p-2 flex-1 text-center text-xs text-white">900</view>
            </view>
        </view>

        <!-- 间距和布局 -->
        <view class="card p-4 mb-6">
            <text class="text-lg font-semibold text-gray-700 mb-3 block">间距和布局</text>
            <view class="space-y-3">
                <view class="p-2 bg-blue-50 border border-blue-200 rounded">
                    <text class="text-blue-700 text-sm">padding: 0.5rem (p-2)</text>
                </view>
                <view class="p-4 bg-green-50 border border-green-200 rounded">
                    <text class="text-green-700 text-sm">padding: 1rem (p-4)</text>
                </view>
                <view class="p-6 bg-purple-50 border border-purple-200 rounded">
                    <text class="text-purple-700 text-sm">padding: 1.5rem (p-6)</text>
                </view>
            </view>
        </view>

        <!-- 文本样式 -->
        <view class="card p-4 mb-6">
            <text class="text-lg font-semibold text-gray-700 mb-3 block">文本样式</text>
            <view class="space-y-2">
                <text class="text-xs text-gray-500 block">超小文本 (text-xs)</text>
                <text class="text-sm text-gray-600 block">小文本 (text-sm)</text>
                <text class="text-base text-gray-700 block">基础文本 (text-base)</text>
                <text class="text-lg text-gray-800 block">大文本 (text-lg)</text>
                <text class="text-xl font-medium text-gray-800 block">特大文本 (text-xl)</text>
                <text class="text-2xl font-bold text-gray-900 block">超大标题 (text-2xl)</text>
            </view>

            <view class="mt-4 space-y-2">
                <text class="block font-light text-gray-600">细体文本 (font-light)</text>
                <text class="block font-normal text-gray-700">正常文本 (font-normal)</text>
                <text class="block font-medium text-gray-800">中等文本 (font-medium)</text>
                <text class="block font-semibold text-gray-800">半粗体文本 (font-semibold)</text>
                <text class="block font-bold text-gray-900">粗体文本 (font-bold)</text>
            </view>
        </view>

        <!-- 阴影和圆角 */
    <view class="card p-4 mb-6">
      <text class="text-lg font-semibold text-gray-700 mb-3 block">阴影和圆角</text>
      <view class="grid grid-cols-2 gap-4">
        <view class="bg-white p-4 rounded shadow-sm border">
          <text class="text-sm text-gray-600">轻微阴影 (shadow-sm)</text>
        </view>
        <view class="bg-white p-4 rounded-lg shadow-md">
          <text class="text-sm text-gray-600">中等阴影 (shadow-md)</text>
        </view>
        <view class="bg-white p-4 rounded-xl shadow-lg">
          <text class="text-sm text-gray-600">较大阴影 (shadow-lg)</text>
        </view>
        <view class="bg-white p-4 rounded-2xl shadow-xl">
          <text class="text-sm text-gray-600">超大阴影 (shadow-xl)</text>
        </view>
      </view>
    </view>

    <!-- 响应式设计演示 -->
        <view class="card p-4 mb-6">
            <text class="text-lg font-semibold text-gray-700 mb-3 block">响应式网格</text>
            <view class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <view class="bg-gradient-to-r from-pink-400 to-red-400 p-4 rounded text-white text-center">
                    <text class="text-sm">网格项 1</text>
                </view>
                <view class="bg-gradient-to-r from-blue-400 to-purple-400 p-4 rounded text-white text-center">
                    <text class="text-sm">网格项 2</text>
                </view>
                <view class="bg-gradient-to-r from-green-400 to-blue-400 p-4 rounded text-white text-center">
                    <text class="text-sm">网格项 3</text>
                </view>
            </view>
        </view>

        <!-- 自定义工具类演示 -->
        <view class="card p-4">
            <text class="text-lg font-semibold text-gray-700 mb-3 block">自定义工具类</text>
            <view class="space-y-3">
                <text class="text-ellipsis-2 text-gray-600 text-sm block">
                    这是一个很长的文本内容，用于演示文本截断效果。这段文本会在两行后被截断并显示省略号。
                    继续添加更多内容来测试截断效果的实际表现。
                </text>
                <view class="backdrop-blur-safe bg-white/80 p-4 rounded-lg border">
                    <text class="text-sm text-gray-700">带有毛玻璃效果的卡片</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
// Tailwind CSS 演示组件
// 无需额外的逻辑代码
</script>

<style scoped>
/* 这里不需要额外的样式，全部使用 Tailwind 类名 */
.tailwind-demo {
    @apply container-safe;
}
</style>
