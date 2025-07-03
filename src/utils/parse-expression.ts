import { TExpression } from '@/types/component';

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

  // 内部如果 try catch 的话，外部没办法知道错误
  const fn = new Function('$', '$$', '$$$', `with ($) { return ${matches[1]}; }`);
  const newScope = new Proxy(scope, proxyHandler(expression));
  return fn(newScope, allModuleData, extraData);
}
