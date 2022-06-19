import {createFragment, h} from "@virtualstate/focus";
import {And, Xor, Or} from "../../combinational";
import {triple} from "../triple";

export async function *FullAdder(options: unknown, input?: unknown) {
    for await (const [a, b, carry] of triple(input)) {
        const inputXor = (
            <Xor>
                {a}
                {b}
            </Xor>
        )
        yield (
            <>
                <Xor>
                    {inputXor}
                    {carry}
                </Xor>
                <Or>
                    <And>
                        {inputXor}
                        {carry}
                    </And>
                    <And>
                        {a}
                        {b}
                    </And>
                </Or>
            </>
        )
    }
}