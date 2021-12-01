import { snakeCase, camelCase } from 'change-case';

/**
 * 将对象所有属性名变成下划线形式
 * @param o
 * @returns
 */
export function propertyToSnakeCase(o: any): any {
  if (!o) {
    return o;
  }
  return Object.fromEntries(
    Object.entries(o).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [
          snakeCase(key),
          Array.from(
            Object.assign(propertyToSnakeCase(value), { length: value.length })
          )
        ];
      }
      if (typeof value === 'object' && value !== null) {
        return [snakeCase(key), propertyToSnakeCase(value)];
      }
      return [snakeCase(key), value];
    })
  );
}

/**
 * 将对象所有属性名变为驼峰形式
 * @param o
 */
export function propertyToCamelCase(o: any): any {
  if (!o) {
    return o;
  }
  return Object.fromEntries(
    Object.entries(o).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [
          camelCase(key),
          Array.from(
            Object.assign(propertyToCamelCase(value), { length: value.length })
          )
        ];
      }
      if (typeof value === 'object' && value !== null) {
        return [camelCase(key), propertyToCamelCase(value)];
      }
      return [camelCase(key), value];
    })
  );
}
