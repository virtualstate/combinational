import {rest} from "../promise-rest";
import {FullAdder} from "./full";
import {h, createFragment} from "@virtualstate/focus";
import {count} from "../count";

export async function *EightAdder(options: unknown, input?: unknown) {
    for await (const snapshot of count(input, 16)) {
        const left = snapshot.slice(0, 8);
        const right = snapshot.slice(8);

        const a1 = rest(
            <FullAdder>
                {left[0]}
                {right[0]}
                {false}
            </FullAdder>
        )
        const a2 = rest(
            <FullAdder>
                {left[1]}
                {right[1]}
                {a1.promise}
            </FullAdder>
        )
        const a3 = rest(
            <FullAdder>
                {left[2]}
                {right[2]}
                {a2.promise}
            </FullAdder>
        )
        const a4 = rest(
            <FullAdder>
                {left[3]}
                {right[3]}
                {a3.promise}
            </FullAdder>
        )
        const a5 = rest(
            <FullAdder>
                {left[4]}
                {right[4]}
                {a4.promise}
            </FullAdder>
        )
        const a6 = rest(
            <FullAdder>
                {left[5]}
                {right[5]}
                {a5.promise}
            </FullAdder>
        )
        const a7 = rest(
            <FullAdder>
                {left[6]}
                {right[6]}
                {a6.promise}
            </FullAdder>
        )
        const a8 = (
            <FullAdder>
                {left[7]}
                {right[7]}
                {a7.promise}
            </FullAdder>
        )
        yield [
            a1,
            a2,
            a3,
            a4,
            a5,
            a6,
            a7,
            a8,
        ]
    }
}