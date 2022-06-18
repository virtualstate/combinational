import {children, h} from "@virtualstate/focus";
import {isTruthy} from "../like";

export async function *Xnor(options: unknown, input?: unknown) {
    for await (const snapshot of children(input)) {
        const truthy = snapshot.map(isTruthy);
        yield truthy.every(value => truthy[0] === value);
    }
}