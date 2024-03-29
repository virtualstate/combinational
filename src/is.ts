/* c8 ignore start */
export function isArray<T>(value: unknown): value is T[];
export function isArray(value: unknown): value is unknown[];
export function isArray(value: unknown): boolean {
  return Array.isArray(value);
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}