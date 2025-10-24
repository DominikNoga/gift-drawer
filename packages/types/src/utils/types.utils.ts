import { type SnakeCase, type CamelCase } from 'type-fest';

export type SnakeCaseKeys<T> = {
  [K in keyof T as SnakeCase<K & string>]: T[K];
};

export type CamelCaseKeys<T> = {
  [K in keyof T as CamelCase<K & string>]: T[K];
}
