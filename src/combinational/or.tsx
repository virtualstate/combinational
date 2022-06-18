import {children, h} from "@virtualstate/focus";
import {isTruthy} from "../like";

export async function *Or(options: unknown, input?: unknown) {
    for await (const snapshot of children(input)) {
        yield snapshot.find(isTruthy) ?? false;
    }
}