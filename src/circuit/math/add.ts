import {isNumber} from "../../is";
import {children} from "@virtualstate/focus";

export async function *Add(options: unknown, input?: unknown) {
    for await (const [base, ...rest] of children(input).filter<number>(isNumber)) {
        yield rest.reduce((base, value) => base + value, base);
    }
}