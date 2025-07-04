<script setup lang="ts">
import DynamicUIRendererH5 from './h5.vue';
import DynamicUIRendererWX from './wx.vue';

defineOptions({
  name: 'DynamicUIRenderer',
});
</script>

<template>
  <!-- <component
    v-if="isVisible"
    :is="getCurrentComponent(config.componentName)"
    v-bind="buildComponentProps(config)"
    :modelValue="modelValue"
    :style="mergedStyle"
    :class="mergedClass"
    @click="($event: any) => handleClick($event, config)"
    @update:modelValue="($event: any) => handleUpdateModelValue($event, config)"
    @change="($event: any) => handleEvent('change', $event, config)"
    @focus="($event: any) => handleEvent('focus', $event, config)"
    @blur="($event: any) => handleEvent('blur', $event, config)"
  >
    <template v-if="config.children">
      <DynamicUIRenderer
        v-for="child in config.children"
        :key="child.id"
        :config="child"
        :getCurrentComponent="getCurrentComponent"
        :dynamic-context="dynamicContext"
      />
    </template>
  </component> -->

  <!-- #ifdef MP-WEIXIN -->
  <view>wx</view>
  <DynamicUIRendererWX v-bind="$attrs" />
  <view>wx end</view>
  <!-- #endif -->

  <!-- #ifdef H5 -->
  <DynamicUIRendererH5 v-bind="$attrs" />
  <!-- #endif -->
</template>

<style lang="scss" scoped>
/* 底层UI渲染器不需要特殊样式 */
</style>
