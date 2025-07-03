export function getCamelToDashName(camelName: string) {
  let dashName = camelName.replaceAll(/[A-Z]/g, '-$&').toLowerCase();

  if (dashName.startsWith('-')) dashName = dashName.slice(1);

  return dashName;
}

export function getType<T>(target: T) {
  return Object.prototype.toString.call(target).slice(8, -1);
}

export function isObjectType(target: any): target is object {
  return getType(target) === 'Object';
}
