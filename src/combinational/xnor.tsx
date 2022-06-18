import {children, h} from "@virtualstate/focus";
import {Not} from "./not";
import {Or} from "./or";
import {isTruthy} from "@virtualstate/combinational";

export async function *Xnor(options: unknown, input?: unknown) {
    for await (const snapshot of children(input)) {
        const truthy = snapshot.map(isTruthy);
        yield truthy.every(value => truthy[0] === value);
    }
}