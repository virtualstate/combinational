import {children, h} from "@virtualstate/focus";
import { Boolean } from "./boolean";
import {isBooleanFalseArray} from "../like";

export async function *Not(options: unknown, input?: unknown) {
    for await (const snapshot of children(<Boolean>{input}</Boolean>)) {
        yield isBooleanFalseArray(snapshot);
    }
}