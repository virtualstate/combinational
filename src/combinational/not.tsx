import {children, h} from "@virtualstate/focus";
import { Boolean } from "./boolean";
import {isBooleanFalseArray} from "@virtualstate/combinational";

export async function *Not(options: unknown, input?: unknown) {
    let yielded = false;
    for await (const snapshot of children(<Boolean>{input}</Boolean>)) {
        yield isBooleanFalseArray(snapshot);
        yielded = true;
    }
    if (!yielded) {
        yield true;
    }
}