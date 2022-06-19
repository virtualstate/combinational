import {children} from "@virtualstate/focus";
import {ok} from "../like";

export async function *triple(input: unknown) {
    for await (const snapshot of children(input)) {
        if (snapshot.length < 3) {
            // Wait for triple to both be available
            continue;
        }
        ok(snapshot.length === 3, "Expected triple");
        yield snapshot;
    }
}