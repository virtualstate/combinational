import {pair} from "../pair";
import {createFragment, h} from "@virtualstate/focus";
import {And, Xor} from "../../combinational";

export async function *HalfAdder(options: unknown, input?: unknown) {
    for await (const snapshot of pair(input)) {
        yield (
            <>
                <Xor>
                    {...snapshot}
                </Xor>
                <And>
                    {...snapshot}
                </And>
            </>
        )
    }
}