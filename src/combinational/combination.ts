import {children, getChildrenFromRawNode, h} from "@virtualstate/focus";
import {ok} from "../like";
import {And} from "./and";
import {Or} from "./or";
import {Not} from "./not";
import {Xor} from "./xor";
import {Xnor} from "./xnor";
import {Nand} from "./nand";

const operations: Record<string, unknown> = {
    "&": And,
    "&&": And,
    "|": Or,
    "||": Or,
    "~": Not,
    "!": Not,
    "^": Xor,
    "~^": Xnor,
    "^~": Xnor,
    "~&": Nand
}

export async function Combination(options?: Record<string | symbol, unknown>, input?: unknown) {
    const raw = getChildrenFromRawNode(input);

    ok(Array.isArray(raw));

    const allOperations: Record<string | symbol, unknown> = {
        ...operations,
        ...options
    }

    const operators = raw
        .filter((value): value is (string | symbol) => (
            typeof value === "string" ||
            typeof value === "symbol"
        ))
        .filter(value => {
            if (allOperations[value]) return true;
            if (typeof value !== "string") return false;
            const trim = value.trim();
            return allOperations[trim];
        })

    console.log(operators);

    let remaining = [...raw];

    for (const [operatorIndex, operatorKey] of operators.entries()) {
        const operator = typeof operatorKey === "string" && !operators[operatorKey] ? operatorKey.trim() : operatorKey;
        const node = allOperations[operator];
        ok(node, `Unknown operation ${String(operator)}`);
        const index = remaining.indexOf(operatorKey);
        const parts = remaining.slice(0, operatorIndex === operators.length - 1 ? remaining.length : index + 2)
            .filter(value => value !== operatorKey);
        const result = h(node, options, ...parts)
        remaining.splice(0, index + 2, result)
        console.log({ remaining, operatorKey, parts, index });
    }

    return remaining;

}