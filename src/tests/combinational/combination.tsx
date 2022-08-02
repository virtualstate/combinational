import {children, h} from "@virtualstate/focus";
import {Combination} from "@virtualstate/combinational";

export default 1;

function *Changes() {
    yield true;
    yield false;
    yield true;
}

async function *Pick(o?: unknown, input?: unknown) {
    for await (const snapshot of children(input)) {
        if (!snapshot.length) continue;
        const index = Math.round((snapshot.length - 1) * Math.random());
        console.log({ picked: index, snapshot });
        yield snapshot[index];
    }
}

const PickSymbol = Symbol("Pick");
const UnknownSymbol = Symbol("Pick");

const root = (
    <Combination {...{ [PickSymbol]: Pick }}>
        {true}
        &
        <Changes />
        ||
        {false} && {true} || {false}{PickSymbol}{true} | {UnknownSymbol}
    </Combination>
)

for await (const snapshot of children(root)) {
    console.log(snapshot);
}