import {children, h} from "@virtualstate/focus";
import { isTruthy} from "../like";

export async function *Xor(options: unknown, input?: unknown) {
    for await (const snapshot of children(input)) {
        const every = snapshot.every(isTruthy);
        if (every) {
            yield false;
        } else {
            yield snapshot.find(isTruthy) ?? false;
        }
    }
}