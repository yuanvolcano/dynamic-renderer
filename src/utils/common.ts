export function getCamelToDashName(camelName: string) {
  let dashName = camelName.replaceAll(/[A-Z]/g, '-$&').toLowerCase();

  if (dashName.startsWith('-')) dashName = dashName.slice(1);

  return dashName;
}
