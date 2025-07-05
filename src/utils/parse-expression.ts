import { isObjectType } from './common';

import { EValueMode, IModeCondition, TExpression, TValueCondition } from '@/types/component';

/**
 * @description — 组装最终的表达式
 */
export const getFinalCondition = (condition: TExpression | TExpression[]): TExpression => {
  let finalCondition = '';
  if (Array.isArray(condition)) {
    finalCondition = `{{ ${condition.join(' || ')} }}`;
  } else {
    if (['undefined', 'number', 'boolean'].includes(typeof condition)) {
      return condition;
    }
    finalCondition = `{{ ${condition} }}`;
  }

  return finalCondition;
};

const proxyHandler = (expression: string): ProxyHandler<any> => {
  return {
    get(target, key, receiver) {
      if (typeof target[key] === 'object' && target[key] !== null) {
        return new Proxy(target[key], proxyHandler(expression));
      }
      return Reflect.get(target, key, receiver);
    },
    set() {
      throw new Error(`expression: ${expression} should not modify scope`);
    },
  };
};

// 简单的表达式解析器，专为小程序环境设计
function evaluateSimpleExpression(
  expression: string,
  scope: Record<string, any>,
  allModuleData?: Record<string, any>,
  extraData?: Record<string, any>
): any {
  // 支持的简单表达式类型
  const context = {
    $: scope,
    $$: allModuleData,
    $$$: extraData,
  };

  try {
    // 移除表达式两端的空格
    const trimmed = expression.trim();

    // 处理取反操作 - 需要先处理，因为它可能包含复杂的子表达式
    if (trimmed.startsWith('!')) {
      const innerExpression = trimmed.slice(1).trim();
      return !evaluateSimpleExpression(innerExpression, scope, allModuleData, extraData);
    }

    // 处理括号表达式
    if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
      const innerExpression = trimmed.slice(1, -1).trim();
      return evaluateSimpleExpression(innerExpression, scope, allModuleData, extraData);
    }

    // 处理逻辑操作符 - 需要考虑操作符优先级
    // 首先处理 || (优先级最低)
    const orParts = splitByOperator(trimmed, '||');
    if (orParts.length > 1) {
      return orParts.some(part => evaluateSimpleExpression(part.trim(), scope, allModuleData, extraData));
    }

    // 然后处理 && (优先级较高)
    const andParts = splitByOperator(trimmed, '&&');
    if (andParts.length > 1) {
      return andParts.every(part => evaluateSimpleExpression(part.trim(), scope, allModuleData, extraData));
    }

    // 处理比较操作
    if (trimmed.includes('===')) {
      const [left, right] = splitByOperator(trimmed, '===');
      return evaluateValue(left.trim(), context) === evaluateValue(right.trim(), context);
    }

    if (trimmed.includes('!==')) {
      const [left, right] = splitByOperator(trimmed, '!==');
      return evaluateValue(left.trim(), context) !== evaluateValue(right.trim(), context);
    }

    if (trimmed.includes('==')) {
      const [left, right] = splitByOperator(trimmed, '==');
      return evaluateValue(left.trim(), context) == evaluateValue(right.trim(), context);
    }

    if (trimmed.includes('!=')) {
      const [left, right] = splitByOperator(trimmed, '!=');
      return evaluateValue(left.trim(), context) != evaluateValue(right.trim(), context);
    }

    // 处理大小比较
    if (trimmed.includes('>=')) {
      const [left, right] = splitByOperator(trimmed, '>=');
      return evaluateValue(left.trim(), context) >= evaluateValue(right.trim(), context);
    }

    if (trimmed.includes('<=')) {
      const [left, right] = splitByOperator(trimmed, '<=');
      return evaluateValue(left.trim(), context) <= evaluateValue(right.trim(), context);
    }

    if (trimmed.includes('>')) {
      const [left, right] = splitByOperator(trimmed, '>');
      return evaluateValue(left.trim(), context) > evaluateValue(right.trim(), context);
    }

    if (trimmed.includes('<')) {
      const [left, right] = splitByOperator(trimmed, '<');
      return evaluateValue(left.trim(), context) < evaluateValue(right.trim(), context);
    }

    // 直接返回值
    return evaluateValue(trimmed, context);
  } catch (error) {
    console.warn('表达式解析错误:', expression, error);
    return false;
  }
}

// 按操作符分割字符串，考虑括号层级
function splitByOperator(expression: string, operator: string): string[] {
  const parts: string[] = [];
  let current = '';
  let depth = 0;
  let i = 0;

  while (i < expression.length) {
    const char = expression[i];

    if (char === '(') {
      depth++;
    } else if (char === ')') {
      depth--;
    }

    // 只有在括号层级为0时才考虑操作符
    if (depth === 0 && expression.slice(i, i + operator.length) === operator) {
      parts.push(current);
      current = '';
      i += operator.length;
      continue;
    }

    current += char;
    i++;
  }

  if (current) {
    parts.push(current);
  }

  return parts.length > 1 ? parts : [expression];
}

// 获取嵌套对象的值，支持方法调用
function getNestedValue(obj: any, path: string): any {
  if (!obj || !path) return undefined;

  const keys = path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (current === null || current === undefined) return undefined;

    // 检查是否是方法调用
    if (key.includes('(') && key.includes(')')) {
      const methodMatch = key.match(/^(\w+)\((.*)\)$/);
      if (methodMatch) {
        const [, methodName, argsStr] = methodMatch;
        const method = current[methodName];

        if (typeof method === 'function') {
          // 解析参数
          const args = parseMethodArguments(argsStr);
          return method.apply(current, args);
        }
      }
    } else {
      current = current[key];
    }
  }

  return current;
}

// 解析方法参数
function parseMethodArguments(argsStr: string): any[] {
  if (!argsStr.trim()) return [];

  const args: any[] = [];
  const parts = argsStr.split(',');

  for (const part of parts) {
    const trimmed = part.trim();

    // 字符串参数
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
      args.push(trimmed.slice(1, -1));
    } else if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
      args.push(trimmed.slice(1, -1));
    }
    // 数字参数
    else if (/^\d+(\.\d+)?$/.test(trimmed)) {
      args.push(Number(trimmed));
    }
    // 布尔参数
    else if (trimmed === 'true') {
      args.push(true);
    } else if (trimmed === 'false') {
      args.push(false);
    } else if (trimmed === 'null') {
      args.push(null);
    } else if (trimmed === 'undefined') {
      args.push(undefined);
    }
    // 其他情况暂时作为字符串处理
    else {
      args.push(trimmed);
    }
  }

  return args;
}

// 评估单个值，支持方法调用
function evaluateValue(value: string, context: Record<string, any>): any {
  const trimmed = value.trim();

  // 字符串字面量
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1);
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1);
  }

  // 数字
  if (/^\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }

  // 布尔值
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null') return null;
  if (trimmed === 'undefined') return undefined;

  // 对象属性访问，支持方法调用
  if (trimmed.startsWith('$.')) {
    const path = trimmed.slice(2);
    return getNestedValue(context.$, path);
  }

  if (trimmed.startsWith('$$.')) {
    const path = trimmed.slice(3);
    return getNestedValue(context.$$, path);
  }

  if (trimmed.startsWith('$$$.')) {
    const path = trimmed.slice(4);
    return getNestedValue(context.$$$, path);
  }

  // 简单的变量名
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(trimmed)) {
    return context[trimmed];
  }

  return trimmed;
}

/**
 * @description — 根据条件和作用域解析真假
 */
export function parseExpression(
  expression: TExpression,
  scope: Record<string, any>,
  allModuleData?: Record<string, any>,
  extraData?: Record<string, any>
): boolean {
  if (expression === void 0) {
    return true;
  }
  if (typeof expression === 'boolean') {
    return expression;
  }
  if (typeof expression === 'number') {
    return !!expression;
  }

  const matches = expression.match(/^\s*?\{\{((?:.|\n)+?)\}\}\s*?$/);
  if (!matches || matches[1].trim() === '') {
    return true;
  }

  // #ifdef H5
  const fn = new Function('$', '$$', '$$$', `with ($) { $$$.context.utils.resetState); return ${matches![1]}; }`);
  const newScope = new Proxy(scope, proxyHandler(expression));
  return fn(newScope, allModuleData, extraData);
  // #endif

  // #ifdef MP-WEIXIN
  // 使用简单的表达式解析器替代 new Function
  const result = evaluateSimpleExpression(matches![1].trim(), scope, allModuleData, extraData);

  console.log('~~ parseExpression', {
    expression: matches![1].trim(),
    result,
    scope,
    allModuleData,
    extraData,
  });

  return Boolean(result);
  // #endif
}

export function isIModeCondition(target: any): target is IModeCondition {
  return isObjectType(target) && 'condition' in target;
}

export function parseModeValue(
  valueCondition: TValueCondition,
  scope: Record<string, any>,
  allModuleData?: Record<string, any>,
  extraData?: Record<string, any>
): any {
  if (!isIModeCondition(valueCondition)) {
    return valueCondition;
  }

  const { mode, condition } = valueCondition;
  try {
    switch (mode) {
      case EValueMode.READ: {
        return condition;
      }

      default: {
        const finalCondition = getFinalCondition(condition);
        return parseExpression(finalCondition, scope, allModuleData, extraData);
      }
    }
  } catch {
    throw new Error(`解析表达式失败: ${condition}`);
  }
}
