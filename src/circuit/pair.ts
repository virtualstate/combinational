import {count} from "./count";

export async function *pair(input: unknown) {
    yield * count(input, 2, false);
}