import {children, h, ok} from "@virtualstate/focus";
import { Boolean } from "./boolean";
import {isBooleanArray, isBooleanFalseArray, isTruthy} from "@virtualstate/combinational";

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