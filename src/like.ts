// c8 ignore start
import {isStaticChildNode, isUnknownJSXNode, name} from "@virtualstate/focus";

export function isLike<T>(value: unknown, ...and: unknown[]): value is T {
  if (!and.length) return !!value;
  return !!value && and.every((value) => !!value);
}

export function ok(value: unknown, message?: string): asserts value;
export function ok<T>(value: unknown, message?: string): asserts value is T;
export function ok(value: unknown, message?: string): asserts value {
  if (!value) {
    throw new Error(message ?? "Expected value");
  }
}

export function isRejected<R extends PromiseRejectedResult>(
  value: PromiseSettledResult<unknown>
): value is R {
  return value?.status === "rejected";
}

export function isFulfilled<T>(
  value: PromiseSettledResult<T>
): value is PromiseFulfilledResult<T> {
  return value?.status === "fulfilled";
}

export function isBooleanTrueArray(array: unknown): array is true[] {
  return Array.isArray(array) &&array.every(value => value === true);
}

export function isBooleanFalseArray(array: unknown): array is true[] {
  return Array.isArray(array) && array.every(value => value === false);
}

export function isBooleanArray(array: unknown): array is boolean[] {
  return Array.isArray(array) && array.every(value => typeof value === "boolean")
}

export function isTruthy(input: unknown) {
  if (isStaticChildNode(input)) {
    return !!input;
  }
  if (!input) return false;
  // If it's not a node we don't know what it is
  if (!isUnknownJSXNode(input)) {
    return false;
  }
  // Expect a name to exist if we have a value and
  ok(name(input));
  return true;
}
