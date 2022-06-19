import {count} from "./count";

export async function *Eight(options: unknown, input?: unknown) {
    for await (const snapshot of count(input, 8, true)) {
        yield snapshot;
    }
}