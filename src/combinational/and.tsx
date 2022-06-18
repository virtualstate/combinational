import {children, h} from "@virtualstate/focus";
import {isTruthy} from "@virtualstate/combinational";

export async function *And(options: unknown, input?: unknown) {
    for await (const snapshot of children(input)) {
        if (snapshot.length) {
            yield snapshot.every(isTruthy);
        } else {
            yield false;
        }
    }
}