import {children, h, ok} from "@virtualstate/focus";
import {isTruthy} from "@virtualstate/combinational";

export async function *Or(options: unknown, input?: unknown) {
    for await (const snapshot of children(input)) {
        yield snapshot.find(isTruthy) ?? false;
    }
}