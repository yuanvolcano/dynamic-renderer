<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'BaseCheckbox' });

interface ICheckboxItem {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface IProps {
  // 支持两种模式：
  // 1. 单个复选框：modelValue 为 boolean
  // 2. 复选框组：modelValue 为 (string | number)[]
  modelValue: boolean | (string | number)[];
  label?: string;
  disabled?: boolean;
  // 当提供 list 时，组件渲染为复选框组
  list?: ICheckboxItem[];
  // 单个复选框模式下的值（仅在复选框组模式下使用）
  value?: string | number;
  // 样式相关
  cssClass?: string;
  cssStyle?: Record<string, any>;
  checkboxClass?: string;
  labelClass?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  label: '',
  disabled: false,
  cssClass: '',
  cssStyle: () => ({}),
  checkboxClass: '',
  labelClass: '',
});

const emits = defineEmits<{
  'update:modelValue': [value: boolean | (string | number)[]];
}>();

// 判断是否为复选框组模式
const isGroupMode = computed(() => !!props.list && props.list.length > 0);

// 计算容器样式
const containerStyle = computed(() => {
  return {
    ...(props.cssStyle || {}),
  };
});

// 单个复选框变化处理 - 使用 checkbox-group 包装单个复选框
const handleSingleChange = (e: any) => {
  const selectedValues = e.detail.value;
  const isChecked = selectedValues.includes('checked');
  emits('update:modelValue', isChecked);
};

// 复选框组变化处理
const handleGroupChange = (e: any) => {
  const selectedValues = e.detail.value;
  emits('update:modelValue', selectedValues);
};

// 检查某个选项是否被选中（复选框组模式）
const isChecked = (itemValue: string | number): boolean => {
  const currentValue = props.modelValue as (string | number)[];
  return currentValue.includes(itemValue);
};

// 单个复选框是否选中
const isSingleChecked = computed(() => {
  return props.modelValue as boolean;
});
</script>

<template>
  <!-- 复选框组模式 -->
  <view v-if="isGroupMode" :class="['base-checkbox-group', cssClass || '']" :style="containerStyle">
    <checkbox-group @change="handleGroupChange">
      <label
        v-for="item in list"
        :key="item.value"
        :class="['base-checkbox-item', labelClass || '', { 'is-disabled': item.disabled || disabled }]"
      >
        <checkbox
          :value="item.value"
          :checked="isChecked(item.value)"
          :disabled="item.disabled || disabled"
          :class="checkboxClass || ''"
        />
        <text class="checkbox-label">{{ item.label }}</text>
      </label>
    </checkbox-group>
  </view>

  <!-- 单个复选框模式 - 也使用 checkbox-group 包装以确保事件正确触发 -->
  <view v-else :class="['base-checkbox-single', cssClass || '', { 'is-disabled': disabled }]" :style="containerStyle">
    <checkbox-group @change="handleSingleChange">
      <label :class="['base-checkbox-item', labelClass || '']">
        <checkbox value="checked" :checked="isSingleChecked" :disabled="disabled" :class="checkboxClass" />
        <text v-if="label || $slots.default" :class="['checkbox-label', labelClass]">
          <slot>{{ label }}</slot>
        </text>
      </label>
    </checkbox-group>
  </view>
</template>

<style lang="scss" scoped>
.base-checkbox-group,
.base-checkbox-single {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.base-checkbox-item {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 8rpx 0;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox-label {
    flex: 1;
    font-size: 28rpx;
    color: #333;
    line-height: 1.4;
  }

  &:hover:not(.is-disabled) {
    opacity: 0.8;
  }
}

// 可以根据需要添加更多样式
.base-checkbox-group {
  &.horizontal {
    flex-direction: row;
    flex-wrap: wrap;

    .base-checkbox-item {
      margin-right: 32rpx;
    }
  }
}

// 单个复选框的特殊样式调整
.base-checkbox-single {
  gap: 0; // 单个复选框不需要额外间距

  .base-checkbox-item {
    padding: 0; // 移除内边距，保持紧凑
  }
}
</style>
