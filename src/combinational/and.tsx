import {children, h} from "@virtualstate/focus";
import {isTruthy} from "@virtualstate/combinational";

export async function *And(options: unknown, input?: unknown) {
    let yielded = false;
    for await (const snapshot of children(input)) {
        yield snapshot.every(isTruthy);
        yielded = true;
    }
    if (!yielded) {
        yield false;
    }
}