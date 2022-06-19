import {children} from "@virtualstate/focus";
import {ok} from "../like";

export async function *count(input: unknown, count: number, allowMore?: boolean) {
    for await (const snapshot of children(input)) {
        if (snapshot.length < count) {
            // Wait for count be available
            continue;
        }
        if (allowMore && snapshot.length > count) {
            yield snapshot.slice(0, count);
        } else {
            ok(snapshot.length === count, `Expected ${count}`);
            yield snapshot;
        }
    }
}