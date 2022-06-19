import {pairs} from "../pair";
import {createFragment, h} from "@virtualstate/focus";
import {And, Xor} from "@virtualstate/combinational";

export async function *HalfAdder(options: unknown, input?: unknown) {
    for await (const snapshot of pairs(input)) {
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