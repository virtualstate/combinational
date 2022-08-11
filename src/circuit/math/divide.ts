import {isNumber} from "../../is";
import {children} from "@virtualstate/focus";

export async function *Divide(options: unknown, input?: unknown) {
    for await (const [base, ...rest] of children(input).filter<number>(isNumber)) {
        yield (rest.length ? rest : [0]) .reduce((base, value) => base / value, base);
    }
}