import {children} from "@virtualstate/focus";
import {ok} from "../like";

export async function *pairs(input: unknown) {
    for await (const snapshot of children(input)) {
        if (snapshot.length < 2) {
            // Wait for pair to both be available
            continue;
        }
        ok(snapshot.length === 2, "Expected pair");
        yield snapshot;
    }
}