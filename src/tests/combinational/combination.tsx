/* c8 ignore start */

import {children, h} from "@virtualstate/focus";
import {Combination, ok} from "@virtualstate/combinational";

export default 1;

function *Changes() {
    yield true;
    yield false;
    yield true;
}

{

    const root = (
        <Combination>
            {true}
            &
            <Changes />
        </Combination>
    )

    for await (const snapshot of children(root)) {
        console.log(snapshot);
    }
}

{

    async function *Pick(o?: unknown, input?: unknown) {
        for await (const snapshot of children(input)) {
            if (!snapshot.length) continue;
            const index = Math.round((snapshot.length - 1) * Math.random());
            console.log({ picked: index, snapshot });
            yield snapshot[index];
        }
    }

    const PickSymbol = Symbol("Pick");

    const root = (
        <Combination {...{ [PickSymbol]: Pick }}>
            {true}
            &
            <Changes />
            ||
            {false} && {true} || {false}{PickSymbol}{true}
        </Combination>
    )

    for await (const snapshot of children(root)) {
        console.log(snapshot);
    }
}

{
    const UnknownSymbol = Symbol("Unknown");
    const root = (
        <Combination>
            {true} | {UnknownSymbol}
        </Combination>
    )

    ok(await children(root).catch(error => error) instanceof Error);
}
