import {children, getChildrenFromRawNode, h} from "@virtualstate/focus";
import {ok} from "../like";
import {And} from "./and";
import {Or} from "./or";
import {Not} from "./not";
import {Xor} from "./xor";
import {Xnor} from "./xnor";
import {Nand} from "./nand";

const operations: Record<string | symbol, unknown> = {
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

    const flat = raw
        .flat()
        .flatMap(value => {
            if (typeof value !== "string") return value;
            return value
                .split(/\s+/g)
                .filter(value => value)
        })

    const operators = flat
        .filter((value): value is (string | symbol) => (
            typeof value === "string" ||
            typeof value === "symbol"
        ))

    // console.log(operators);

    let remaining = [...flat];

    for (const [operatorIndex, operatorKey] of operators.entries()) {
        const operator = typeof operatorKey === "string" && !operators[operatorKey] ? operatorKey.trim() : operatorKey;
        const node = options?.[operator] ?? operations[operator];
        ok(node, `Unknown operation ${String(operator)}`);
        const index = remaining.indexOf(operatorKey);
        const parts = remaining.slice(0, operatorIndex === operators.length - 1 ? remaining.length : index + 2)
            .filter(value => value !== operatorKey);
        const result = h(node, options, ...parts)
        remaining.splice(0, index + 2, result)
        // console.log({ remaining, operatorKey, parts, index });
    }

    return remaining;

}