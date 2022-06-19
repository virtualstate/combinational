import {HalfAdder} from "../../circuit";
import {h, createFragment} from "@virtualstate/focus";
import {anAsyncThing} from "@virtualstate/promise/the-thing";
import {pair} from "../../circuit";
import {ok} from "../../like";
import {FullAdder} from "../../circuit";

export function assertPair<T extends unknown[]>(result: unknown[], expected?: T): asserts result is T {
    if (!expected) {
        ok(!result);
        return;
    }
    ok(result.length === expected.length, "Expected lengths to match");
    for (const [index, value] of Object.entries(result)) {
        ok(expected[index] === value, "Expected values to match");
    }
}

assertPair(
    await anAsyncThing(pair(
        <HalfAdder>
            {false}
            {false}
        </HalfAdder>
    )),
    [
        false,
        false
    ]
);
assertPair(
    await anAsyncThing(pair(
        <HalfAdder>
            {false}
            {true}
        </HalfAdder>
    )),
    [
        true,
        false
    ]
);
assertPair(
    await anAsyncThing(pair(
        <HalfAdder>
            {true}
            {false}
        </HalfAdder>
    )),
    [
        true,
        false
    ]
);
assertPair(
    await anAsyncThing(pair(
        <HalfAdder>
            {true}
            {true}
        </HalfAdder>
    )),
    [
        false,
        true
    ]
);
assertPair(
    await anAsyncThing(pair(
        <HalfAdder>
        </HalfAdder>
    )),
    undefined
);
assertPair(
    await anAsyncThing(pair(
        <HalfAdder>
            {false}
        </HalfAdder>
    )),
    undefined
);

assertPair(
    await anAsyncThing(pair(
        <FullAdder>
            {false}
            {false}
            {false}
        </FullAdder>
    )),
    [
        false,
        false
    ]
);
assertPair(
    await anAsyncThing(pair(
        <FullAdder>
            {false}
            {false}
            {true}
        </FullAdder>
    )),
    [
        true,
        false
    ]
);
assertPair(
    await anAsyncThing(pair(
        <FullAdder>
            {false}
            {true}
            {false}
        </FullAdder>
    )),
    [
        true,
        false
    ]
);
assertPair(
    await anAsyncThing(pair(
        <FullAdder>
            {false}
            {true}
            {true}
        </FullAdder>
    )),
    [
        false,
        true
    ]
);
assertPair(
    await anAsyncThing(pair(
        <FullAdder>
            {true}
            {false}
            {false}
        </FullAdder>
    )),
    [
        true,
        false
    ]
);
assertPair(
    await anAsyncThing(pair(
        <FullAdder>
            {true}
            {false}
            {true}
        </FullAdder>
    )),
    [
        false,
        true
    ]
);
assertPair(
    await anAsyncThing(pair(
        <FullAdder>
            {true}
            {true}
            {false}
        </FullAdder>
    )),
    [
        false,
        true
    ]
);
assertPair(
    await anAsyncThing(pair(
        <FullAdder>
            {true}
            {true}
            {true}
        </FullAdder>
    )),
    [
        true,
        true
    ]
);
assertPair(
    await anAsyncThing(pair(
        <FullAdder>
            {true}
            {true}
        </FullAdder>
    )),
    undefined
);
assertPair(
    await anAsyncThing(pair(
        <FullAdder>
            {true}
        </FullAdder>
    )),
    undefined
);
assertPair(
    await anAsyncThing(pair(
        <FullAdder></FullAdder>
    )),
    undefined
);