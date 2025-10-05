import { CamelCaseKeys, SnakeCaseKeys } from "./type.utils";

const toCamelCase = (str: string): string =>
  str.replace(/[_-](\w)/g, (_, c) => c.toUpperCase());

const toSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);

function convertKeys(obj: any, caseFn: (key: string) => string, depth = 1): any {
  if (depth === 0 || typeof obj !== "object" || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeys(item, caseFn, depth - 1));
  }

  const result: Record<string, any> = {};
  for (const key of Object.keys(obj)) {
    const newKey = caseFn(key);
    result[newKey] = convertKeys(obj[key], caseFn, depth - 1);
  }

  return result;
}
export const toDbSchema = <T>(object: T): SnakeCaseKeys<T> => 
  convertKeys(object, toSnakeCase) as SnakeCaseKeys<T>;

export const toApiSchema = <T>(object: T): CamelCaseKeys<T> => 
  convertKeys(object, toCamelCase) as CamelCaseKeys<T>;
